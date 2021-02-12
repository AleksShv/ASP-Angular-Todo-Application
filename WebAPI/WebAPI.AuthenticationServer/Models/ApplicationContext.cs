using Microsoft.EntityFrameworkCore;

namespace WebAPI.AuthenticationServer.Models
{
    public class ApplicationContext: DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> context) : base(context)
        {
            Database.EnsureCreated();
        }

        public DbSet<Account> Accounts { get; set; }
    }
}
