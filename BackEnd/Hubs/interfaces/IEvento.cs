using EventBackend.Model;

namespace EventBackend.Hubs
{
    public interface IEventoService
    {
        Task<Evento?> GetInfo(string nomeEvento, string nomeGruppo);
        Task Partecipa(string username, string nomeEvento, string nomeGruppo);
        Task Abbandona(string username, string nomeEvento, string nomeGruppo);
        Task<bool> CreaEvento(PropostaEvento evento, string username);
        Task<bool> UpdateInfo(EventoApprovato evento);
        Task<string?> UploadImage(string nomeEvento, string nomeGruppo, string fileBase64);
        Task<bool> CheckOrganizzatore(string nomeEvento, string nomeGruppo, string username);
    }
}