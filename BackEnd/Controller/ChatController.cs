using ChatBackend.Model;
using ChatBackend.Hubs;
using ChatBackend.Data;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace ChatBackend.Controllers;
public class ChatController : BaseController, IChatController 
{

    public ChatController(AppDbContext context) : base(context) { }

    private async Task<Chat?> GetChatAsync(string gruppo)
    {
        Console.WriteLine("cerco il gruppo " + gruppo);
        Chat? chat = await _context.Chats.FindAsync(gruppo);
        return chat;
    }
    public async Task SendMessage(Messaggio m)
    {
        Chat chat = await GetChatAsync(m.chat_id);
        chat.addMessaggio(m);
        await _context.SaveChangesAsync();
    }

    public async Task<List<Messaggio>> GetLast(string gruppo)
    {
        return (await _context.Messaggi
        .Where(m => m.chat_id == gruppo)
        .OrderByDescending(m => m.DataOra)
        .Take(10)
        .ToListAsync()).OrderBy(m => m.DataOra).ToList();
    }
}
