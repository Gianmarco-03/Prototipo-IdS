import { HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";

const connection = new HubConnectionBuilder()
  .withUrl("http://localhost:5153/homeHub")
  .withAutomaticReconnect()
  .build();

export async function getGruppi(username) {
  if (connection.state !== HubConnectionState.Connected)
    await connection.start().catch(() => {});
  return await connection.invoke("GetGruppi", username);
}

export async function findGruppi(name) {
  if (connection.state !== HubConnectionState.Connected)
    await connection.start().catch(() => {});
  return await connection.invoke("FindGruppi", name);
}

export async function getEventi(username) {
  if (connection.state !== HubConnectionState.Connected)
    await connection.start().catch(() => {});
  return await connection.invoke("GetEventi", username);
}

export async function findEventi(username, name) {
  if (connection.state !== HubConnectionState.Connected)
    await connection.start().catch(() => {});
  return await connection.invoke("FindEventi", username, name);}

export { connection };

