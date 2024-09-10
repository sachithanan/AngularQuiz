using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZuciQuizLibrary.Models;

namespace ZuciQuizLibrary.Services.Interfaces
{
    public interface IScoreService
    {
        Task InsertScore(Score score);
        Task<List<Score>> GetOneUserScore(int userId, DateTime dateCompleted);
    }
}
