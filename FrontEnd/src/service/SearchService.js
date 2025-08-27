import { HubConnectionBuilder } from "@microsoft/signalr";
import { ensureConnection } from "./EnsureConnection";

const connection = new HubConnectionBuilder()
  .withUrl("http://localhost:5153/searchHub")
  .withAutomaticReconnect()
  .build();

export async function findGruppi(query, includeDescription, minPartecipanti, maxPartecipanti) {
  await ensureConnection(connection);
  return connection.invoke("FindGruppi", query, includeDescription, minPartecipanti, maxPartecipanti);
}

export async function findEventi(
  username,
  query,
  includeDescription,
  minPartecipanti,
  maxPartecipanti,
  startDate,
  endDate
) {
  await ensureConnection(connection);
  return connection.invoke(
    "FindEventi",
    username,
    query,
    includeDescription,
    minPartecipanti,
    maxPartecipanti,
    startDate,
    endDate
  );
}

export { connection };
