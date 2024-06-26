using Microsoft.EntityFrameworkCore;

namespace Backend_EventManagement.Model
{
    public class EventContext : DbContext
    {
        public EventContext(DbContextOptions<EventContext> options) : base(options)
        {
        }
        public DbSet<TblUsers> TblUsers { get; set; }
        public DbSet<TblEvents> TblEvents { get; set; }
        public DbSet<TblCategories> TblCategories { get; set; }
    }
}
