using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Formats.Asn1;
using ZuciQuizLibrary.Models;
using ZuciQuizLibrary.Services;
using ZuciQuizLibrary.Services.Interfaces;

namespace QuizWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserAnswerController : ControllerBase
    {
        readonly IUserAnswerService _userAnswerService;
        readonly IQuestionService _questionService;
        public UserAnswerController(IUserAnswerService userAnswerService,IQuestionService questionService)
        {
            _userAnswerService = userAnswerService;
            _questionService = questionService;
        }

        [HttpGet("BytopicId/{topicId}")]
        public async Task<ActionResult> GetAllQuestionByTopicId(int topicId)
        {
            try
            {
                QuestionWithTopic questions = await _userAnswerService.GetQuestionWithTopic(topicId);
                return Ok(questions);
            }
            catch (Exception)
            {
                throw new Exception("Qustion Fetching Error");
            }
           
        }
        [HttpGet("ByAnswerId/{answerId}/{questionId}")]
        public async Task<ActionResult> GetCorrectAnswer(int answerId, int questionId)
        {
            try
            {
                UserAnswer questions = await _userAnswerService.GetCorrectAnswer(answerId, questionId);
                return Ok(questions);
            }
            catch (Exception)
            {
                throw new Exception("Qustion Fetching Error");
            }

        }


        [HttpGet("Topic/{topcId}")]
        public async Task<ActionResult> GetTopicById(int topicId)
        {
            Topic topic = await _userAnswerService.GetTopicById(topicId);
            return Ok(topic);
        }
        [HttpPost]
        public async Task<ActionResult> InsertUserAnswer(UserAnswer userAnswer)
        {
            try
            {
                await _userAnswerService.InsertUserAnswer(userAnswer);
                return Created($"api/userAnswer/{userAnswer.Id}", userAnswer);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{userId}")]
        public async Task<ActionResult>UpdateUserAnswer(int userAnswerId, UserAnswer userAnswer)
        {
            try
            {
                await _userAnswerService.UpdateUserAnswer(userAnswerId, userAnswer);
                return Ok(userAnswer);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{questionId}")]
        public async Task<ActionResult>DeleteUserAnswerId(int userAnswerId,int questionId)
        {
            try
            {
                await _userAnswerService.DeleteUserAnswer(userAnswerId, questionId);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
