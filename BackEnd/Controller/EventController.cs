using EventBackend.Model;
using Base.Data;
using Base.Controllers;

namespace EventBackend.Controllers
{
    public class EventController : BaseController, IEventController
    {
        public EventController(AppDbContext context) : base(context) { }

        public async Task<Evento?> GetInfo(string nomeEvento)
        {
            return await _context.Eventi.FindAsync(nomeEvento);
        }

        public async Task<bool> Partecipa(string username, string nomeEvento)
        {
            var e = await _context.Eventi.FindAsync(nomeEvento);
            if (e == null) return false;
            if (!e.Partecipanti.Contains(username)) e.Partecipanti.Add(username);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> Abbandona(string username, string nomeEvento)
        {
            var e = await _context.Eventi.FindAsync(nomeEvento);
            if (e == null) return false;
            e.Partecipanti.Remove(username);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}