import { HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";
import { ensureConnection } from "./EnsureConnection";

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
  await ensureConnection(gruppoConnection);
  return gruppoConnection.invoke("GetInfo", nome);
}

export async function getEventoInfo(nome, gruppo) {
  await ensureConnection(eventoConnection);
  return eventoConnection.invoke("GetInfo", nome, gruppo);
}

export async function getUtenteInfo(username) {
  await ensureConnection(utenteConnection);
  return utenteConnection.invoke("GetInfo", username);
}
