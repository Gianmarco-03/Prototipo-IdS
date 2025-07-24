// Services/IChatService.cs
using System.Collections.Generic;

namespace ChatBackend.Hubs
{
    public interface IChatService
    {
        public Task SendMessage(string gruppo, string user, string message);
        public Task JoinGroup(string gruppo);

    }
}
