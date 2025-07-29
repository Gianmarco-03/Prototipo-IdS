using AuthBackend.Model;
using Base.Data;
using Microsoft.EntityFrameworkCore;
using Base.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Prototipo_IdS.Services;

namespace AuthBackend.Controllers;

[Route("api/[controller]")]
public class AuthController : BaseController, IAuthController
{
    private readonly IImageService _imageService;

    public AuthController(AppDbContext context, IImageService imageService)
        : base(context)
    {
        _imageService = imageService;
    }
    public async Task<bool> Registra(Utente u)
    {
        if (await _context.Utenti.AnyAsync(x => x.Username == u.Username))
        {
            return false;
        }
        _context.Utenti.Add(u);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<Utente?> Autentica(string username, string password)
    {
        return await _context.Utenti.FirstOrDefaultAsync(u => u.Username == username && u.Password == password);
    }

    [HttpPost("upload/{username}")]
    public async Task<IActionResult> UploadImage(string username, [FromForm] IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest();

        var user = await _context.Utenti.FindAsync(username);
        if (user == null)
            return NotFound();

        var url = await _imageService.UploadImageAsync(file);
        user.ImmagineProfilo = url;
        await _context.SaveChangesAsync();

        return Ok(new { path = user.ImmagineProfilo });
    }
}
