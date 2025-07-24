// Models/Messaggio.cs
using System.ComponentModel.DataAnnotations.Schema;

namespace ChatBackend.Model
{
    [Table("messaggi")]
    public class Messaggio
    {
        public int id { get; set; }
        [Column("mittente")]
        public string Mittente { get; set; }
        [Column("testo")] public string Testo { get; set; }
        public DateTime DataOra { get; set; } = DateTime.UtcNow;
        public string chat_id { get; set; }  // questa è la FK, mappata su "chat_id" nel DB

        [ForeignKey("chat_id")]
        public Chat Chat { get; set; }     // proprietà di navigazione
         
    }
}
