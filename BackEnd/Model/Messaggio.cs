// Models/Messaggio.cs
using System;

namespace ChatSpace
{
    public class Messaggio
    {
        public string Mittente { get; set; }
        public string Testo { get; set; }
        public DateTime DataOra { get; set; } = DateTime.Now;
    }
}
