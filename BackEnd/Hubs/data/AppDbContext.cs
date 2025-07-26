using Microsoft.EntityFrameworkCore;
using ChatBackend.Model;
using AuthBackend.Model;

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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
                modelBuilder.Entity<Utente>()
                .HasIndex(u => u.Username)
                .IsUnique();        }
    }
}
