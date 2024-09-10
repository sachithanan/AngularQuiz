using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZuciQuizLibrary.Models;

namespace ZuciQuizLibrary.Services.Interfaces
{
    public interface IUserAnswerService
    {
        //validate user answer
        // Task<UserAnswer> GetUserAnswerByUserAnswerId(int userAnswerId);
        // Task<UserAnswer> GetOriginalAnswerByQuestion(int questionId);
        Task<List<Question>> GetAllQuestionByTopicId(int topicId);
        Task<Topic> GetTopicById(int topicId);
        Task<QuestionWithTopic> GetQuestionWithTopic(int topicId);
        Task<UserAnswer> GetCorrectAnswer(int answerId, int questionId);
        Task InsertUserAnswer(UserAnswer userAnswer);
        Task UpdateUserAnswer(int userAnswerId, UserAnswer userAnswer);
        Task DeleteUserAnswer(int userId, int questionId);
    }
}
