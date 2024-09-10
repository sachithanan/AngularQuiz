using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ZuciQuizLibrary.DataAccessLayer.Interfaces;
using ZuciQuizLibrary.Models;
using ZuciQuizLibrary.Services.Interfaces;

namespace QuizWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }
        [HttpGet]
        public async Task<ActionResult> GetAllUsers()
        {
            List<User> users = await _userService.GetAllUser();
            return Ok(users);
        }
        [HttpGet("ByUserId/{userId}")]
        public async Task<ActionResult> GetUserByUserId(int userId)
        {
            try
            {
                User user = await _userService.GetUserbyUserId(userId);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
       
        [HttpGet("ByUserName/{userName}")]
        public async Task<ActionResult> GetUserByUserName(string userName)
        {
            try
            {
                User user = await _userService.GetUserbyUserName(userName);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult> InsertUser(User user)
        {
            
            try
            {
                await _userService.InsertUser(user);
                return Created($"api/user/{user.Id}", user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);  
            }

        }
        [HttpPut]

        public async Task<ActionResult> UpdateUser(int userId, User user)
        {
            try
            {
                await _userService.UpdateUser(userId, user);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("{userId}")]
        public async Task<ActionResult> Delete(int userId)
        {
            try
            {
                await _userService.DeleteUser(userId);
                return Ok();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
