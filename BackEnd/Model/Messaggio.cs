// Models/Messaggio.cs
using System.ComponentModel.DataAnnotations.Schema;

namespace ChatBackend.Model
{
    [Table("messaggio")]
    public class Messaggio
    {
        public int id { get; set; }
        [Column("mittente")]
        public string Mittente { get; set; }
        [Column("testo")] public string Testo { get; set; }
        [Column("invio")] public DateTime DataOra { get; set; } = DateTime.UtcNow;
        [ForeignKey("chat_id")] public string chat_id { get; set; }  // questa è la FK, mappata su "chat_id" nel DB

        public Chat Chat { get; set; }     // proprietà di navigazione
         
    }
}
