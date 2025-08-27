using GroupBackend.Model;
using EventBackend.Model;

namespace HomeBackend.Hubs
{
    public interface IHomeService
    {
        Task<List<Gruppo>> GetGruppi(string username);
        Task<List<EventoApprovato>> GetEventi(string username);
    }
}