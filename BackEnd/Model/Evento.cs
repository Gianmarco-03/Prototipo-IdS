using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using NpgsqlTypes;

namespace EventBackend.Model
{

    public enum StatoEvento
    {

        [PgName("da valutare")] DaValutare,
        [PgName("approvato")] Approvato,
        [PgName("rifiutato")] Rifiutato
    }

    [Table("evento")]
    public class Evento
    {
        [Key]
        [Column("titolo")]
        public string Nome { get; set; } = string.Empty;

        [Column("descrizione")] public string? Descrizione { get; set; }

        [Column("data_inizio")] public DateTime DataInizio { get; set; }

        [Column("data_fine")] public DateTime? DataFine { get; set; }

        [Column("gruppo_nome")] public string GruppoId { get; set; }
        [Column("img_url")] public string? ImmagineProfilo { get; set; }
        [Column("stato")] public StatoEvento Stato { get; set; } = StatoEvento.DaValutare;

        public List<EventoPartecipante> Partecipanti { get; set; } = new List<EventoPartecipante>();
        public List<EventoOrganizzatore> Organizzatori { get; set; } = new List<EventoOrganizzatore>();    }
}