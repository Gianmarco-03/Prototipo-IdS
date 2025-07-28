using Microsoft.AspNetCore.SignalR;
using AuthBackend.Hubs;
using UtenteBackend.Controllers;
using AuthBackend.Model;

namespace UtenteBackend.Hubs
{
    public class UtenteHub : Hub, IUtenteService
    {
        private readonly IServiceScopeFactory _scopeFactory;

        public UtenteHub(IServiceScopeFactory scopeFactory)
        {
            _scopeFactory = scopeFactory;
        }

        private IUtenteController GetCtrl()
        {
            var scope = _scopeFactory.CreateScope();
            return scope.ServiceProvider.GetRequiredService<IUtenteController>();
        }

        public async Task<Utente?> GetInfo(string username)
        {
            var ctrl = GetCtrl();
            return await ctrl.GetInfo(username);
        }
    }
}