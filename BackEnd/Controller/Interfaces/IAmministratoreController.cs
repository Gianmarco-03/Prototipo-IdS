using EventBackend.Model;
using System.Threading.Tasks;

namespace AdminBackend.Controllers
{
    public interface IAmministratoreController
    {
        Task<bool> ApprovaEvento(string nomeEvento, string nomeGruppo, string usernameAdmin);
        Task<bool> BocciaEvento(string nomeEvento, string nomeGruppo, string usernameAdmin);
        Task<bool> Promuovi(string nomeGruppo, string username, string usernameAdmin);
        Task<bool> Rimuovi(string nomeGruppo, string username, string usernameAdmin);
    }
}
