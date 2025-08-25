using Base.Controllers;
using Base.Data;
using GroupBackend.Model;
using EventBackend.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.ObjectPool;

namespace HomeBackend.Controllers
{
    public class HomeController : BaseController, IHomeController
    {
        public HomeController(AppDbContext context) : base(context) { }

        public async Task<List<Gruppo>> GetGruppi(string username)
        {
            return await _context.Gruppi
                .Include(g => g.Partecipanti)
                .Where(g => g.Partecipanti.Any(p => p.Username == username))
                .OrderByDescending(g => g.Nome)
                .Take(10)
                .ToListAsync();
        }

        public async Task<List<Gruppo>> FindGruppi(string toSearch)
        {
            return await _context.Gruppi
                .Where(g => g.Nome.ToLower().Contains(toSearch.ToLower()))
                .Take(10)
                .ToListAsync();
        }

        public async Task<List<Evento>> GetEventi(string username)
        {
            var approvati = await GetEventiApprovati(username);  // List<EventoApprovato>
            var condivisi = await GetEventiCondivisi(username);  // List<EventoCondiviso>

            var tutti = approvati.Cast<Evento>()
                                .Concat(condivisi.Cast<Evento>())
                                // opzionale: deduplica per (Nome, NomeGruppo)
                                .GroupBy(e => new { e.Nome, e.nomeGruppo })
                                .Select(g => g.First())
                                .ToList();

            return tutti;
        }

        private async Task<List<EventoApprovato>> GetEventiApprovati(string username)
        { 
                return await _context.EventiApprovati
                .Where(e => _context.GruppoPartecipanti
                .Any(gp => gp.GruppoNome == e.nomeGruppo && gp.Username == username))
                .Take(10)
                .ToListAsync();
        }

        private async Task<List<EventoCondiviso>> GetEventiCondivisi(string username)
        { 
               return await _context.EventiApprovati
                .Where(e => _context.EventoDecoratori
                    .Any(ed => ed.nomeEvento == e.Nome && ed.nomeGruppo == e.nomeGruppo && ed.Tipo == "condiviso")
                    && _context.GruppoPartecipanti
                        .Any(gp => gp.GruppoNome == e.nomeGruppo && gp.Username == username))
                .Select(e => new EventoCondiviso(e))
                .Take(10)
                .ToListAsync();
        }

        //bisogna vedere se si riesce a fare una sola funzione

        public async Task<List<EventoApprovato>> FindEventi(string username, string toSearch)
        {
            return await _context.EventiApprovati
                .Where(e => e.Nome.ToLower().Contains(toSearch.ToLower()))
                .Take(10)
                .ToListAsync();
        }
    }
}