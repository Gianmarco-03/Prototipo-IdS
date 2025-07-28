using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventBackend.Model
{
    [Table("evento")]
    public class Evento
    {
        [Key]
        [Column("titolo")]
        public string Nome { get; set; } = string.Empty;

        [Column("descrizione")] public string? Descrizione { get; set; }

        [Column("data_inizio")] public DateTime DataInizio { get; set; }

        [Column("data_fine")] public DateTime? DataFine { get; set; }

        [Column("creatore_id")] public int? CreatoreId { get; set; }

        [Column("gruppo_username")] public int? GruppoId { get; set; }
        [Column("img_url")] public string? ImmagineProfilo { get; set; }


        public List<string> Partecipanti { get; set; } = new List<string>();

        public List<string> Organizzatori { get; set; } = new List<string>();
    }
}