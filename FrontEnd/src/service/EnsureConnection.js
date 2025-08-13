import { HubConnectionState, HubConnection } from "@microsoft/signalr";

export async function ensureConnection(conn, { timeoutMs = 10000, intervalMs = 50, autoStart = true } = {}) {
  const State =
    (typeof HubConnectionState !== "undefined" && HubConnectionState) 

  if (!State) {
    throw new Error("HubConnectionState non disponibile: importa @microsoft/signalr o usa signalR.HubConnectionState.");
  }

  const deadline = Date.now() + timeoutMs;

  // Se è disconnessa, prova ad avviare
  if (conn.state === State.Disconnected && autoStart) {
    await conn.start();
  }

  // Attendi finché non è Connected (copre Connecting/Reconnecting)
  while (conn.state !== State.Connected) {
    if (Date.now() > deadline) {
      throw new Error("Timeout in attesa di stato Connected");
    }

    // Se ricade Disconnected, ritenta lo start (senza rompere il loop)
    if (conn.state === State.Disconnected && autoStart) {
      try { await conn.start(); } catch { /* ritenta al prossimo giro */ }
    }

    await new Promise(r => setTimeout(r, intervalMs));
  }
}
