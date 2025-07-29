import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
  .withUrl("http://localhost:5153/gruppoHub")
  .withAutomaticReconnect()
  .build();

export async function creaGruppo(data, username) {
  await connection.start().catch(() => {});
  return await connection.invoke("CreaGruppo", data, username);
}