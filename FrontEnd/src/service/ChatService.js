import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
  .withUrl("http://localhost:5153/chatHub")  // indirizzo del backend SignalR
  .withAutomaticReconnect()
  .build();

export default connection;
