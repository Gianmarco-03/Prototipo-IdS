using System.Threading.Tasks;
using AuthBackend.Model;

namespace AuthBackend.Hubs
{
    public interface IUtenteService
    {
        Task<Utente?> GetInfo(string username);
        Task<bool> UpdateInfo(Utente utente);
        Task<string?> UploadImage(string username, string fileBase64);
    }
}