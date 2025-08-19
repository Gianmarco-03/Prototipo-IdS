using GroupBackend.Model;
using Base.Data;
using Base.Controllers;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Prototipo_IdS.Services;
using EventBackend.Model;
using ChatBackend.Model;

namespace GroupBackend.Controllers
{
    [Route("api/[controller]")]
    public class GruppoController : BaseController, IGruppoController
    {
        private readonly IImageService _imageService;
        public GruppoController(AppDbContext context, IImageService imageService) : base(context) { _imageService = imageService; }


        public async Task<Gruppo?> GetInfo(string nomeGruppo)
        {
            return await _context.Gruppi
                .Where(g => g.Nome == nomeGruppo)
                .Select(g => new Gruppo
                {
                    Nome = g.Nome,
                    ImmagineProfilo = g.ImmagineProfilo,
                    Descrizione = g.Descrizione,
                    Partecipanti = g.Partecipanti
                        .Select(p => new GruppoPartecipante
                        {
                            GruppoNome = p.GruppoNome,
                            Username = p.Username
                        })
                        .ToList(),
                    Amministratori = g.Amministratori
                        .Select(a => new GruppoAmministratore
                        {
                            GruppoNome = a.GruppoNome,
                            Username = a.Username
                        })
                        .ToList()
                })
                .SingleOrDefaultAsync();
        }


        public async Task<bool> CreaGruppo(Gruppo gruppo, string username)
        {
            if (await _context.Gruppi.AnyAsync(g => g.Nome == gruppo.Nome))
                return false;

            _context.Gruppi.Add(gruppo);
            _context.GruppoAmministratori.Add(new GruppoAmministratore
            {
                GruppoNome = gruppo.Nome,
                Username = username
            });

            _context.GruppoPartecipanti.Add(new GruppoPartecipante
            {
                GruppoNome = gruppo.Nome,
                Username = username
            });
              _context.Chats.Add(new Chat
            {
                Gruppo = gruppo.Nome
            });
            await _context.SaveChangesAsync();
            return true;

          
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
        [HttpPost("upload/{nomeGruppo}")]
        public async Task<IActionResult> UploadImage(string nomeGruppo, [FromForm] IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest();

            var gruppo = await _context.Gruppi.FindAsync(nomeGruppo);
            if (gruppo == null)
                return NotFound();

            var url = await _imageService.UploadImageAsync(file, $"gruppi/{nomeGruppo}", "profilo");
            gruppo.ImmagineProfilo = url;
            await _context.SaveChangesAsync();

            return Ok(new { path = gruppo.ImmagineProfilo });
        }

        public async Task<bool> CheckAdmin(string gruppo, string username)
        {
            return await _context.GruppoAmministratori
                .AnyAsync(a => a.GruppoNome == gruppo && a.Username == username);
        }

        public async Task<List<Evento>?> GetEventiGruppo(string nomeGruppo)
        {
            return await _context.Eventi
                .Where(e => e.nomeGruppo == nomeGruppo)
                .ToListAsync();
        }
        
        public async Task<List<EventoApprovato>> FindEventiGruppo(string nomeGruppo, string toSearch)
        {
            return await _context.EventiApprovati
                .Where(e => e.nomeGruppo == nomeGruppo
                    && e.Nome.ToLower().Contains(toSearch.ToLower()))
                .Take(10)
                .ToListAsync();
        }
    }
}
