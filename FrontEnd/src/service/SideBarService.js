import { HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";

const BACKEND_URL = "http://localhost:5153";

export const gruppoConnection = new HubConnectionBuilder()
  .withUrl(`${BACKEND_URL}/gruppoHub`)
  .withAutomaticReconnect()
  .build();

export const eventoConnection = new HubConnectionBuilder()
  .withUrl(`${BACKEND_URL}/eventoHub`)
  .withAutomaticReconnect()
  .build();

export const utenteConnection = new HubConnectionBuilder()
  .withUrl(`${BACKEND_URL}/utenteHub`)
  .withAutomaticReconnect()
  .build();

export async function getGruppoInfo(nome) {
  if (gruppoConnection.state !== HubConnectionState.Connected)
    await gruppoConnection.start().catch(() => {});
  return await gruppoConnection.invoke("GetInfo", nome);
}

export async function getEventoInfo(nome, gruppo) {
  if (eventoConnection.state !== HubConnectionState.Connected)
    await eventoConnection.start().catch(() => {});
  return await eventoConnection.invoke("GetInfo", nome,gruppo);
}

export async function getUtenteInfo(username) {
  if (utenteConnection.state !== HubConnectionState.Connected)
    await utenteConnection.start().catch(() => {});
  return await utenteConnection.invoke("GetInfo", username);
}