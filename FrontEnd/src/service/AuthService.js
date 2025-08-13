import * as signalR from "@microsoft/signalr";
import { ensureConnection } from "./EnsureConnection";

const connection = new signalR.HubConnectionBuilder()
  .withUrl("http://localhost:5153/authHub")  // indirizzo del backend SignalR
  .withAutomaticReconnect()
  .build();

export function onLoginEsito(handler) {
  connection.on("LoginEsito", handler);
}

export function offLoginEsito(handler) {
  connection.off("LoginEsito", handler);
}

export function onRegistrazioneEsito(handler) {
  connection.on("RegistrazioneEsito", handler);
}

export function offRegistrazioneEsito(handler) {
  connection.off("RegistrazioneEsito", handler);
}

export async function login(username, password) {
  await ensureConnection(connection);
  return connection.invoke("Login", username, password);
}

export async function register(data) {
  await ensureConnection(connection);
  await connection.invoke("Registra", data);
}

export function disconnect() {
  return connection.stop();
}
