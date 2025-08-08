using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using NpgsqlTypes;

namespace EventBackend.Model
{


    [Table("evento")]
    public abstract class Evento
    {
        [Key]
        [Column("nomeEvento")]
        public string Nome { get; set; } = string.Empty;

        [Column("descrizione")] public string? Descrizione { get; set; }

        [Column("inizio")] public DateTime DataInizio { get; set; }

        [Column("fine")] public DateTime? DataFine { get; set; }

        [Column("nomeGruppo")] public string GruppoId { get; set; }
        [Column("img_url")] public string? ImmagineProfilo { get; set; }
        [Column("approvato")] public bool Approvato { get; set; } = false;


    }
}