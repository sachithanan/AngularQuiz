using Microsoft.AspNetCore.Mvc;
using ZuciQuizLibrary.Models;
using ZuciQuizLibrary.Services.Interfaces;

namespace QuizWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnswerController : ControllerBase
    {
        readonly IAnswerService _answerService;
        public AnswerController(IAnswerService answerService)
        {
            _answerService = answerService;
        }
        [HttpGet]
        public async Task<ActionResult> GetAllAnswer()
        {
            List<Answer>answers=await _answerService.GetAllAnswer();
            return Ok(answers);
        }
        [HttpGet("ByAnswerId/{answerId}")]
        public async Task<ActionResult> GetOneAnswer(int answerId)
        {
            Answer answer=await _answerService.GetOneAnswer(answerId);
            return Ok(answer);
        }
        [HttpGet("ByAnswer/{answerId}")]
        public async Task<ActionResult> GetCorrectAnswer(int answerId)
        {
            Answer answer = await _answerService.GetCorrectAnswer(answerId);
            return Ok(answer);
        }
       
        [HttpGet("ByQuestionId/{questionId}")]
        public async Task<ActionResult> GetAllOptionsByQuestionId(int questionId)
        {
            List<Answer> answers = await _answerService.GetAllOptionsByQuestionId(questionId);
            return Ok(answers);
        }
        [HttpGet("QuestionWithOptions/{questionId}")]
        public async Task<ActionResult> GetQuestionWithOptions(int questionId)
        {
            try
            {
                QuestionWithOptions list = await _answerService.GetQuestionWithOptions(questionId);
                return Ok(list);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public async Task<ActionResult> InsertAnswer(Answer answer)
        {
            try
            {
                await _answerService.InsertAnswer(answer);
                return Created($"api/answer/{answer.Id}", answer);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [HttpPut("{answerId}")]
        public async Task<ActionResult> UpdateAnswer(int answerId, Answer answer)
        {
            try
            {
                await _answerService.UpdateAnswer(answerId, answer);
                return Ok(answer);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("{answerId}")]
        public async Task<ActionResult> DeleteAnswer(int answerId)
        {
            try
            {
                await _answerService.DeleteAnswer(answerId);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
