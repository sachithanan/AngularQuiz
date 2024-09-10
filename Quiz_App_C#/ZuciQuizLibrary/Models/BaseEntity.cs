using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZuciQuizLibrary.Models
{
    public class BaseEntity 
    { 
        [Key]
        public int Id { get; set; }
        public int CreatedBy { get; set; } 
        public DateTime CreatedOn { get; set; }= DateTime.Now;
        public int ModifiedBy { get; set; }
        public DateTime ModifiedOn { get; set; }=DateTime.Now;
    }
}
