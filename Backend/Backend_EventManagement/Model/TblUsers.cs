using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Backend_EventManagement.Model
{
    public class TblUsers
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Username { get; set; }
        [StringLength(150)]
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
