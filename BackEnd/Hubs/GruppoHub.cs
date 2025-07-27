using Microsoft.AspNetCore.SignalR;
using GroupBackend.Hubs;
using GroupBackend.Controllers;
using GroupBackend.Model;

namespace GroupBackend.Hubs
{
    public class GruppoHub : Hub, IGruppoService
    {
        private readonly IServiceScopeFactory _scopeFactory;

        public GruppoHub(IServiceScopeFactory scopeFactory)
        {
            _scopeFactory = scopeFactory;
        }

        private IGruppoController GetCtrl()
        {
            var scope = _scopeFactory.CreateScope();
            return scope.ServiceProvider.GetRequiredService<IGruppoController>();
        }

        public async Task<Gruppo?> GetInfo(string nomeGruppo)
        {
            var ctrl = GetCtrl();
            return await ctrl.GetInfo(nomeGruppo);
        }

        public async Task Partecipa(string username, string nomeGruppo)
        {
            var ctrl = GetCtrl();
            await ctrl.Partecipa(username, nomeGruppo);
        }

        public async Task Abbandona(string username, string nomeGruppo)
        {
            var ctrl = GetCtrl();
            await ctrl.Abbandona(username, nomeGruppo);
        }
    }
}
