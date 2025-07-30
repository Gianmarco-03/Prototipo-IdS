using AuthBackend.Model;
using Base.Data;
using Microsoft.EntityFrameworkCore;
using Base.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Prototipo_IdS.Services;
using Microsoft.AspNetCore.Identity;

namespace AuthBackend.Controllers;

[Route("api/[controller]")]
public class AuthController : BaseController, IAuthController
{
    private readonly IImageService _imageService;
    private readonly IPasswordHasher<Utente> _passwordHasher;

     public AuthController(AppDbContext context, IImageService imageService,
        IPasswordHasher<Utente> passwordHasher)
        : base(context)
    {
        _imageService = imageService;
        _passwordHasher = passwordHasher;
    }
    public async Task<bool> Registra(Utente u)
    {
        if (await _context.Utenti.AnyAsync(x => x.Username == u.Username))
        {
            return false;
        }
        u.Password = _passwordHasher.HashPassword(u, u.Password);
        _context.Utenti.Add(u);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<Utente?> Autentica(string username, string password)
    {
        var user = await _context.Utenti.FirstOrDefaultAsync(u => u.Username == username);
        if (user == null)
            return null;

        var result = _passwordHasher.VerifyHashedPassword(user, user.Password, password);
        return result == PasswordVerificationResult.Success ? user : null;
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
