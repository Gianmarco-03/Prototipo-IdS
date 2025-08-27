using EventBackend.Model;
using System.Collections.Generic;

namespace EventBackend.Controllers
{
    public interface IEventoCondivisoController
    {
        Task<bool> CreaEventoCondiviso(PropostaEvento evento, string gruppoPromotore, string username, List<string> gruppiInvitati);
        Task<List<Invito>> GetInviti(string nomeEvento, string gruppoPromotore);
        Task<bool> InvitaGruppo(string nomeEvento, string gruppoPromotore, string gruppoInvitato);
        Task<bool> RispondiInvito(string nomeEvento, string gruppoPromotore, string gruppoInvitato, bool accetta, string username);
        Task<bool> isCondiviso(string nomeEvento, string nomeGruppo);

        
    }
}