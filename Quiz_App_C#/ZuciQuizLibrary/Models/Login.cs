using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZuciQuizLibrary.Models
{
    public class Login
    {
        public int RoleId { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; } = null!;
    }
}
