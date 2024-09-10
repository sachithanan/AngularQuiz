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

    public class ScoreRepository : IScoreRepository
    {
        ContextDb DBcontext = new ContextDb();

        public async Task InsertScore(Score score)
        {
            await DBcontext.AddAsync(score);
            await DBcontext.SaveChangesAsync();
        }

        //  public async Task<List<Score>> GetOneUserScore(int userId, DateTime dateCompleted)
        //{
        //  List<Score> scores = await (from score in DBcontext.Scores where score.UserId == userId && score.DateCompleted==dateCompleted select score).ToListAsync();
        // return scores;
        //        }
        public async Task<List<Score>> GetOneUserScore(int userId, DateTime dateCompleted)
        {
            // Ensure you have the using directive for Microsoft.EntityFrameworkCore
            DateTime dateToCompare = dateCompleted.Date;

            List<Score> scores = await DBcontext.Scores
                .Where(score => score.UserId == userId && EF.Functions.DateDiffDay(score.DateCompleted, dateToCompare) ==0)
                .ToListAsync();

            return scores;
        }

    }
}
