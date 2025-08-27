using GroupBackend.Model;
using EventBackend.Model;

namespace HomeBackend.Controllers
{
    public interface IHomeController
    {
        Task<List<Gruppo>> GetGruppi(string username);
        Task<List<EventoApprovato>> GetEventi(string username);        
    }
}