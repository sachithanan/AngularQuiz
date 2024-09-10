using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZuciQuizLibrary.Models;

namespace ZuciQuizLibrary.Services.Interfaces
{
    public interface IUserService
    {
        Task<List<User>> GetAllUser();
        Task<User> GetUserbyUserId(int userId);
        Task<User> GetUserbyUserName(string userName);
        Task InsertUser(User User);
        Task UpdateUser(int userId, User User);
        Task DeleteUser(int userId);
    }
}
