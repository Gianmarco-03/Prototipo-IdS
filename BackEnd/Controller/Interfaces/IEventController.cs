using EventBackend.Model;

namespace EventBackend.Controllers
{
    public interface IEventController
    {
        Task<Evento?> GetInfo(string nomeEvent, string nomeGruppo);
        Task<bool> Partecipa(string username, string nomeEvento, string nomeGruppo);
        Task<bool> Abbandona(string username, string nomeEvento, string nomeGruppo);
        Task<bool> CreaEvento(PropostaEvento evento, string username);
    }
}