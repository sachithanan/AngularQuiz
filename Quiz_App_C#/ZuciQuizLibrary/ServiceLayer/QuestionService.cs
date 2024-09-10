using Microsoft.EntityFrameworkCore.Storage.Json;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZuciQuizLibrary.DataAccessLayer.Interfaces;
using ZuciQuizLibrary.Models;
using ZuciQuizLibrary.Services.Interfaces;

namespace ZuciQuizLibrary.Services
{
    public class QuestionService : IQuestionService
    {
        private readonly IQuestionRepository _questionRepository;
        public QuestionService(IQuestionRepository questionRepository)
        {
            _questionRepository = questionRepository;
        }

        public async Task DeleteQuestion(int questionId)
        {
            await _questionRepository.DeleteQuestion(questionId); ;
        }

        public async Task<List<Question>> GetAllQuestion()
        {
            var questions = await _questionRepository.GetAllQuestion();
            return questions;
        }

        public async Task<Question> GetOneQuestion(int questionId)
        {

            try
            {
                var question = await _questionRepository.GetOneQuestion(questionId);
                return question;
            }
            catch (Exception)
            {
                throw new Exception("Question Not Found");
            }
        }

        public async Task<Question> GetOneQuestionWithTopicId(int questionId, int topicId)
        {
            try
            {
                var question = await _questionRepository.GetOneQuestionWithTopicId(questionId, topicId);
                return question;
            }
            catch (Exception)
            {
                throw new Exception("Question Not Found");
            }
        }

        public async Task<List<Question>> GetQuestionByTopicId(int topicId)
        {
            var questions = await _questionRepository.GetQuestionByTopicId(topicId);
            if (questions.Count > 0)
            {
                return questions;
            }
            else
            {
                throw new Exception("Topic Not Found");
            }

        }

        public async Task<Question> GetTopicNameByTopicId(int topicId)
        {
            var topicname = await _questionRepository.GetTopicNameByTopicId(topicId);
            if (topicname != null)
            {
                return topicname;
            }
            else
            {
                throw new Exception("Topic Name Not Found");
            }
        }

        public async Task InsertQuestion(Question question)
        {
            await _questionRepository.InsertQuestion(question);
        }

        public async Task UpdateQuestion(int questionId, Question question)
        {
            await _questionRepository.UpdateQuestion(questionId, question);
        }
    }
}
