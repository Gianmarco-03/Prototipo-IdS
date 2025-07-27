using GroupBackend.Model;
using Base.Data;
using Base.Controllers;
using Microsoft.EntityFrameworkCore;

namespace GroupBackend.Controllers
{
    public class GruppoController : BaseController, IGruppoController
    {
        public GruppoController(AppDbContext context) : base(context) { }

       public async Task<Gruppo?> GetInfo(string nomeGruppo)
        {
            return await _context.Gruppi
                .Include(g => g.Partecipanti)
                .Include(g => g.Amministratori)
                .SingleOrDefaultAsync(g => g.Nome == nomeGruppo);
        }




    public async Task<bool> Partecipa(string username, string nomeGruppo)
    {
        var gruppo = await _context.Gruppi
            .Include(g => g.Partecipanti)
            .SingleOrDefaultAsync(g => g.Nome == nomeGruppo);

        if (gruppo == null) return false;

        if (!gruppo.Partecipanti.Any(p => p.Username == username))
        {
            gruppo.Partecipanti.Add(new GruppoPartecipante
            {
                GruppoNome = nomeGruppo,
                Username = username
            });

            await _context.SaveChangesAsync();
        }

        return true;
    }



    public async Task<bool> Abbandona(string username, string nomeGruppo)
    {
        var gruppo = await _context.Gruppi
            .Include(g => g.Partecipanti)
            .SingleOrDefaultAsync(g => g.Nome == nomeGruppo);

        if (gruppo == null) return false;

        var entry = gruppo.Partecipanti.FirstOrDefault(p => p.Username == username);
        if (entry != null)
        {
            gruppo.Partecipanti.Remove(entry);
            await _context.SaveChangesAsync();
        }

        return true;
    }

    }
}
