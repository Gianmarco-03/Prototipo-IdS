using System;
using Microsoft.AspNetCore.SignalR;
using SearchBackend.Controllers;
using GroupBackend.Model;
using EventBackend.Model;

namespace SearchBackend.Hubs
{
    public class SearchHub : Hub, ISearchService
    {
        private readonly IServiceScopeFactory _scopeFactory;

        public SearchHub(IServiceScopeFactory scopeFactory)
        {
            _scopeFactory = scopeFactory;
        }

        private ISearchController GetCtrl()
        {
            var scope = _scopeFactory.CreateScope();
            return scope.ServiceProvider.GetRequiredService<ISearchController>();
        }

        public async Task<List<Gruppo>> FindGruppi(string toSearch, bool includeDescription, int? minPartecipanti, int? maxPartecipanti)
        {
            var ctrl = GetCtrl();
            return await ctrl.FindGruppi(toSearch, includeDescription, minPartecipanti, maxPartecipanti);
        }

        public async Task<List<EventoApprovato>> FindEventi(string username, string toSearch, bool includeDescription, int? minPartecipanti, int? maxPartecipanti, DateTime? startDate, DateTime? endDate)
        {
            var ctrl = GetCtrl();
            return await ctrl.FindEventi(username, toSearch, includeDescription, minPartecipanti, maxPartecipanti, startDate, endDate);
        }
    }
}