using EventBackend.Model;

namespace EventBackend.Hubs
{
    public interface IEventoService
    {
        Task<Evento?> GetInfo(string nomeEvento, string nomeGruppo);
        Task Partecipa(string username, string nomeEvento);
        Task Abbandona(string username, string nomeEvento);
        Task<bool> CreaEvento(PropostaEvento evento, string username);
    }
}