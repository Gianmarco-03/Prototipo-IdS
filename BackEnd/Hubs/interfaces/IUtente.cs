using System.Threading.Tasks;
using AuthBackend.Model;

namespace AuthBackend.Hubs
{
    public interface IUtenteService
    {
        Task<Utente?> GetInfo(string username);
    }
}