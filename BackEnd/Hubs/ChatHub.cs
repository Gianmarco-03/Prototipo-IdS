using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using ChatBackend.Controllers;
using ChatBackend.Model;

namespace ChatBackend.Hubs
{
    public class ChatHub : Hub , IChatService
    {
        // Metodo chiamato dal client per inviare messaggi
        private readonly IServiceScopeFactory _scopeFactory;
         public ChatHub(IServiceScopeFactory scopeFactory)
        {
            _scopeFactory = scopeFactory;
        }

        private IChatController getCtrl()
        {
            var scope = _scopeFactory.CreateScope();
            var controller = scope.ServiceProvider.GetRequiredService<IChatController>();
            return controller;
        }

        
        public async Task SendMessage(string gruppo, string user, string message)
        {

            Messaggio m = new Messaggio();
            m.Mittente = user; m.Testo = message; m.chat_id = gruppo;
            IChatController ctrl = this.getCtrl();
            ctrl.SendMessage(m);
            // Invia a tutti i client connessi il messaggio
            await Clients.Groups(gruppo).SendAsync("ReceiveMessage", user, message);
        }

        public async Task JoinGroup(string gruppo)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, gruppo);
            IChatController ctrl = this.getCtrl();
            List<Messaggio> toSend = await ctrl.GetLast(gruppo);
            foreach (Messaggio m in toSend)
            {
                await Clients.Caller.SendAsync("ReceiveMessage", m.Mittente, m.Testo);
            }
           
        }
    }
}

