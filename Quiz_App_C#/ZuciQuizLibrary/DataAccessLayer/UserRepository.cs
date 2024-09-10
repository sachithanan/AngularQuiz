using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZuciQuizLibrary.DataAccessLayer.Interfaces;
using ZuciQuizLibrary.Models;

namespace ZuciQuizLibrary.DataAccessLayer
{
    public class UserRepository : IUserRepository
    {
         readonly ContextDb contextDb = new ContextDb();

        public async Task DeleteUser(int userId)
        {
            User quizUser = await GetUserbyUserId(userId);
            contextDb.Remove(quizUser);
            await contextDb.SaveChangesAsync();
        }

        public async Task<List<User>> GetAllUser()
        {
            List<User> users = await contextDb.Users.Include(x => x.Role).ToListAsync();
            return users;
        }

        public async Task<User> GetUserbyUserId(int userId)
        {

            User quizUser = await (from user in contextDb.Users where user.Id == userId select user).Include(x=>x.Role).FirstAsync();
            return quizUser;
        }

        public async Task<User> GetUserbyUserName(string userName)
        {
            User user = await (from username in contextDb.Users where username.UserName == userName select username).FirstOrDefaultAsync();
            return user;
        }

        public async Task InsertUser(User User)
        {
            await contextDb.Users.AddAsync(User);
           await contextDb.SaveChangesAsync();
        }


        public async Task UpdateUser(int userId, User user)
        {
            try
            {
                User userEdit = await GetUserbyUserId(userId);
                userEdit.Password = user.Password;
                userEdit.UserName = user.UserName;
                userEdit.RoleId = user.RoleId;
                await contextDb.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }


        }

    }
}
