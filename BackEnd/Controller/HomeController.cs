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
                .ToListAsync();
        }

        public async Task<List<EventoApprovato>> GetEventi(string username)
        {
            return await _context.EventiApprovati
            .Include(e => e.Partecipanti)
            .Where(e => e.Partecipanti
            .Any(p => p.Username == username))
            .ToListAsync();
        }
    }
}