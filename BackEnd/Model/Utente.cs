using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace AuthBackend.Model
{
    [Table("utente")]
    public class Utente
    {
        [Key]
        [Column("username")] public string Username { get; set; }
        [Column("nome")] public string Nome { get; set; }
        [Column("password")] public string Password { get; set; }
        [Column("email")] public string Email { get; set; }
        [Column("data_di_nascita")] public DateTime DataDiNascita { get; set; } = DateTime.UtcNow;
        [Column("fotoprofilo")] public string? ImmagineProfilo { get; set; }   
        [Column("bio")] public string? Biografia { get; set; }
        [Column("hashtag")] public List<string> Hashtag { get; set; } = new List<string>();
    }
}