using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZuciQuizLibrary.Models
{
    [Table("Answer")]
    public class Answer:BaseEntity
    {
        public int QuestionID { get; set; }
        [Required(ErrorMessage = "Option Required for mcq")]
        [StringLength(200)]
        public string Option { get; set; } = null!;
        public bool IsCorrect { get; set; }
        public  Question Question { get; set; }
    }
}
