using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ZuciQuizLibrary.Models
{
    [Table("Question")]
    public class Question:BaseEntity
    {
        public int TopicId { get; set; }
        [Required(ErrorMessage = "Enter the Question")]
        [StringLength(200)]
        public string QuestionText { get; set; } = null!;
        public Topic Topic { get; set; } 
       // public IEnumerable<Answer> Answers { get; set; }
    }
}
