using System.Threading.Tasks;
using AuthBackend.Model;

namespace UtenteBackend.Controllers
{
    public interface IUtenteController
    {
        Task<Utente?> GetInfo(string username);
    }
}