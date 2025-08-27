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

export async function getEventi(username) {
  await ensureConnection(connection);
  return connection.invoke("GetEventi", username);
}

export { connection };


