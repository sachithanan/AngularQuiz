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
    public class LoginPageService : ILoginService
    {
        private readonly IUserService _userService;

        public LoginPageService(IUserService userService)
        {
            _userService = userService;
        }
        public async Task<Login> IsLoggedIn(string userName, string password)
        {
            try
            {

                User login = await _userService.GetUserbyUserName(userName);
                bool passwordhass = BCrypt.Net.BCrypt.Verify(password, login.Password);
                if (login != null && passwordhass)
                {
                    Login loginobj = new Login();
                    loginobj.RoleId = login.RoleId;
                    loginobj.UserId = login.Id;
                    return loginobj;
                }
                else
                {
                    return null;
                }
            }
            catch
            {
                throw new Exception("Login Error");
            }
        }
        public async Task<(bool IsSuccess, string Message)> SignUp(User user)

        {

            try
            {
                User userDetail = await _userService.GetUserbyUserName(user.UserName);
                return (false, "User already exists");
            }

            catch
            {
                await _userService.InsertUser(user);

                return (true, "Account created successfully");

            }
        }
    }
}
