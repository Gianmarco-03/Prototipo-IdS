using AuthBackend.Model;
using Base.Data;
using Microsoft.EntityFrameworkCore;
using Base.Controllers;

namespace AuthBackend.Controllers;

public class AuthController : BaseController, IAuthController
{
    public AuthController(AppDbContext context) : base(context) { }

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
}
