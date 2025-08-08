using System.ComponentModel.DataAnnotations.Schema;

namespace EventBackend.Model
{
    [Table("evento_organizzatori")]
    public class EventoOrganizzatore
    {
        [Column("nomeEvento")]
        public string EventoNome { get; set; } = null!;
        [Column("nomeGruppo")] public string nomeGruppo { get; set; } = null!;
        public EventoApprovato Evento { get; set; } = null!;

        [Column("username")]
        public string Username { get; set; } = null!;
    }
}