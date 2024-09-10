using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZuciQuizLibrary.Models;

namespace ZuciQuizLibrary.DataAccessLayer.Interfaces
{
    public interface IAnswerRepository
    {
        Task<List<Answer>> GetAllAnswer();
        Task<List<Answer>> GetAllOptionsByQuestionId(int questionId);
        Task<Answer> GetOneAnswer(int answerId);
        Task<Answer> GetCorrectAnswer(int answerId);
        Task InsertAnswer(Answer answer);
        Task UpdateAnswer(int answerId, Answer answer);
        Task DeleteAnswer(int answerId);

    }
}
