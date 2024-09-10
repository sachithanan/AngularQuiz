using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZuciQuizLibrary.Models;

namespace ZuciQuizLibrary.Services.Interfaces
{
    public interface ILoginService
    {
        Task<Login> IsLoggedIn(string userName, string password);
        Task<(bool IsSuccess, string Message)> SignUp(User user);
    }
}
