using System.ComponentModel.DataAnnotations.Schema;

namespace EventBackend.Model
{
    [Table("Proposta_Evento")]
    public class PropostaEvento : Evento
    {
        [Column("promotore")] public string usernamePromotore { get; set; }
        public PropostaEvento(string usernamePromotore)
        {
            Approvato = false;
            usernamePromotore = usernamePromotore;
        }
    }
}