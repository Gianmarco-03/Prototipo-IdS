using EventBackend.Model;
using Base.Data;
using Base.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace EventBackend.Controllers
{
    [Route("api/[controller]")]
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


        [HttpPost("upload/{username}")]
        public async Task<IActionResult> UploadImage(string username, [FromForm] IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest();

            var user = await _context.Utenti.FindAsync(username);
            if (user == null)
                return NotFound();

            var folder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");
            Directory.CreateDirectory(folder);

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var path = Path.Combine(folder, fileName);
            using (var stream = new FileStream(path, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            user.ImmagineProfilo = $"/images/{fileName}";
            await _context.SaveChangesAsync();

            return Ok(new { path = user.ImmagineProfilo });
        }
    }
}