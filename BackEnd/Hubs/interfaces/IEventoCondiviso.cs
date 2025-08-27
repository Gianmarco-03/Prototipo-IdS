using EventBackend.Model;
using System.Collections.Generic;

namespace EventBackend.Hubs
{
    public interface IEventoCondivisoService
    {
        Task<bool> CreaEventoCondiviso(PropostaEvento evento, string gruppoPromotore, List<string> gruppiInvitati, string username);
        Task<List<Invito>> GetInviti(string nomeEvento, string gruppoPromotore);
        Task<bool> InvitaGruppo(string nomeEvento, string gruppoPromotore, string gruppoInvitato);
        Task<bool> RispondiInvito(string nomeEvento, string gruppoPromotore, string gruppoInvitato, bool accetta, string username);
        Task<bool> isCondiviso(string nomeEvento, string nomeGruppo);
    }
}