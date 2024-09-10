using ZuciQuizLibrary.DataAccessLayer.Interfaces;
using ZuciQuizLibrary.Models;
using ZuciQuizLibrary.Services.Interfaces;
using ZuciQuizLibrary.Services;
using System.Runtime.InteropServices;

namespace ZuciQuizLibrary.Services
{
    public class UserAnswerService : IUserAnswerService
    {
        private readonly IUserAnswerRepository _userAnswerRepository;
        private readonly IQuestionRepository _questionRepository;
        private readonly IAnswerRepository _answerRepository;
        private readonly ITopicRepository _topicRepository;

        public UserAnswerService(IUserAnswerRepository userAnswerRepository, IQuestionRepository questionRepository, IAnswerRepository answerRepository)
        {
            _userAnswerRepository = userAnswerRepository;
            _questionRepository = questionRepository;
            _answerRepository = answerRepository;
        }

        public async Task DeleteUserAnswer(int userId, int questionId)
        {
            await _userAnswerRepository.DeleteUserAnswer(userId, questionId);
        }

        public async Task<List<Question>> GetAllQuestionByTopicId(int topicId)
        {
            var userAnswers = await _userAnswerRepository.GetAllQuestionByTopicId(topicId);
            return userAnswers;

        }

        public async Task<Topic> GetTopicById(int topicId)
        {
            var topic = await _topicRepository.GetByTopicId(topicId);
            return topic;
        }

        public async Task InsertUserAnswer(UserAnswer userAnswer)
        {

            await _userAnswerRepository.InsertUserAnswer(userAnswer);
        }

        public async Task<QuestionWithTopic> GetQuestionWithTopic(int topicId)
        {
            try
            {
                var questions = await _userAnswerRepository.GetAllQuestionByTopicId(topicId);
                var questionsWithOptions = new List<QuestionWithOptions>();

                foreach (var question in questions)
                {
                    var questionWithOptions = await GetQuestionWithOptions(question.Id);
                    questionsWithOptions.Add(questionWithOptions);
                }

                return new QuestionWithTopic
                {
                    topicId = topicId,
                    AllQuestionWithTopic = questionsWithOptions
                };
            }
            catch (Exception ex)
            {
                throw new Exception("Error occurred while retrieving questions with options", ex);
            }
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
        public async Task UpdateUserAnswer(int userAnswerId, UserAnswer userAnswer)
        {
            await _userAnswerRepository.UpdateUserAnswer(userAnswerId, userAnswer);
        }

        public async Task<UserAnswer> GetCorrectAnswer(int answerId, int questionId)
        {
            var qust = await _userAnswerRepository.GetCorrectAnswer(answerId, questionId);
            return qust;
        }
    }
}