using Microsoft.AspNetCore.SignalR;
using EventBackend.Controllers;
using EventBackend.Model;
using System.Collections.Generic;

namespace EventBackend.Hubs
{
    public class EventoCondivisoHub : Hub, IEventoCondivisoService
    {
        private readonly IServiceScopeFactory _scopeFactory;

        public EventoCondivisoHub(IServiceScopeFactory scopeFactory)
        {
            _scopeFactory = scopeFactory;
        }

        private IEventoCondivisoController GetCtrl()
        {
            var scope = _scopeFactory.CreateScope();
            return scope.ServiceProvider.GetRequiredService<IEventoCondivisoController>();
        }

        public async Task<bool> CreaEventoCondiviso(PropostaEvento evento, string gruppoPromotore, List<string> gruppiInvitati, string username)
        {
            var ctrl = GetCtrl();
            return await ctrl.CreaEventoCondiviso(evento, gruppoPromotore, username, gruppiInvitati);
        }

        public async Task<List<Invito>> GetInviti(string nomeEvento, string gruppoPromotore)
        {
            var ctrl = GetCtrl();
            return await ctrl.GetInviti(nomeEvento, gruppoPromotore);
        }

        public async Task<bool> InvitaGruppo(string nomeEvento, string gruppoPromotore, string gruppoInvitato)
        {
            var ctrl = GetCtrl();
            return await ctrl.InvitaGruppo(nomeEvento, gruppoPromotore, gruppoInvitato);
        }

        public async Task<bool> RispondiInvito(string nomeEvento, string gruppoPromotore, string gruppoInvitato, bool accetta, string username)
        {
            var ctrl = GetCtrl();
            return await ctrl.RispondiInvito(nomeEvento, gruppoPromotore, gruppoInvitato, accetta, username);
        }

        public async Task<bool> isCondiviso(string nomeEvento, string nomeGruppo)
        {
            var ctrl = GetCtrl();
            return await ctrl.isCondiviso(nomeEvento, nomeGruppo);
        }
    }
}
        