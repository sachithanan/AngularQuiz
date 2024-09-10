using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZuciQuizLibrary.Models
{
    [Table("User")]
    public class User:CommonEntity
    {
        public int RoleId { get; set; }
        [Required(ErrorMessage = "User Your Name Required")]
        [StringLength(200)]
        public string UserName { get; set; } = null!;
        [Required(ErrorMessage = "Enter Your Password Required")]
        [StringLength(200)]
        public string Password { get; set; }= null!;
        public Role? Role { get; set; } 


    }
}
