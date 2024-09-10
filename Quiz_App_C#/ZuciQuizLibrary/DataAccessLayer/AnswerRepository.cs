using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZuciQuizLibrary.DataAccessLayer.Interfaces;
using ZuciQuizLibrary.Models;

namespace ZuciQuizLibrary.DataAccessLayer
{
    public class AnswerRepository : IAnswerRepository
    {
        ContextDb context = new ContextDb();

        public async Task DeleteAnswer(int answerId)
        {
            Answer answer = await GetOneAnswer(answerId);
            context.Remove(answer);
            await context.SaveChangesAsync();
        }
        public async Task<List<Answer>> GetAllAnswer()
        {
            List<Answer> answers = await context.Answers.ToListAsync();
            return answers;
        }

        public async Task<List<Answer>> GetAllOptionsByQuestionId(int questionId)
        {
            List<Answer> options = await (from ans in context.Answers where ans.QuestionID == questionId select ans).ToListAsync();
            return options;
        }

        public async Task<Answer> GetCorrectAnswer(int answerId)
        {

            Answer answer = await (from ans in context.Answers where ans.Id == answerId && ans.IsCorrect select ans).FirstAsync();
            if(answer == null)
            {
                return answer = null;
            }
            else
            {
                return answer;
            }
            
        }

        public async Task<Answer> GetOneAnswer(int answerId)
        {
            Answer answer = await (from ans in context.Answers where ans.Id == answerId select ans).FirstAsync();
            return answer;
        }

        public async Task InsertAnswer(Answer answer)
        {
            await context.Answers.AddAsync(answer);
            await context.SaveChangesAsync();
        }

        public async Task UpdateAnswer(int answerId, Answer answer)
        {
            Answer answerUpdate = await GetOneAnswer(answerId);
            answerUpdate.QuestionID = answer.QuestionID;
            answerUpdate.Option = answer.Option;
            answerUpdate.IsCorrect = answer.IsCorrect;
            answerUpdate.ModifiedBy = answer.ModifiedBy;
            answerUpdate.ModifiedOn = answer.ModifiedOn;
            await context.SaveChangesAsync();
        }
    }
}
