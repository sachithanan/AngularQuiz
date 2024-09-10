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
    [Table("Topic")]
    public class Topic: BaseEntity
    {
        [Required(ErrorMessage = "Enetr the Topic Name")]
        [StringLength(200)]
        public string TopicName { get; set;} = null!;
    }
}
