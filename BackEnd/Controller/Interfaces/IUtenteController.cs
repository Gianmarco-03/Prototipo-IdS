using System.Threading.Tasks;
using AuthBackend.Model;

namespace UtenteBackend.Controllers
{
    public interface IUtenteController
    {
        Task<Utente?> GetInfo(string username);
        Task<bool> UpdateInfo(Utente utente);
        Task<string?> UploadImage(string username, IFormFile file);
    }
}