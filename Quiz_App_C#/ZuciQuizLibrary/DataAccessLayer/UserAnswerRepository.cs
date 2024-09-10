using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using ZuciQuizLibrary.DataAccessLayer.Interfaces;
using ZuciQuizLibrary.Models;

namespace ZuciQuizLibrary.DataAccessLayer
{
    public class UserAnswerRepository : IUserAnswerRepository
    {
        readonly ContextDb context = new ContextDb();
        public async Task DeleteUserAnswer(int userId, int questionId)
        {
            UserAnswer userAnswer = await (from user in context.UserAnswers where user.UserId == userId && user.QuestionId == questionId select user).FirstAsync();
            context.Remove(userAnswer);
            await context.SaveChangesAsync();
        }
        public async Task<List<Question>> GetAllQuestionByTopicId(int topicId)
        {
            List<Question> questions = await (from qust in context.Questions where qust.TopicId==topicId select qust).ToListAsync();
            return questions;
        }

        public async Task<UserAnswer>GetCorrectAnswer(int answerId, int questionId)
        {
            UserAnswer userAnswer=await(from quest in context.UserAnswers where quest.Answer.Id==answerId && quest.Answer.QuestionID==questionId && quest.Answer.IsCorrect select quest).FirstAsync();
            return userAnswer;
        }


        public async Task<Topic> GetTopicById(int topicId)
        {
            Topic topic=await(from topics in context.Topics where topics.Id == topicId select topics).FirstOrDefaultAsync();
            return topic;
        }

        public async Task<UserAnswer> GetUserAnswerByUserAnswerId(int userAnswerId)
        {
            UserAnswer userOneAnswer = await (from userAnswer in context.UserAnswers where userAnswer.Id == userAnswerId select userAnswer).FirstAsync();
            return userOneAnswer;
        }

        public async Task InsertUserAnswer(UserAnswer userAnswer)
        {
            await context.AddAsync(userAnswer);
            await context.SaveChangesAsync();
        }

        public async Task UpdateUserAnswer(int userAnswerId, UserAnswer userAnswer)
        {
            UserAnswer userAnswerEdit = await GetUserAnswerByUserAnswerId(userAnswerId);
            if (userAnswerEdit != null)
            {
                await context.SaveChangesAsync();
            }

        }
    }
}
