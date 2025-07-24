using Microsoft.EntityFrameworkCore;
using ChatBackend.Model;

namespace ChatBackend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Chat> Chats { get; set; }
        public DbSet<Messaggio> Messaggi { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Configurazioni extra (ad esempio chiavi, relazioni) qui
        }
    }
}
