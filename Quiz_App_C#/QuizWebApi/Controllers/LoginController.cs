using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ZuciQuizLibrary.Models;
using ZuciQuizLibrary.Services;
using ZuciQuizLibrary.Services.Interfaces;

namespace QuizWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        ILoginService _loginService;
        IUserService _userService;
        public LoginController(ILoginService loginService,IUserService userService)
        {
            _loginService = loginService;
            _userService= userService;
        }
        [HttpGet("ByUserName/{userName}/{password}")]
        public async Task<ActionResult> CheckLogin(string userName,string password)
            {
            Login user=await _loginService.IsLoggedIn(userName, password);
            return Ok(user);

        }
        [HttpPost]

        public async Task<ActionResult> SignUp(User user)
        {
            try
            {
                var response = await _loginService.SignUp(user);

                return Ok(new { isSuccess = response.IsSuccess, message = response.Message, });
            }
            catch (Exception ex)
            {
                return Ok(new { isSuccess = false, message = ex.Message });
            }

        }
    }
}
