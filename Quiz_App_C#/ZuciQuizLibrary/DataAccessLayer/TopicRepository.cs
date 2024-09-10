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
    public class TopicRepository : ITopicRepository
    {
        ContextDb contextDb = new ContextDb();
        public async Task DeleteTopic(int topicId)
        {
            Topic topicDelete = await GetByTopicId(topicId);
            contextDb.Topics.Remove(topicDelete);
            await contextDb.SaveChangesAsync();
        }

        public async Task<Topic> GetByTopicId(int topicId)
        {
            Topic topic = await (from top in contextDb.Topics where top.Id == topicId select top).FirstAsync();
            return topic;
        }

        public async Task<List<Topic>> GetAllTopic()
        {
            List<Topic> quizTopics = await contextDb.Topics.ToListAsync();
            return quizTopics;
        }

        public async Task InsertTopic(Topic topic)
        {
            await contextDb.AddAsync(topic);
            await contextDb.SaveChangesAsync();
        }

        public async Task UpdateTopic(int topicId, Topic topic)
        {   
            Topic topicEdite = await GetByTopicId(topicId);
            topicEdite.TopicName = topic.TopicName;
            topicEdite.ModifiedBy = topic.ModifiedBy;
            topicEdite.ModifiedOn = topic.ModifiedOn;
            await contextDb.SaveChangesAsync();
        }

        public async Task<Topic> GetTopicNameById(int topicId)
        {
            Topic topic = await (from topicname in contextDb.Topics where topicname.Id == topicId select topicname).FirstAsync();
            return topic;

        }

        public async Task<Topic> GetTopicName(string topicName)
        {
            Topic topic = await (from topicname in contextDb.Topics where topicname.TopicName == topicName select topicname).FirstAsync();
            return topic;
        }
    }
}
