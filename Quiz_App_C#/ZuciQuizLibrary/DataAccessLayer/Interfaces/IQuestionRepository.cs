using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZuciQuizLibrary.Models;

namespace ZuciQuizLibrary.DataAccessLayer.Interfaces
{
    public interface IQuestionRepository
    {
        Task<List<Question>> GetAllQuestion();
        Task<List<Question>> GetQuestionByTopicId(int topicId);
        Task<Question> GetTopicNameByTopicId(int topicId);
        Task<Question> GetOneQuestion(int questionId);
        Task<Question> GetOneQuestionWithTopicId(int questionId, int topicId);
        Task InsertQuestion(Question question);
        Task UpdateQuestion(int questionId, Question question);
        Task DeleteQuestion(int questionId);
    }
}
