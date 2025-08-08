using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GroupBackend.Model
{
    [Table("gruppo")]
    public class Gruppo
    {
        [Key] [Column("nomeGruppo")] public string Nome { get; set; } = string.Empty;

        [Column("img_url")] public string? ImmagineProfilo { get; set; }

        [Column("descrizione")] public string? Descrizione { get; set; }

        public List<GruppoPartecipante> Partecipanti { get; set; } = new List<GruppoPartecipante>();

        public List<GruppoAmministratore> Amministratori { get; set; } = new List<GruppoAmministratore>();
    }
}