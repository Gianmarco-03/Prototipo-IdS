using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace ChatBackend.Hubs
{
    public class ChatHub : Hub
    {
        // Metodo chiamato dal client per inviare messaggi
        public async Task SendMessage(string user, string message)
        {
            // Invia a tutti i client connessi il messaggio
            await Clients.All.SendAsync("ReceiveMessage",user, message);
        }
    }
}
