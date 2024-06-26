using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Backend_EventManagement.Model
{
    public class TblEvents
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }
        public int Attendees { get; set; }
        public int UserId { get; set; }
        public int CategoryId { get; set; }
    }
}
