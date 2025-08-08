using System.ComponentModel.DataAnnotations.Schema;

namespace GroupBackend.Model
{
    [Table("partecipante_gruppo")]
    public class GruppoPartecipante
    {
        [Column("nomeGruppo")]
        public string GruppoNome { get; set; } = null!;
        public Gruppo Gruppo { get; set; } = null!;

        [Column("username")]
        public string Username { get; set; } = null!;
    }
}
