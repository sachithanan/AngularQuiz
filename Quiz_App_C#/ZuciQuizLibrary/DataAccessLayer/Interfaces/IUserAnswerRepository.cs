using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZuciQuizLibrary.Models;

namespace ZuciQuizLibrary.DataAccessLayer.Interfaces
{
    public interface IUserAnswerRepository
    {
        Task<Topic> GetTopicById(int topicId);
        Task<List<Question>> GetAllQuestionByTopicId(int topicId);
        Task<UserAnswer> GetCorrectAnswer(int answerId, int questionId);
        Task InsertUserAnswer(UserAnswer userAnswer);
        Task UpdateUserAnswer(int userAnswerId, UserAnswer userAnswer);
        Task DeleteUserAnswer(int userId, int questionId);
    }
}
