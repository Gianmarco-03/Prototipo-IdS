using Microsoft.AspNetCore.SignalR;
using AdminBackend.Hubs;
using AdminBackend.Controllers;

namespace AdminBackend.Hubs
{
    public class AmministratoreHub : Hub, IAmministratoreService
    {
        private readonly IServiceScopeFactory _scopeFactory;

        public AmministratoreHub(IServiceScopeFactory scopeFactory)
        {
            _scopeFactory = scopeFactory;
        }

        private IAmministratoreController GetCtrl()
        {
            var scope = _scopeFactory.CreateScope();
            return scope.ServiceProvider.GetRequiredService<IAmministratoreController>();
        }

        public async Task<bool> ApprovaEvento(string nomeEvento, string nomeGruppo, string usernameAdmin)
        {
            var ctrl = GetCtrl();
            return await ctrl.ApprovaEvento(nomeEvento, nomeGruppo, usernameAdmin);
        }

        public async Task<bool> BocciaEvento(string nomeEvento, string nomeGruppo, string usernameAdmin)
        {
            var ctrl = GetCtrl();
            return await ctrl.BocciaEvento(nomeEvento, nomeGruppo, usernameAdmin);
        }

        public async Task<bool> Promuovi(string nomeGruppo, string username, string usernameAdmin)
        {
            var ctrl = GetCtrl();
            return await ctrl.Promuovi(nomeGruppo, username, usernameAdmin);
        }

        public async Task<bool> Rimuovi(string nomeGruppo, string username, string usernameAdmin)
        {
            var ctrl = GetCtrl();
            return await ctrl.Rimuovi(nomeGruppo, username, usernameAdmin);
        }
    }
}
