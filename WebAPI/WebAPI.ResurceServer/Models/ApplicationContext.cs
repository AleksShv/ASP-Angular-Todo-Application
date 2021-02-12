using Microsoft.EntityFrameworkCore;

namespace WebAPI.ResurceServer.Models
{
    public class ApplicationContext: DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> context): base(context)
        {
            Database.EnsureCreated();
        }

        public DbSet<Note> Notes { get; set; } 
    }
}
