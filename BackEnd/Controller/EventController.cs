using EventBackend.Model;
using Base.Data;
using Base.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Prototipo_IdS.Services;
using Microsoft.EntityFrameworkCore.Migrations.Operations;

namespace EventBackend.Controllers
{
    [Route("api/[controller]")]
    public class EventController : BaseController, IEventController
    {
        private readonly IImageService _imageService;
        public EventController(AppDbContext context, IImageService imageService) : base(context) { _imageService = imageService; }


        public async Task<Evento?> GetInfo(string nomeEvento, string nomeGruppo)
        {
            return await _context.EventiApprovati
                .Where(e => e.nomeGruppo == nomeGruppo && e.Nome == nomeEvento)
                .Select(e => new EventoApprovato
                {
                    Nome = e.Nome,
                    nomeGruppo = e.nomeGruppo,
                    Descrizione = e.Descrizione,
                    DataInizio = e.DataInizio,
                    DataFine = e.DataFine,
                    ImmagineProfilo = e.ImmagineProfilo,
                    Partecipanti = e.Partecipanti
                        .Select(p => new EventoPartecipante
                        {
                            nomeGruppo = p.nomeGruppo,
                            EventoNome = p.EventoNome,
                            Username = p.Username
                        }).ToList(),
                    Organizzatori = e.Organizzatori
                        .Select(p => new EventoOrganizzatore
                        {
                            nomeGruppo = p.nomeGruppo,
                            EventoNome = p.EventoNome,
                            Username = p.Username
                        }).ToList()
                })
                .SingleOrDefaultAsync();
        }


        public async Task<bool> CreaEvento(PropostaEvento evento, string username)
        {
            if (await _context.Eventi.AnyAsync(e => e.Nome == evento.Nome))
                return false;

            _context.Proposte.Add(evento);
            _context.EventoOrganizzatori.Add(new EventoOrganizzatore
            {
                EventoNome = evento.Nome,
                nomeGruppo = evento.nomeGruppo,
                Username = username
            });
            _context.EventoPartecipanti.Add(new EventoPartecipante
            {
                EventoNome = evento.Nome,
                nomeGruppo = evento.nomeGruppo,
                Username = username
            });
            await _context.SaveChangesAsync();
            return true;
        }



        public async Task<bool> Partecipa(string username, string nomeEvento, string nomeGruppo)
 {
            var evento = await _context.EventiApprovati
                .Include(g => g.Partecipanti)
                .SingleOrDefaultAsync(g => g.Nome == nomeEvento && g.nomeGruppo == nomeGruppo);

            if (evento == null) return false;

            var userGroups = await _context.GruppoPartecipanti
                .Where(gp => gp.Username == username)
                .Select(gp => gp.GruppoNome)
                .ToListAsync();

            var allowed = userGroups.Contains(nomeGruppo);

            if (!allowed)
            {
                var invited = await _context.Inviti
                    .Where(i => i.EventoCondivisoNome == nomeEvento && i.DaGruppo == nomeGruppo && i.Accettato == true)
                    .Select(i => i.PerGruppo)
                    .ToListAsync();

                allowed = userGroups.Any(g => invited.Contains(g));
            }

            if (!allowed) return false;


            if (!evento.Partecipanti.Any(p => p.Username == username))
            {
                evento.Partecipanti.Add(new EventoPartecipante
                {
                    EventoNome = nomeEvento,
                    Username = username
                });

                await _context.SaveChangesAsync();
            }

            return true;
        }

        public async Task<bool> Abbandona(string username, string nomeEvento, string nomeGruppo)
        {
            var evento = await _context.EventiApprovati
                 .Include(ev => ev.Partecipanti)
                 .SingleOrDefaultAsync(ev => ev.Nome == nomeEvento && ev.nomeGruppo == nomeGruppo);
            if (evento == null) return false;

            var entry = evento.Partecipanti.FirstOrDefault(p => p.Username == username);
            if (entry != null)
            {
                evento.Partecipanti.Remove(entry);
                await _context.SaveChangesAsync();
            }
            return true;
        }

        public async Task<bool> UpdateInfo(Evento evento)
        {
            var ev = await _context.EventiApprovati.SingleOrDefaultAsync(e => e.Nome == evento.Nome && e.nomeGruppo == evento.nomeGruppo);
            if (ev == null) return false;

            ev.Descrizione = evento.Descrizione;
            ev.DataInizio = evento.DataInizio;
            ev.DataFine = evento.DataFine;
            ev.ImmagineProfilo = evento.ImmagineProfilo;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<string?> UploadImage(string nomeEvento, string nomeGruppo, IFormFile file)
        {
            if (file == null || file.Length == 0)
                return null;

            var evento = await _context.EventiApprovati.SingleOrDefaultAsync(e => e.Nome == nomeEvento && e.nomeGruppo == nomeGruppo);
            if (evento == null)
                return null;

            var url = await _imageService.UploadImageAsync(file, $"eventi/{nomeEvento}", "profilo");
            evento.ImmagineProfilo = url;
            await _context.SaveChangesAsync();

            return evento.ImmagineProfilo;
        }

        public async Task<bool> CheckOrganizzatore(string nomeEvento, string nomeGruppo, string username)
        {
            return await _context.EventoOrganizzatori.AnyAsync(o => o.EventoNome == nomeEvento && o.nomeGruppo == nomeGruppo && o.Username == username);
        }

    }
}