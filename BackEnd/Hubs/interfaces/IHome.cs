using GroupBackend.Model;
using EventBackend.Model;

namespace HomeBackend.Hubs
{
    public interface IHomeService
    {
        Task<List<Gruppo>> GetGruppi(string username);
        Task<List<Gruppo>> FindGruppi(string toSearch);
        Task<List<EventoApprovato>> GetEventi(string username);
        Task<List<Evento>> FindEventi(string toSearch);
    }
}