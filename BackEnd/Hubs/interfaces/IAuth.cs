using System.Threading.Tasks;
using AuthBackend.Model;

namespace AuthBackend.Hubs
{
    public interface IAuthService
    {
        Task<string> Login(string username, string password);
        Task Registra(Utente utente);
    }
}