using Microsoft.EntityFrameworkCore;
using ChatBackend.Model;
using AuthBackend.Model;
using GroupBackend.Model;
using EventBackend.Model;

namespace Base.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Chat> Chats { get; set; }
        public DbSet<Messaggio> Messaggi { get; set; }
        public DbSet<Utente> Utenti { get; set; }
        public DbSet<Gruppo> Gruppi { get; set; }
        public DbSet<GruppoAmministratore> GruppoAmministratori { get; set; }
         public DbSet<GruppoPartecipante> GruppoPartecipanti { get; set; }
        public DbSet<Evento> Eventi { get; set; }
         public DbSet<EventoPartecipante> EventoPartecipanti { get; set; }
        public DbSet<EventoOrganizzatore> EventoOrganizzatori { get; set; }





        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Utente>()
                .HasIndex(u => u.Username)
                .IsUnique();

            // Gruppo
            modelBuilder.Entity<GruppoPartecipante>()
                .HasKey(gp => new { gp.GruppoNome, gp.Username });

            modelBuilder.Entity<GruppoPartecipante>()
                .HasOne(gp => gp.Gruppo)
                .WithMany(g => g.Partecipanti)
                .HasForeignKey(gp => gp.GruppoNome);

            // Relazione: Gruppo → Amministratori
            modelBuilder.Entity<GruppoAmministratore>()
                .HasKey(ga => new { ga.GruppoNome, ga.Username });

            modelBuilder.Entity<GruppoAmministratore>()
                .HasOne(ga => ga.Gruppo)
                .WithMany(g => g.Amministratori)
                .HasForeignKey(ga => ga.GruppoNome);

                // Evento
            modelBuilder.Entity<EventoPartecipante>()
                .HasKey(ep => new { ep.EventoNome, ep.Username });

            modelBuilder.Entity<EventoPartecipante>()
                .HasOne(ep => ep.Evento)
                .WithMany(e => e.Partecipanti)
                .HasForeignKey(ep => ep.EventoNome);

            modelBuilder.Entity<EventoOrganizzatore>()
                .HasKey(eo => new { eo.EventoNome, eo.Username });

            modelBuilder.Entity<EventoOrganizzatore>()
                .HasOne(eo => eo.Evento)
                .WithMany(e => e.Organizzatori)
                .HasForeignKey(eo => eo.EventoNome);
                
        }

    }
}
