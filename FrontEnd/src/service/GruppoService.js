import { HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";

const connection = new HubConnectionBuilder()
  .withUrl("http://localhost:5153/gruppoHub")
  .withAutomaticReconnect()
  .build();

export async function creaGruppo(data, username) {
  if (connection.state !== HubConnectionState.Connected)
    await connection.start().catch(() => {});
  return await connection.invoke("CreaGruppo", data, username);
}

export async function  checkAdmin(nomeGruppo, username) {
  if (connection.state !== HubConnectionState.Connected)
    await connection.start().catch(() => {});
  return await connection.invoke("checkAdmin", nomeGruppo, username);
}

export async function getEventiGruppo(nomeGruppo) {
  if (connection.state !== HubConnectionState.Connected)
    await connection.start().catch(() => {});
  return await connection.invoke("getEventiGruppo", nomeGruppo);

}

export { connection };