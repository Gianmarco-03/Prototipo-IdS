using Microsoft.AspNetCore.SignalR;
using HomeBackend.Controllers;
using GroupBackend.Model;
using EventBackend.Model;

namespace HomeBackend.Hubs
{
    public class HomeHub : Hub, IHomeService
    {
        private readonly IServiceScopeFactory _scopeFactory;

        public HomeHub(IServiceScopeFactory scopeFactory)
        {
            _scopeFactory = scopeFactory;
        }

        private IHomeController GetCtrl()
        {
            var scope = _scopeFactory.CreateScope();
            return scope.ServiceProvider.GetRequiredService<IHomeController>();
        }

        public async Task<List<Gruppo>> GetGruppi(string username)
        {
            var ctrl = GetCtrl();
            var res = await ctrl.GetGruppi(username);
            foreach (var gruppo in res)
            {
                Console.WriteLine($"Nome: {gruppo.Nome}");
            }         
            return res;
        }

        public async Task<List<Gruppo>> FindGruppi(string toSearch)
        {
            var ctrl = GetCtrl();
            return await ctrl.FindGruppi(toSearch);
        }

        public async Task<List<EventoApprovato>> GetEventi(string username)
        {
            var ctrl = GetCtrl();
            return await ctrl.GetEventi(username);
        }

        public async Task<List<EventoApprovato>> FindEventi(string username, string toSearch)
        {
            var ctrl = GetCtrl();
            return await ctrl.FindEventi(username, toSearch);
        }
    }
}