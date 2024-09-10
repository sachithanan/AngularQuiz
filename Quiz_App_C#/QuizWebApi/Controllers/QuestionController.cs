using Microsoft.AspNetCore.Mvc;
using ZuciQuizLibrary.Models;
using ZuciQuizLibrary.Services.Interfaces;

namespace QuizWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        readonly IQuestionService _questionService;
        public QuestionController(IQuestionService questionRepository)
        {
            _questionService = questionRepository;
        }
        [HttpGet]
        public async Task<ActionResult> GetAllQuestion()
        {
            try
            {
                List<Question> questions = await _questionService.GetAllQuestion();
                return Ok(questions);
            }
           catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [HttpGet("ByQuestionId/{questionId}")]
        public async Task<ActionResult> GetOneQuestion(int questionId)
        {
            Question question=await _questionService.GetOneQuestion(questionId);
            return Ok(question);
        }
        [HttpGet("BytopicId/{topicId}")]
        public async Task<ActionResult> GetQuestionByTopicId(int topicId)
        {
            List<Question> questions = await _questionService.GetQuestionByTopicId(topicId);
            return Ok(questions);
        }
        
        [HttpGet("ByTopicIdName/{topicId}")]
        public async Task<ActionResult> GetTopicNameByTopicId(int topicId)
        {
            Question topicName = await _questionService.GetTopicNameByTopicId(topicId);
            return Ok(topicName);
        }
        [HttpPost]
        public async Task<ActionResult> InsertQuestion(Question question)
        {
            try
            {
                await _questionService.InsertQuestion(question);
                return Created($"api/question/{question.Id}", question);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [HttpPut("{questionId}")]
        public async Task<ActionResult> UpdateQuestion(int questionId, Question question)
        {
            try
            {
                await _questionService.UpdateQuestion(questionId, question);
                return Ok(question);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("{questionId}")]
        public async Task<ActionResult> DeleteQuestion(int questionId)
        {
            try
            {
                await _questionService.DeleteQuestion(questionId);
                return Ok();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
