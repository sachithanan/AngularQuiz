using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZuciQuizLibrary.Models
{
    [Table("Score")]
    public class Score : CommonEntity  
    {
        public int UserId { get; set; } 
        public int TopicId { get; set; } 
        public int Mark { get; set; }
        public DateTime DateCompleted { get; set; }
        public User? User { get; set; }
        public Topic? Topic { get; set; }
    }
}
