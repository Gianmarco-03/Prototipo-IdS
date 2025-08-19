using AuthBackend.Model;
using Base.Data;
using Base.Controllers;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Prototipo_IdS.Services;

namespace UtenteBackend.Controllers
{
    [Route("api/[controller]")]
    public class UtenteController : BaseController, IUtenteController
    {
        private readonly IImageService _imageService;

        public UtenteController(AppDbContext context, IImageService imageService) : base(context)
        {
            _imageService = imageService;
        }

        public async Task<Utente?> GetInfo(string username)
        {
            return await _context.Utenti.SingleOrDefaultAsync(u => u.Username == username);
        }

        public async Task<bool> UpdateInfo(Utente utente)
        {
            var user = await _context.Utenti.SingleOrDefaultAsync(u => u.Username == utente.Username);
            if (user == null) return false;

            user.ImmagineProfilo = utente.ImmagineProfilo;
            user.Biografia = utente.Biografia;
            user.Hashtag = utente.Hashtag;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<string?> UploadImage(string username, IFormFile file)
        {
            if (file == null || file.Length == 0)
                return null;

            var user = await _context.Utenti.FindAsync(username);
            if (user == null)
                return null;

            var url = await _imageService.UploadImageAsync(file, "profili", user.Username);
            user.ImmagineProfilo = url;
            await _context.SaveChangesAsync();

            return user.ImmagineProfilo;
        }
    }
}