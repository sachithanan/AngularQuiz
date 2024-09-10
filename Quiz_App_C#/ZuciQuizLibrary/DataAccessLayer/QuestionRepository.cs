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
    public class QuestionRepository : IQuestionRepository
    {
         ContextDb Dbcontext = new ContextDb();
        public async Task DeleteQuestion(int qustionId)
        {
            Question questionUpdate = await (from question in Dbcontext.Questions where question.Id == qustionId select question).FirstAsync();
            Dbcontext.Questions.Remove(questionUpdate);
            await Dbcontext.SaveChangesAsync();
        }

        public async Task<List<Question>> GetAllQuestion()
        {
            List<Question> questions = await Dbcontext.Questions.ToListAsync();
            return questions;
        }


        public async Task<Question> GetOneQuestion(int questionId)
        {
            Question question = await (from questions in Dbcontext.Questions where questions.Id == questionId select questions).FirstAsync();
            return question;
        }

        public async Task<Question> GetOneQuestionWithTopicId(int questionId, int topicId)
        {
            Question question = await(from questions in Dbcontext.Questions where questions.Id == questionId  && questions.TopicId==topicId select questions).FirstAsync();
            return question;
        }

        public async Task<List<Question>> GetQuestionByTopicId(int topicId)
        {
            List<Question> questions = await (from qust in Dbcontext.Questions where qust.TopicId == topicId select qust).ToListAsync();
            return questions;
        }

        public async Task<Question> GetTopicNameByTopicId(int topicId)
        {
            Question topicname=await(from qust in Dbcontext.Questions where qust.TopicId == topicId select qust).Include(quest=>quest.Topic.TopicName).FirstAsync();
            return topicname;
        }


        public async Task InsertQuestion(Question question)
        {
            await Dbcontext.Questions.AddAsync(question);
            await Dbcontext.SaveChangesAsync();
        }

        public async Task UpdateQuestion(int questionId, Question question)
        {
            Question questionEdite = await GetOneQuestion(questionId);
            questionEdite.QuestionText = question.QuestionText;
            questionEdite.ModifiedOn = question.ModifiedOn;
            questionEdite.ModifiedBy = question.ModifiedBy;
            await Dbcontext.SaveChangesAsync();
        }
    }
}
