using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ZuciQuizLibrary.DataAccessLayer.Interfaces;
using ZuciQuizLibrary.Models;
using ZuciQuizLibrary.Services.Interfaces;

namespace QuizWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TopicController : ControllerBase
    {
        readonly ITopicService _topicService;
        public TopicController(ITopicService topicService)
        {
            _topicService = topicService;
        }
        [HttpGet]
        public async Task<ActionResult> GetAllTopic()
        {
            List<Topic> topics = await _topicService.GetAllTopic();
            return Ok(topics);
        }
        [HttpGet("ByTopicId/{topicId}")]
        public async Task<ActionResult> GetTopicById(int topicId)
        {
            var questions = await _topicService.GetByTopicId(topicId);
            return Ok(questions);
        }
        [HttpGet("ByTopicName/{topicName}")]
        public async Task<ActionResult> GetTopicName(string topicName)
        {
            var topicname = await _topicService.GetTopicName(topicName);
            return Ok(topicname);
        }
        [HttpPost]
        public async Task<ActionResult> InsertTopic(Topic topic)
        {
            try
            {
                await _topicService.InsertTopic(topic);
                return Created($"api/topic/{topic.Id}", topic);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [HttpPut("ByTopicId/{topicId}")]
        public async Task<ActionResult> UpdateTopic(int topicId, Topic topic)
        {
            try
            {
                if (topic == null)
                {
                    return BadRequest("Topic object is null");
                }

                if (_topicService == null)
                {
                    return BadRequest("Topic repository is not initialized");
                }

                await _topicService.UpdateTopic(topicId, topic);
                return Ok(topic);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("{topicId}")]
        public async Task<ActionResult> DeleteTopic(int topicId)
        {
            try
            {
                await _topicService.DeleteTopic(topicId);
                return Ok();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
