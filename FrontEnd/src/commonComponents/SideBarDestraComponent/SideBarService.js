import * as signalR from "@microsoft/signalr";

export const gruppoConnection = new signalR.HubConnectionBuilder()
  .withUrl("http://localhost:5153/gruppoHub")
  .withAutomaticReconnect()
  .build();

export const eventoConnection = new signalR.HubConnectionBuilder()
  .withUrl("http://localhost:5153/eventoHub")
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
