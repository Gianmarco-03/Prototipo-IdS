using GroupBackend.Model;

namespace GroupBackend.Hubs
{
    public interface IGruppoService
    {
        Task<Gruppo?> GetInfo(string nomeGruppo);
        Task Partecipa(string username, string nomeGruppo);
        Task Abbandona(string username, string nomeGruppo);
        Task<bool> CreaGruppo(Gruppo evento, string username);
    }
}   