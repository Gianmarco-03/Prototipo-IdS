using EventBackend.Model;
using GroupBackend.Model;
using Microsoft.AspNetCore.Http;

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
        public Task<List<EventoApprovato>> FindEventiGruppo(string nomeGruppo, string toSearch);
        Task<bool> UpdateInfo(Gruppo gruppo);
        Task<string?> UploadImage(string nomeGruppo, IFormFile file);

    }
}
