using Base.Controllers;
using Base.Data;
using GroupBackend.Model;
using EventBackend.Model;
using Microsoft.EntityFrameworkCore;

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

        public async Task<List<EventoApprovato>> GetEventi(string username)
        {
            return await _context.EventiApprovati
                .Where(e => _context.GruppoPartecipanti
                .Any(gp => gp.GruppoNome == e.GruppoId && gp.Username == username))
                .Take(10)
                .ToListAsync();
        }

        public async Task<List<EventoApprovato>> FindEventi(string username, string toSearch)
        {
            return await _context.EventiApprovati
                .Where(e => e.Nome.ToLower().Contains(toSearch.ToLower()))
                .Take(10)
                .ToListAsync();
        }
    }
}