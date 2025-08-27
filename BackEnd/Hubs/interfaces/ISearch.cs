using System;
using GroupBackend.Model;
using EventBackend.Model;

namespace SearchBackend.Hubs
{
    public interface ISearchService
    {
        Task<List<Gruppo>> FindGruppi(string toSearch, bool includeDescription, int? minPartecipanti, int? maxPartecipanti);
        Task<List<EventoApprovato>> FindEventi(string username, string toSearch, bool includeDescription, int? minPartecipanti, int? maxPartecipanti, DateTime? startDate, DateTime? endDate);
    }
}