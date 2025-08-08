// Models/Chat.cs
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ChatBackend.Model
{
    [Table("chat")]
    public class Chat
    {


        [Key]
        [Column("id")] public string Gruppo { get; set; }
        public List<Messaggio> Messaggi { get; set; } = new List<Messaggio>();

        public void addMessaggio(Messaggio m) { this.Messaggi.Add(m); }

    }
}
