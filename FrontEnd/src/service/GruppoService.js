import { HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";

const connection = new HubConnectionBuilder()
  .withUrl("http://localhost:5153/gruppoHub")
  .withAutomaticReconnect()
  .build();

export async function creaGruppo(data, username) {
  if (connection.state === HubConnectionState.Disconnected){
     return connection.start().then(() => {
  return  connection.invoke("CreaGruppo", data, username);
     });
  }
  return await connection.invoke("CreaGruppo", data, username);

}

export async function  checkAdmin(nomeGruppo, username) {
  if (connection.state === HubConnectionState.Disconnected){
     return connection.start().then(() => {
      return connection.invoke("checkAdmin", nomeGruppo, username);
    });
  }

        return connection.invoke("checkAdmin", nomeGruppo, username);

}

export function getEventiGruppo(nomeGruppo) {
  if (connection.state === HubConnectionState.Disconnected) {
    return connection.start().then(() => {
      return connection.invoke("getEventiGruppo", nomeGruppo);
    });
  }

  return connection.invoke("getEventiGruppo", nomeGruppo);
}



export { connection };