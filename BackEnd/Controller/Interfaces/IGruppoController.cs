using EventBackend.Model;
using GroupBackend.Model;

namespace GroupBackend.Controllers
{
    public interface IGruppoController
    {
        Task<Gruppo?> GetInfo(string nomeGruppo);
        Task<bool> Partecipa(string username, string nomeGruppo);
        Task<bool> Abbandona(string username, string nomeGruppo);
        Task<bool> CreaGruppo(Gruppo gruppo, string username);
        Task<bool> CheckAdmin(string gruppo, string username);
        Task<List<Evento>?> GetEventiGruppo(string nomeGruppo);
    }
}
