import { HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";
import { ensureConnection } from "./EnsureConnection";

const connection = new HubConnectionBuilder()
  .withUrl("http://localhost:5153/eventoHub")
  .withAutomaticReconnect()
  .build();



export async function creaEvento(data, username) {
  return connection.invoke("CreaEvento", data, username);
}
export async function partecipaEvento(nomeEvento, username) {
   await ensureConnection(connection);
  return await connection.invoke("Partecipa", username, nomeEvento);
}

export async function abbandonaEvento(nomeEvento, username) {
  await ensureConnection(connection);
  return await connection.invoke("Abbandona", username, nomeEvento);
}

export { connection };