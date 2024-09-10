using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZuciQuizLibrary.Models
{
    [Table("Role")]
    public class Role
    {
        [Key]
        public int Id { get; set; }
        [StringLength(200)]
        public string RoleName { get; set; } = null!;

    }
}
