import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
  .withUrl("http://localhost:5153/homeHub")
  .withAutomaticReconnect()
  .build();

export async function getGruppi(username) {
  await connection.start().catch(() => {});
  return await connection.invoke("GetGruppi", username);
}

export async function findGruppi(name) {
  await connection.start().catch(() => {});
  return await connection.invoke("FindGruppi", name);
}

export async function getEventi(username) {
  await connection.start().catch(() => {});
  return await connection.invoke("GetEventi", username);
}

export async function findEventi(name) {
  await connection.start().catch(() => {});
  return await connection.invoke("FindEventi", name);
}
