using EventBackend.Model;

namespace EventBackend.Hubs
{
    public interface IEventoService
    {
        Task<Evento?> GetInfo(string nomeEvento);
        Task Partecipa(string username, string nomeEvento);
        Task Abbandona(string username, string nomeEvento);
        Task<bool> CreaEvento(Evento evento, string username);
    }
}