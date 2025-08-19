import { HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";
import { ensureConnection } from "./EnsureConnection";

const connection = new HubConnectionBuilder()
  .withUrl("http://localhost:5153/eventoHub")
  .withAutomaticReconnect()
  .build();



export async function creaEvento(data, username) {
  return connection.invoke("CreaEvento", data, username);
}
export async function partecipaEvento(nomeGruppo, nomeEvento, username) {
   await ensureConnection(connection);
  return await connection.invoke("Partecipa", username, nomeEvento,nomeGruppo);
}

export async function abbandonaEvento(nomeGruppo, nomeEvento, username) {
  await ensureConnection(connection);
  return await connection.invoke("Abbandona", username, nomeEvento, nomeGruppo);
}

export { connection };