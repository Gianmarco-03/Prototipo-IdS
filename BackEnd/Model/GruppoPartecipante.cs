using System.ComponentModel.DataAnnotations.Schema;

namespace GroupBackend.Model
{
    [Table("gruppo_partecipanti")]
    public class GruppoPartecipante
    {
        [Column("gruppo_nome")]
        public string GruppoNome { get; set; } = null!;
        public Gruppo Gruppo { get; set; } = null!;

        [Column("username")]
        public string Username { get; set; } = null!;
    }
}
