import { HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";

const connection = new HubConnectionBuilder()
  .withUrl("http://localhost:5153/eventoHub")
  .withAutomaticReconnect()
  .build();

export async function creaEvento(data, username) {
  if (connection.state !== HubConnectionState.Connected)
    await connection.start().catch(() => {});
  return await connection.invoke("CreaEvento", data, username);
}

export { connection };