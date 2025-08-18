import { HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";
import { ensureConnection } from "./EnsureConnection"
const connection = new HubConnectionBuilder()
  .withUrl("http://localhost:5153/gruppoHub")
  .withAutomaticReconnect()
  .build();



export async function creaGruppo(data, username) {
  await ensureConnection(connection);
  return connection.invoke("CreaGruppo", data, username);
}

export async function checkAdmin(nomeGruppo, username) {
  await ensureConnection(connection);
  return connection.invoke("checkAdmin", nomeGruppo, username);
}

export async function getEventiGruppo(nomeGruppo) {
  await ensureConnection(connection);
  return connection.invoke("getEventiGruppo", nomeGruppo);
}

export async function findEventiGruppo(nomeGruppo, name) {
  await ensureConnection(connection);
  return connection.invoke("FindEventiGruppo", nomeGruppo, name);
}


export async function partecipaGruppo(nomeGruppo, username) {
  await ensureConnection(connection);
  return connection.invoke("Partecipa", username, nomeGruppo);
}

export async function abbandonaGruppo(nomeGruppo, username) {
  await ensureConnection(connection);
  return connection.invoke("Abbandona", username, nomeGruppo);
}

export { connection };
