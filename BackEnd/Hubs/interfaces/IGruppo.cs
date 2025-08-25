using EventBackend.Model;
using GroupBackend.Model;

namespace GroupBackend.Hubs
{
    public interface IGruppoService
    {
        Task<Gruppo?> GetInfo(string nomeGruppo);
        Task Partecipa(string username, string nomeGruppo);
        Task Abbandona(string username, string nomeGruppo);
        Task<bool> CreaGruppo(Gruppo gruppo, string username);
        Task<bool> CheckAdmin(string gruppo, string username);
        Task<List<Evento>?> getEventiGruppo(string nomeGruppo);
        Task<List<Invito>> GetInvitiPerGruppo(string gruppoInvitato);
        Task<List<EventoApprovato>> FindEventiGruppo(string nomeGruppo, string toSearch);
        Task<bool> UpdateInfo(Gruppo gruppo);
        Task<string?> UploadImage(string nomeGruppo, string fileBase64);
    }
}   