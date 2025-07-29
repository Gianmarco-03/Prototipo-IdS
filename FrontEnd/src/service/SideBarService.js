import * as signalR from "@microsoft/signalr";

const BACKEND_URL = "http://localhost:5153";

export const gruppoConnection = new signalR.HubConnectionBuilder()
  .withUrl(`${BACKEND_URL}/gruppoHub`)
  .withAutomaticReconnect()
  .build();

export const eventoConnection = new signalR.HubConnectionBuilder()
  .withUrl(`${BACKEND_URL}/eventoHub`)
  .withAutomaticReconnect()
  .build();

export const utenteConnection = new signalR.HubConnectionBuilder()
  .withUrl(`${BACKEND_URL}/utenteHub`)
  .withAutomaticReconnect()
  .build();

export async function getGruppoInfo(nome) {
  await gruppoConnection.start().catch(() => {});
  return await gruppoConnection.invoke("GetInfo", nome);
}

export async function getEventoInfo(nome) {
  await eventoConnection.start().catch(() => {});
  return await eventoConnection.invoke("GetInfo", nome);
}

export async function getUtenteInfo(username) {
  await utenteConnection.start().catch(() => {});
  return await utenteConnection.invoke("GetInfo", username);
}
