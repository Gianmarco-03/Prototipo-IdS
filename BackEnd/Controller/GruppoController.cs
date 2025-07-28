using GroupBackend.Model;
using Base.Data;
using Base.Controllers;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace GroupBackend.Controllers
{
    [Route("api/[controller]")]
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
        [HttpPost("upload/{nomeGruppo}")]
        public async Task<IActionResult> UploadImage(string nomeGruppo, [FromForm] IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest();

            var gruppo = await _context.Gruppi.FindAsync(nomeGruppo);
            if (gruppo == null)
                return NotFound();

            var folder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");
            Directory.CreateDirectory(folder);

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var path = Path.Combine(folder, fileName);
            using (var stream = new FileStream(path, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            gruppo.ImmagineProfilo = $"/images/{fileName}";
            await _context.SaveChangesAsync();

            return Ok(new { path = gruppo.ImmagineProfilo });
        }
        
    }
}
