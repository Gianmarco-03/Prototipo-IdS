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
            return await _context.Eventi
                .Where(e => e.Partecipanti.Contains(username))
                .Take(10)
                .ToListAsync();
        }

        public async Task<List<Evento>> FindEventi(string toSearch)
        {
            return await _context.Eventi
                .Where(e => e.Nome.ToLower().Contains(toSearch.ToLower()))
                .Take(10)
                .ToListAsync();
        }
    }
}