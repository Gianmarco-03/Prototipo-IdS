using EventBackend.Model;

namespace EventBackend.Controllers
{
    public interface IEventController
    {
        Task<Evento?> GetInfo(string nomeEvento);
        Task<bool> Partecipa(string username, string nomeEvento);
        Task<bool> Abbandona(string username, string nomeEvento);
    }
}