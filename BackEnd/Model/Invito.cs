using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventBackend.Model
{
    /// <summary>
    /// Represents an invitation for a group to join a shared event.
    /// </summary>
    [Table("invito")]
    public class Invito
    {
        [Column("dagruppo")]
        public string DaGruppo { get; set; } = string.Empty;

        [Column("pergruppo")]
        public string PerGruppo { get; set; } = string.Empty;

        [Column("eventocondiviso")]
        public string EventoCondivisoNome { get; set; } = string.Empty;

        // null = in attesa, true = accettato, false = rifiutato
        [Column("accettato")]
        public bool? Accettato { get; set; }

        public EventoCondiviso? EventoCondiviso { get; set; }
    }
}
