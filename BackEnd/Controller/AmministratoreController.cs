using Base.Controllers;
using Base.Data;
using Microsoft.EntityFrameworkCore;
using EventBackend.Model;
using GroupBackend.Model;

namespace AdminBackend.Controllers
{
    public class AmministratoreController : BaseController, IAmministratoreController
    {
        public AmministratoreController(AppDbContext context) : base(context) { }

        private async Task<bool> IsAdmin(string gruppo, string username)
        {
            return await _context.GruppoAmministratori.AnyAsync(a => a.GruppoNome == gruppo && a.Username == username);
        }

        public async Task<bool> ApprovaEvento(string nomeEvento, string nomeGruppo, string usernameAdmin)
        {
            if (!await IsAdmin(nomeGruppo, usernameAdmin)) return false;

            var proposta = await _context.Proposte.SingleOrDefaultAsync(p => p.Nome == nomeEvento && p.nomeGruppo == nomeGruppo);
            if (proposta == null) return false;

            var partecipanti = await _context.EventoPartecipanti
                .Where(p => p.EventoNome == nomeEvento)
                .Select(p => new { p.Username, p.nomeGruppo })
                .ToListAsync();
            var organizzatori = await _context.EventoOrganizzatori
                .Where(o => o.EventoNome == nomeEvento)
                .Select(o => new { o.Username, o.nomeGruppo })
                .ToListAsync();

            _context.Proposte.Remove(proposta);
            _context.EventiApprovati.Add(new EventoApprovato
            {
                Nome = proposta.Nome,
                Descrizione = proposta.Descrizione,
                DataInizio = proposta.DataInizio,
                DataFine = proposta.DataFine,
                nomeGruppo = proposta.nomeGruppo,
                ImmagineProfilo = proposta.ImmagineProfilo,
                Approvato = true
            });
            _context.Chats.Add(new ChatBackend.Model.Chat
            {
                Gruppo = nomeGruppo +"/"+ nomeEvento
            });
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> BocciaEvento(string nomeEvento, string nomeGruppo, string usernameAdmin)
        {
            if (!await IsAdmin(nomeGruppo, usernameAdmin)) return false;
            var proposta = await _context.Proposte.SingleOrDefaultAsync(p => p.Nome == nomeEvento);
            if (proposta == null) return false;
            _context.Proposte.Remove(proposta);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> Promuovi(string nomeGruppo, string username, string usernameAdmin)
        {
            if (!await IsAdmin(nomeGruppo, usernameAdmin)) return false;
            if (await _context.GruppoAmministratori.AnyAsync(a => a.GruppoNome == nomeGruppo && a.Username == username))
                return false;
            _context.GruppoAmministratori.Add(new GruppoAmministratore { GruppoNome = nomeGruppo, Username = username });
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> Rimuovi(string nomeGruppo, string username, string usernameAdmin)
        {
            if (!await IsAdmin(nomeGruppo, usernameAdmin)) return false;
            var part = await _context.GruppoPartecipanti.FirstOrDefaultAsync(p => p.GruppoNome == nomeGruppo && p.Username == username);
            if (part != null) _context.GruppoPartecipanti.Remove(part);
            var admin = await _context.GruppoAmministratori.FirstOrDefaultAsync(a => a.GruppoNome == nomeGruppo && a.Username == username);
            if (admin != null) _context.GruppoAmministratori.Remove(admin);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
