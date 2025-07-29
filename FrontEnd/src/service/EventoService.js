import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
  .withUrl("http://localhost:5153/eventoHub")
  .withAutomaticReconnect()
  .build();

export async function creaEvento(data, username) {
  await connection.start().catch(() => {});
  return await connection.invoke("CreaEvento", data, username);
}