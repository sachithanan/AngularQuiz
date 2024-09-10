using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using ZuciQuizLibrary.DataAccessLayer.Interfaces;
using ZuciQuizLibrary.Models;
using ZuciQuizLibrary.Services.Interfaces;

namespace QuizWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScoreController : ControllerBase
    { 
        private readonly IScoreService _scoreService;
        
        public ScoreController( IScoreService scoreRepository)
        {
           
            _scoreService =scoreRepository;
        }
        [HttpPost]
        public async Task<ActionResult> InsertScore(Score score)
        {
            try
            {
                //score.DateCompleted = DateTime.UtcNow;
                await _scoreService.InsertScore(score);
                return Created($"api/score/{score.Id}", score);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [HttpGet("ByUserId/{userId}/{dateCompleted}")]
        public async Task<ActionResult> GetOneUserScore(int userId, DateTime dateCompleted)
        {
            List<Score> scores = await _scoreService.GetOneUserScore(userId,dateCompleted);
            return Ok(scores);
        }
    }
}
