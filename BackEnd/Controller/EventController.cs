using EventBackend.Model;
using Base.Data;
using Base.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Prototipo_IdS.Services;

namespace EventBackend.Controllers
{
    [Route("api/[controller]")]
    public class EventController : BaseController, IEventController
    {
        private readonly IImageService _imageService;
        public EventController(AppDbContext context, IImageService imageService) : base(context) { _imageService = imageService; }


        public async Task<Evento?> GetInfo(string nomeEvento)
        {
            return await _context.Eventi
                .Include(e => e.Partecipanti)
                .Include(e => e.Organizzatori)
                .SingleOrDefaultAsync(e => e.Nome == nomeEvento);        }

        public async Task<bool> Partecipa(string username, string nomeEvento)
        {
            var evento = await _context.Eventi
                .Include(g => g.Partecipanti)
                .SingleOrDefaultAsync(g => g.Nome == nomeEvento);

            if (evento == null) return false;

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

        public async Task<bool> Abbandona(string username, string nomeEvento)
        {
           var evento = await _context.Eventi
                .Include(ev => ev.Partecipanti)
                .SingleOrDefaultAsync(ev => ev.Nome == nomeEvento);
            if (evento == null) return false;

            var entry = evento.Partecipanti.FirstOrDefault(p => p.Username == username);
            if (entry != null)
            {
                evento.Partecipanti.Remove(entry);
                await _context.SaveChangesAsync();
            }
            return true;
        }


        [HttpPost("upload/{nomeEvento}")]
        public async Task<IActionResult> UploadImage(string nomeEvento, [FromForm] IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest();

            var evento = await _context.Eventi.FindAsync(nomeEvento);
            if (evento == null)
                return NotFound();

            var url = await _imageService.UploadImageAsync(file);
            evento.ImmagineProfilo = url;
            await _context.SaveChangesAsync();

            return Ok(new { path = evento.ImmagineProfilo });
        }
    }
}