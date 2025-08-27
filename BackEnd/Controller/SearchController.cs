using System;
using Base.Controllers;
using Base.Data;
using GroupBackend.Model;
using EventBackend.Model;
using Microsoft.EntityFrameworkCore;

namespace SearchBackend.Controllers
{
    public class SearchController : BaseController, ISearchController
    {
        public SearchController(AppDbContext context) : base(context) { }

        public async Task<List<Gruppo>> FindGruppi(string toSearch, bool includeDescription, int? minPartecipanti, int? maxPartecipanti)
        {
            return await _context.Gruppi
                .Include(g => g.Partecipanti)
                .Where(g =>
                    (string.IsNullOrEmpty(toSearch) ||
                     g.Nome.ToLower().Contains(toSearch.ToLower()) ||
                     (includeDescription && (g.Descrizione ?? "").ToLower().Contains(toSearch.ToLower()))) &&
                    (!minPartecipanti.HasValue || g.Partecipanti.Count >= minPartecipanti) &&
                    (!maxPartecipanti.HasValue || g.Partecipanti.Count <= maxPartecipanti))
                .Take(10)
                .ToListAsync();
        }

        public async Task<List<EventoApprovato>> FindEventi(string username, string toSearch, bool includeDescription, int? minPartecipanti, int? maxPartecipanti, DateTime? startDate, DateTime? endDate)
        {
            return await _context.EventiApprovati
                .Include(e => e.Partecipanti)
                .Where(e =>
                    (string.IsNullOrEmpty(toSearch) ||
                     e.Nome.ToLower().Contains(toSearch.ToLower()) ||
                     (includeDescription && (e.Descrizione ?? "").ToLower().Contains(toSearch.ToLower()))) &&
                    (!minPartecipanti.HasValue || e.Partecipanti.Count >= minPartecipanti) &&
                    (!maxPartecipanti.HasValue || e.Partecipanti.Count <= maxPartecipanti) &&
                    (!startDate.HasValue || e.DataInizio >= startDate) &&
                    (!endDate.HasValue || (e.DataFine ?? e.DataInizio) <= endDate))
                .Take(10)
                .ToListAsync();
        }
    }
}