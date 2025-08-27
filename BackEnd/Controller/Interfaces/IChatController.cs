// Services/IChatService.cs
using System.Collections.Generic;
using ChatBackend.Model;
namespace ChatBackend.Controllers
{
    public interface IChatController
    {
        public  Task SendMessage(Messaggio m);
        public Task<List<Messaggio>> GetLast(string gruppo);
        public Task DeleteMessage(int id);  

    }
}
