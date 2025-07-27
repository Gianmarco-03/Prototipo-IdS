using GroupBackend.Model;

namespace GroupBackend.Controllers
{
    public interface IGruppoController
    {
        Task<Gruppo?> GetInfo(string nomeGruppo);
        Task<bool> Partecipa(string username, string nomeGruppo);
        Task<bool> Abbandona(string username, string nomeGruppo);
    }
}
