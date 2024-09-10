using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZuciQuizLibrary.Models;

namespace ZuciQuizLibrary.DataAccessLayer.Interfaces
{
    public interface IScoreRepository
    {
        Task InsertScore(Score score);
        Task<List<Score>> GetOneUserScore(int userId, DateTime dateCompleted);
    }
}
