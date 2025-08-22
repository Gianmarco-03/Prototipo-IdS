  import { HubConnectionBuilder} from "@microsoft/signalr";
  import { ensureConnection } from "./EnsureConnection";

  const connection = new HubConnectionBuilder()
    .withUrl("http://localhost:5153/eventoHub")
    .withAutomaticReconnect()
    .build();

  const sharedConnection = new HubConnectionBuilder()
  .withUrl("http://localhost:5153/eventoCondivisoHub")
  .withAutomaticReconnect()
  .build();


  ensureConnection(connection).catch(err =>
  console.error("Impossibile connettersi a eventoHub", err)
  );

  ensureConnection(sharedConnection).catch(err =>
  console.error("Impossibile connettersi a eventoCondivisoHub", err)
  );

  export async function getEvento(nomeGruppo, nomeEvento) {
    await ensureConnection(connection);
    return connection.invoke("GetInfo", nomeEvento, nomeGruppo);
  }

  export async function creaEvento(data, username) {
    return connection.invoke("CreaEvento", data, username);
  }

  export async function creaEventoCondiviso(gruppoPromotore, data, gruppi, username) {
  await ensureConnection(sharedConnection);
  return sharedConnection.invoke("CreaEventoCondiviso", data, gruppoPromotore, gruppi, username);
 }

  export async function partecipaEvento(nomeGruppo, nomeEvento, username) {
    await ensureConnection(connection);
    return await connection.invoke("Partecipa", username, nomeEvento,nomeGruppo);
  }

  export async function abbandonaEvento(nomeGruppo, nomeEvento, username) {
    await ensureConnection(connection);
    return await connection.invoke("Abbandona", username, nomeEvento, nomeGruppo);
  }

  export async function updateEvento(data) {
    await ensureConnection(connection);
    return connection.invoke("UpdateInfo", data);
  }

  export async function uploadImmagine(nomeEvento, nomeGruppo, file) {
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
    return connection.invoke("UploadImage", nomeEvento, nomeGruppo, base64);
  }

  export async function checkOrganizzatore(nomeEvento, nomeGruppo, username) {
    await ensureConnection(connection);
    return connection.invoke("CheckOrganizzatore", nomeEvento, nomeGruppo, username);
  }

  export async function getInvitiEvento(nomeEvento, gruppoPromotore) {
    await ensureConnection(sharedConnection);
    return sharedConnection.invoke("GetInviti", nomeEvento, gruppoPromotore);
  }

  export async function invitaGruppoEvento(nomeEvento, gruppoPromotore, gruppoInvitato) {
    await ensureConnection(sharedConnection);
    return sharedConnection.invoke("InvitaGruppo", nomeEvento, gruppoPromotore, gruppoInvitato);
  }

  export async function rispondiInvitoEvento(nomeEvento, gruppoPromotore, gruppoInvitato, accetta, username) {
    await ensureConnection(sharedConnection);
    return sharedConnection.invoke("RispondiInvito", nomeEvento, gruppoPromotore, gruppoInvitato, accetta, username);
  }



  export { connection, sharedConnection };