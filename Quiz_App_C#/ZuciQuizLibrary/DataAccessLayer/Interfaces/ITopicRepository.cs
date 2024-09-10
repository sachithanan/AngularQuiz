using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZuciQuizLibrary.Models;

namespace ZuciQuizLibrary.DataAccessLayer.Interfaces
{
    public interface ITopicRepository
    {
        Task<List<Topic>> GetAllTopic();
        Task<Topic> GetTopicNameById(int topicId);
        Task<Topic> GetByTopicId(int topicId);
        Task<Topic> GetTopicName(string topicName);
        Task InsertTopic(Topic topic);
        Task UpdateTopic(int topicId, Topic topic);
        Task DeleteTopic(int topicId);
    }
}
