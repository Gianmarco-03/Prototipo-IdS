using Microsoft.AspNetCore.SignalR;
using EventBackend.Hubs;
using EventBackend.Controllers;
using EventBackend.Model;

namespace EventBackend.Hubs
{
    public class EventHub : Hub, IEventoService
    {
        private readonly IServiceScopeFactory _scopeFactory;

        public EventHub(IServiceScopeFactory scopeFactory)
        {
            _scopeFactory = scopeFactory;
        }

        private IEventController GetCtrl()
        {
            var scope = _scopeFactory.CreateScope();
            return scope.ServiceProvider.GetRequiredService<IEventController>();
        }

        public async Task<Evento?> GetInfo(string nomeEvento)
        {
            var ctrl = GetCtrl();
            return await ctrl.GetInfo(nomeEvento);
        }

        public async Task<bool> CreaEvento(Evento evento, string username)
        {
            var ctrl = GetCtrl();
            return await ctrl.CreaEvento(evento, username);
        }

        public async Task Partecipa(string username, string nomeEvento)
        {
            var ctrl = GetCtrl();
            await ctrl.Partecipa(username, nomeEvento);
        }

        public async Task Abbandona(string username, string nomeEvento)
        {
            var ctrl = GetCtrl();
            await ctrl.Abbandona(username, nomeEvento);
        }
    }
}