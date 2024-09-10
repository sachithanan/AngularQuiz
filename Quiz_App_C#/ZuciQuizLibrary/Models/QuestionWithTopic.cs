using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ZuciQuizLibrary.Models
{
    public class QuestionWithTopic
    {
        
        public Question? questionText { get; set; }
        public UserAnswer? userAnswer { get; set; }
        public Answer? answer { get; set; }
        public List<Answer> Options { get; set; }
        public List<QuestionWithOptions> AllQuestionWithTopic { get; set; }
        public int topicId { get; set; }
    }
}
