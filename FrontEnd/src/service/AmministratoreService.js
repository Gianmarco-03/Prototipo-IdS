 import { HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";

const connection = new HubConnectionBuilder()
  .withUrl("http://localhost:5153/amministratoreHub")
  .withAutomaticReconnect()
  .build();

async function ensureConnection() {
  if (connection.state !== HubConnectionState.Connected)
    await connection.start().catch(() => {});
}

export async function approvaEvento(nomeGruppo, nomeEvento, admin) {
  await ensureConnection(connection);
  return connection.invoke("ApprovaEvento", nomeEvento, nomeGruppo, admin);
}

export async function bocciaEvento(nomeGruppo, nomeEvento, admin) {
  await ensureConnection(connection);
  return connection.invoke("BocciaEvento", nomeEvento, nomeGruppo, admin);
}

export async function promuoviUtente(nomeGruppo, username, admin) {
  await ensureConnection(connection);
  return connection.invoke("Promuovi", nomeGruppo, username, admin);
}

export async function rimuoviUtente(nomeGruppo, username, admin) {
  await ensureConnection(connection);
  return connection.invoke("Rimuovi", nomeGruppo, username, admin);
}

export { connection };
