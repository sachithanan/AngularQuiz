using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZuciQuizLibrary.Models
{
    [Table("UserAnswer")]
    public class UserAnswer:CommonEntity
    {
        public int UserId { get; set; }
        public int QuestionId { get; set; }
        public int AnswerId { get; set; }
        public  User? User { get; set; } 
        public  Answer? Answer { get; set; }
        
    }
}
