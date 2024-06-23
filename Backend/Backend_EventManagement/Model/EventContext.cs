using Microsoft.EntityFrameworkCore;

namespace Backend_EventManagement.Model
{
    public class EventContext : DbContext
    {
        public EventContext(DbContextOptions<EventContext> options) : base(options)
        {
        }
        public DbSet<TblUser> TblUser { get; set; }
        public DbSet<TblEvent> TblEvent { get; set; }
    }
}
