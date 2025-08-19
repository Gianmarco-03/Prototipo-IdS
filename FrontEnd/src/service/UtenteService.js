import { HubConnectionBuilder } from "@microsoft/signalr";
import { ensureConnection } from "./EnsureConnection";

const connection = new HubConnectionBuilder()
  .withUrl("http://localhost:5153/utenteHub")
  .withAutomaticReconnect()
  .build();

export async function getUtente(username) {
  await ensureConnection(connection);
  return connection.invoke("GetInfo", username);
}

export async function updateUtente(data) {
  await ensureConnection(connection);
  return connection.invoke("UpdateInfo", data);
}

export async function uploadImmagine(username, file) {
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
  return connection.invoke("UploadImage", username, base64);
}

export { connection };