// Models/Chat.cs
using System.Collections.Generic;

namespace ChatSpace
{
    public class Chat
    {


        public string Gruppo { get; set; }
        public List<Messaggio> Messaggi { get; set; } = new List<Messaggio>();

        public Chat(string gruppo){
            this.Gruppo = gruppo;
        }

        public void addMessaggio(Messaggio m) { this.Messaggi.Add(m); }

    }
}
