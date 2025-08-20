using EventBackend.Model;
using Microsoft.AspNetCore.Http;

namespace EventBackend.Controllers
{
    public interface IEventController
    {
        Task<Evento?> GetInfo(string nomeEvent, string nomeGruppo);
        Task<bool> Partecipa(string username, string nomeEvento, string nomeGruppo);
        Task<bool> Abbandona(string username, string nomeEvento, string nomeGruppo);
        Task<bool> CreaEvento(PropostaEvento evento, string username);
        Task<bool> UpdateInfo(Evento evento);
        Task<string?> UploadImage(string nomeEvento, string nomeGruppo, IFormFile file);
        Task<bool> CheckOrganizzatore(string nomeEvento, string nomeGruppo, string username);
    }
}