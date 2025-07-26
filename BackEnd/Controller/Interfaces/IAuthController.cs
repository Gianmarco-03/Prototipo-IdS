using System.Threading.Tasks;
using AuthBackend.Model;

namespace AuthBackend.Controllers
{
    public interface IAuthController
    {
        Task<bool> Registra(Utente u);
        Task<Utente?> Autentica(string username, string password);
    }
}
