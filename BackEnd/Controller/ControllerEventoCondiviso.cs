using EventBackend.Model;
using Base.Data;
using Base.Controllers;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using AdminBackend.Controllers;

namespace EventBackend.Controllers
{
    public class EventoCondivisoController : BaseController, IEventoCondivisoController
    {
        public EventoCondivisoController(AppDbContext context) : base(context)
        {
        }

  public async Task<bool> CreaEventoCondiviso(PropostaEvento evento, string gruppoPromotore, string username, List<string> gruppiInvitati)
        {
            evento.nomeGruppo = gruppoPromotore;

            var approvato = new EventoApprovato
            {
                Nome = evento.Nome,
                Descrizione = evento.Descrizione,
                DataInizio = evento.DataInizio,
                DataFine = evento.DataFine,
                nomeGruppo = evento.nomeGruppo,
                ImmagineProfilo = evento.ImmagineProfilo
            };

            _context.EventiApprovati.Add(approvato);
            _context.EventiCondivisi.Add(new EventoCondiviso
            {
                nomeGruppo = approvato.nomeGruppo,
                nomeEvento = approvato.Nome,
                Tipo = "condiviso"
            });

            await _context.SaveChangesAsync();

            foreach (var g in gruppiInvitati.Distinct())
            {
                if (await _context.Gruppi.AnyAsync(gr => gr.Nome == g))
                {
                    _context.Inviti.Add(new Invito
                    {
                        DaGruppo = gruppoPromotore,
                        PerGruppo = g,
                        EventoCondivisoNome = evento.Nome
                    });
                }
            }

            await _context.SaveChangesAsync();
            return true;
        }


        public async Task<List<Invito>> GetInviti(string nomeEvento, string gruppoPromotore)
        {
            return await _context.Inviti
                .Where(i => i.EventoCondivisoNome == nomeEvento && i.DaGruppo == gruppoPromotore)
                .ToListAsync();
        }

        public async Task<bool> InvitaGruppo(string nomeEvento, string gruppoPromotore, string gruppoInvitato)
        {
            if (!await _context.Gruppi.AnyAsync(g => g.Nome == gruppoInvitato))
                return false;
            if (await _context.Inviti.AnyAsync(i => i.EventoCondivisoNome == nomeEvento && i.DaGruppo == gruppoPromotore && i.PerGruppo == gruppoInvitato))
                return false;
            _context.Inviti.Add(new Invito
            {
                DaGruppo = gruppoPromotore,
                PerGruppo = gruppoInvitato,
                EventoCondivisoNome = nomeEvento
            });
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> RispondiInvito(string nomeEvento, string gruppoPromotore, string gruppoInvitato, bool accetta, string username)
        {
            var invito = await _context.Inviti.SingleOrDefaultAsync(i => i.EventoCondivisoNome == nomeEvento && i.DaGruppo == gruppoPromotore && i.PerGruppo == gruppoInvitato);
            if (invito == null) return false;
            if (accetta)
            {
                invito.Accettato = accetta;
                var esiste =
                    await _context.EventoOrganizzatori
                        .AnyAsync(o => o.EventoNome == nomeEvento && o.nomeGruppo == gruppoPromotore && o.Username == username)
                    &&
                    await _context.EventoPartecipanti
                        .AnyAsync(o => o.EventoNome == nomeEvento && o.nomeGruppo == gruppoPromotore && o.Username == username); ;
                if (!esiste)
                {
                    invito.Accettato = true;
                    _context.EventoOrganizzatori.Add(new EventoOrganizzatore
                    {
                        EventoNome = nomeEvento,
                        nomeGruppo = gruppoPromotore,
                        Username = username
                    });
                    _context.EventoPartecipanti.Add(new EventoPartecipante
                    {

                        EventoNome = nomeEvento,
                        nomeGruppo = gruppoPromotore,
                        Username = username
                    });
                }
                else _context.Inviti.Remove(invito);
            }
            await _context.SaveChangesAsync();
            return true;
        }
    }
}