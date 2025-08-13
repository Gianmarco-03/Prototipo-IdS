import { HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";
import { ensureConnection } from "./EnsureConnection";

const connection = new HubConnectionBuilder()
  .withUrl("http://localhost:5153/homeHub")
  .withAutomaticReconnect()
  .build();


export async function getGruppi(username) {
  await ensureConnection(connection);
  return connection.invoke("GetGruppi", username);
}

export async function findGruppi(name) {
  await ensureConnection(connection);
  return connection.invoke("FindGruppi", name);
}

export async function getEventi(username) {
  await ensureConnection(connection);
  return connection.invoke("GetEventi", username);
}

export async function findEventi(username, name) {
  await ensureConnection(connection);
  return connection.invoke("FindEventi", username, name);
}

export { connection };


