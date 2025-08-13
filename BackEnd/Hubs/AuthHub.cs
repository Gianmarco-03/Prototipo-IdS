using Microsoft.AspNetCore.SignalR;
using AuthBackend.Controllers;
using AuthBackend.Model;


namespace AuthBackend.Hubs
{
    public class AuthHub : Hub, IAuthService
    {
        private readonly IServiceScopeFactory _scopeFactory;
        public AuthHub(IServiceScopeFactory scopeFactory)
        {
            _scopeFactory = scopeFactory;
        }

        private IAuthController GetCtrl()
        {
            var scope = _scopeFactory.CreateScope();
            return scope.ServiceProvider.GetRequiredService<IAuthController>();
        }

        public async Task<string> Login(string username, string password)
        {
            var ctrl = GetCtrl();
            var user = await ctrl.Autentica(username, password);
            return user != null ? username : null;
        }

        public async Task Registra(Utente utente)
        {
            utente.DataDiNascita =  utente.DataDiNascita.ToUniversalTime();
            var ctrl = GetCtrl();
            var ok = await ctrl.Registra(utente);
            await Clients.Caller.SendAsync("RegistrazioneEsito", ok);
        }
    }
}
