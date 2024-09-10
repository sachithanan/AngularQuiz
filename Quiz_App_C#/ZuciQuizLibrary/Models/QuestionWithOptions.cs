using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZuciQuizLibrary.Models
{
    public class QuestionWithOptions
    {
        public Question questionText { get; set; }
        public UserAnswer userAnswer { get; set; }
        public List<Answer> Options { get; set; }
        public Topic Topic { get; set; }
    }
}
