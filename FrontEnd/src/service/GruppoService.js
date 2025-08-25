import { HubConnectionBuilder } from "@microsoft/signalr";
import { ensureConnection } from "./EnsureConnection";
const connection = new HubConnectionBuilder()
  .withUrl("http://localhost:5153/gruppoHub")
  .withAutomaticReconnect()
  .build();


export async function getGruppo(nomeGruppo) {
  await ensureConnection(connection);
  return connection.invoke("GetInfo", nomeGruppo);
}

export async function creaGruppo(data, username) {
  await ensureConnection(connection);
  return connection.invoke("CreaGruppo", data, username);
}

export async function checkAdmin(nomeGruppo, username) {
  await ensureConnection(connection);
  return connection.invoke("checkAdmin", nomeGruppo, username);
}

export async function getEventiGruppo(nomeGruppo) {
  await ensureConnection(connection);
  return connection.invoke("getEventiGruppo", nomeGruppo);
}

export async function findEventiGruppo(nomeGruppo, name) {
  await ensureConnection(connection);
  return connection.invoke("FindEventiGruppo", nomeGruppo, name);
}


export async function partecipaGruppo(nomeGruppo, username) {
  await ensureConnection(connection);
  return connection.invoke("Partecipa", username, nomeGruppo);
}

export async function abbandonaGruppo(nomeGruppo, username) {
  await ensureConnection(connection);
  return connection.invoke("Abbandona", username, nomeGruppo);
}

export async function updateGruppo(data) {
  await ensureConnection(connection);
  return connection.invoke("UpdateInfo", data);
}

export async function uploadImmagine(nomeGruppo, file) {
  await ensureConnection(connection);
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result.split(",")[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const base64 = await toBase64(file);
  return connection.invoke("UploadImage", nomeGruppo, base64);
}


export async function getInvitiPerGruppo(gruppoInvitato) {
  await ensureConnection(connection);
  return connection.invoke("GetInvitiPerGruppo", gruppoInvitato);
}

export { connection };
