using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using ChatSpace;
namespace ChatBackend.Hubs
{
    public class ChatHub : Hub , IChat
    {
       private static Dictionary<string, Chat> gruppi = new Dictionary<string, Chat>();
    private static bool initialized = false;

    private void Initialize()
    {
        if (!initialized)
        {
            gruppi.Add("Gruppo A", new Chat("Gruppo A"));
            gruppi.Add("Gruppo B", new Chat("Gruppo B"));
            gruppi.Add("Gruppo C", new Chat("Gruppo C"));
            initialized = true;
            Console.WriteLine("Dizionario inizializzato con " + gruppi.Count + " gruppi");
        }
    } 
        // Metodo chiamato dal client per inviare messaggi
        public async Task SendMessage(string gruppo, string user, string message){
            if (!initialized) Initialize();

            Chat currentChat = gruppi[gruppo];
            Messaggio m = new Messaggio();
            m.Mittente = user; m.Testo = message;
            currentChat.addMessaggio(m);
            gruppi[gruppo] = currentChat;
            // Invia a tutti i client connessi il messaggio
            await Clients.Groups(gruppo).SendAsync("ReceiveMessage", user, message);
        }

        public async Task JoinGroup(string gruppo){
            if (!initialized) Initialize();

            await Groups.AddToGroupAsync(Context.ConnectionId, gruppo);
            await Clients.Group(gruppo).SendAsync("ReceiveSystemMessage", $"{Context.ConnectionId} è entrato nel gruppo {gruppo}");
            Console.WriteLine("un nuovo utente è entrato nella chat del gruppo " + gruppo);
            /*ipotetica interazione con il database per recuperare la chat associata al nomeGruppo*/
            
            Chat currentChat = gruppi[gruppo]; 
            int n;
            if (currentChat.Messaggi.Count < 3) n = currentChat.Messaggi.Count; //in caso di meno di tre messaggi registrati
            else n = 3;
                List<Messaggio> storico = currentChat.Messaggi.GetRange(currentChat.Messaggi.Count - n, n);
            foreach (Messaggio m in storico){
                Console.WriteLine("carico il messaggio di " + m.Mittente);
                await Clients.Client(Context.ConnectionId).SendAsync("ReceiveMessage", m.Mittente, m.Testo);
            }
        }
    }
}
