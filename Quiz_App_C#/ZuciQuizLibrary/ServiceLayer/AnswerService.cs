using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZuciQuizLibrary.DataAccessLayer;
using ZuciQuizLibrary.DataAccessLayer.Interfaces;
using ZuciQuizLibrary.Models;
using ZuciQuizLibrary.Services.Interfaces;

namespace ZuciQuizLibrary.Services
{
    public class AnswerService : IAnswerService
    {
        private readonly IAnswerRepository _answerRepository;
        private readonly IQuestionRepository _questionRepository;
        public AnswerService(IAnswerRepository answerRepository, IQuestionRepository questionRepository)
        {
            _answerRepository = answerRepository;
            _questionRepository = questionRepository;
        }

        public async Task DeleteAnswer(int answerId)
        {
            await _answerRepository.DeleteAnswer(answerId);
        }
        public async Task<List<Answer>> GetAllAnswer()
        {
            var answer = await _answerRepository.GetAllAnswer();
            return answer;
        }
        public async Task<List<Answer>> GetAllOptionsByQuestionId(int questionId)
        {
            try
            {
                var answers = await _answerRepository.GetAllOptionsByQuestionId(questionId);
                return answers;
            }
            catch (Exception)
            {
                throw new Exception("Question Id is Not Valid");
            }

        }

        public async Task<Answer> GetCorrectAnswer(int answerId)
        {
            var answer = await _answerRepository.GetCorrectAnswer(answerId);
            return answer;
        }

        public async Task<Answer> GetOneAnswer(int answerId)
        {
            var answer = await _answerRepository.GetOneAnswer(answerId);
            return answer;
        }

        public async Task<QuestionWithOptions> GetQuestionWithOptions(int questionId)
        {
            try
            {
                var question = await _questionRepository.GetOneQuestion(questionId);
                if (question == null)
                {
                    throw new ArgumentException("Question not found");
                }

                var options = await _answerRepository.GetAllOptionsByQuestionId(questionId);


                return new QuestionWithOptions
                {
                    questionText = question,
                    Options = options
                };
            }
            catch (Exception ex)
            {
                throw new Exception("Error occurred while retrieving question with options", ex);
            }
        }


        public async Task InsertAnswer(Answer answer)
        {
            await _answerRepository.InsertAnswer(answer);
        }

        public async Task UpdateAnswer(int answerId, Answer answer)
        {
            await _answerRepository.UpdateAnswer(answerId, answer);
        }
    }
}
