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
    public class TopicService : ITopicService
    {
        private readonly ITopicRepository _topicRepository;

        public TopicService(ITopicRepository topicRepository)
        {
            _topicRepository = topicRepository;
        }

        public async Task DeleteTopic(int topicId)
        {
            await _topicRepository.DeleteTopic(topicId);
        }

        public async Task<List<Topic>> GetAllTopic()
        {
            var topics = await _topicRepository.GetAllTopic();
            return topics;
        }

        public async Task<Topic> GetByTopicId(int topicId)
        {
            try
            {
                var topic = await _topicRepository.GetByTopicId(topicId);
                return topic;
            }
            catch (Exception)
            {
                throw new Exception("No such Topic Found");
            }
        }

        public async Task<Topic> GetTopicName(string topicName)
        {
            try
            {
                var topicname = await _topicRepository.GetTopicName(topicName);
                return topicname;
            }
            catch (Exception)
            {
                throw new Exception("No topic Name in this Topic Name");
            }
        }

        public async Task<Topic> GetTopicNameById(int topicId)
        {
            try
            {
                var topicname = await _topicRepository.GetTopicNameById(topicId);
                return topicname;
            }
            catch(Exception)
            {
                throw new Exception("No topic Name in this Topic Id");
            }
        }

        public async Task InsertTopic(Topic topic)
        {
            await _topicRepository.InsertTopic(topic);
        }

        public async Task UpdateTopic(int topicId, Topic topic)
        {
            await _topicRepository.UpdateTopic(topicId, topic);
        }
    }
}
