// Services/IChatService.cs
using System.Collections.Generic;

namespace ChatSpace
{
    public interface IChat
    {
        public Task SendMessage(string gruppo, string user, string message);
        public Task JoinGroup(string gruppo);

    }
}
