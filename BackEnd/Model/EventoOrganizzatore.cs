using System.ComponentModel.DataAnnotations.Schema;

namespace EventBackend.Model
{
    [Table("evento_organizzatori")]
    public class EventoOrganizzatore
    {
        [Column("evento_id")]
        public string EventoNome { get; set; } = null!;
        public Evento Evento { get; set; } = null!;

        [Column("username")]
        public string Username { get; set; } = null!;
    }
}