using System.ComponentModel.DataAnnotations.Schema;

namespace EventBackend.Model
{
    /// <summary>
        /// Rappresenta una decorazione applicata ad un evento approvato.
        /// Ogni decoratore identifica l'evento tramite nome e gruppo
        /// e ne specifica il tipo (es. "condiviso").
    /// </summary>
   [Table("evento_decorator")]
    public class EventoDecorator : Evento
    {
        [Column("nomeGruppo")]
        public string nomeGruppo { get; set; } = string.Empty;

        [Column("nomeEvento")]
        public string nomeEvento { get; set; } = string.Empty;

        [Column("tipo")]
        public string Tipo { get; set; } = string.Empty;

        private Evento e { get; set; } 

    }
}
