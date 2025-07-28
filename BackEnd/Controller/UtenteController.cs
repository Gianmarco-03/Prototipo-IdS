using AuthBackend.Model;
using Base.Data;
using Base.Controllers;
using Microsoft.EntityFrameworkCore;

namespace UtenteBackend.Controllers
{
    public class UtenteController : BaseController, IUtenteController
    {
        public UtenteController(AppDbContext context) : base(context) { }

        public async Task<Utente?> GetInfo(string username)
        {
            return await _context.Utenti.SingleOrDefaultAsync(u => u.Username == username);
        }
    }
}