using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using FeedbackPortal.API.Context;
using FeedbackPortal.API.Models;
using Microsoft.EntityFrameworkCore;

namespace FeedbackPortal.API.Services
{
    public class FeedbackService : IFeedBackService
    {
        private readonly FeedbackContext _context;
        public FeedbackService(FeedbackContext context)
        {
            _context = context;
        }

        public List<AuthUser> GetUsers()
        {
            return _context.AuthUsers.ToList();
        }
        public int AddFeedBack(Feedback feedback)
        {
            feedback.authUserId = _context.AuthUsers.FirstOrDefault(x => x.first_name == feedback.username).id;
            _context.Feedbacks.Add(feedback);
            _context.SaveChanges();
            return feedback.id;
        }

        public List<Feedback> GetFeedbacksByQ(QPeriod period)
        {
            var feedbacks = _context.Feedbacks.AsNoTracking()
                .Where(x => x.department_time.Length == 5 && x.department_time.Contains(':')).ToList();
            var feed = feedbacks.Where(x => Convert.ToInt32(x.department_time.Split(":")[0].Substring(1, 1)) < period.EndQ &&
                                        Convert.ToInt32(x.department_time.Split(":")[0].Substring(1, 1)) > period.StartQ)
                .ToList();
            return feed;
        }

        public void EditFeedback(int id, Feedback feedback)
        {
            var feedbackModel = _context.Feedbacks.FirstOrDefault(x => x.id == id);
            if (feedbackModel != null)
            {
                feedbackModel.arrived_time = feedback.arrived_time;
                feedbackModel.department_time = feedback.department_time;
                feedbackModel.dispatch_time = feedback.dispatch_time;
                feedbackModel.date = feedback.date;
                feedbackModel.mark = feedback.mark;
                feedbackModel.text = feedback.text;
                _context.Feedbacks.Update(feedbackModel);
                _context.SaveChanges();
            }
        }

        public void DeleteFeedBack(int id)
        {
            var feedback = _context.Feedbacks.FirstOrDefault(x => x.id == id);
            if (feedback != null) _context.Feedbacks.Remove(feedback);
            _context.SaveChanges();
        }
        public List<Feedback> GetAllWithoutPhotos() => _context.Feedbacks.AsNoTracking().ToList();
        public List<Feedback> GetFeedbacksByDepartmentId(int id) => _context.Feedbacks.Where(x => x.departmentId == id).OrderByDescending(x => x.date).ToList();
        public List<Feedback> GetFeedbacksByDepartment(MarkIdModel model)
        {
            return _context.Feedbacks.AsNoTracking().WhereIf(model.Id != null, x => x.departmentId == model.Id)
                .WhereIf(model.Mark != null, x => x.mark == model.Mark)
                .OrderByDescending(x => x.date).ToList();
        }

        public List<Department> GetDepartments() => _context.Departments.ToList();
        public List<Department> GetDepartmentsAsNoTracking() => _context.Departments.AsNoTracking().ToList();

        public Feedback GetFeedbackById(int id) => _context.Feedbacks.First(x => x.id == id);

        public void AddUser(AuthUser user)
        {
            _context.AuthUsers.Add(user);
            _context.SaveChanges();
        }

        public void AddDepartment(Department department)
        {
            department.Id = 0;
            _context.Departments.Add(department);
            _context.SaveChanges();
        }

        public List<Feedback> GetFeedbacksByUser(UserPeriod period)
        {
            return _context.Feedbacks
                .WhereIf(period.UserName != null, x => x.username.StartsWith(period.UserName))
                .WhereIf(period.StartTime != null, x => x.date > period.StartTime)
                .WhereIf(period.EndTime != null, x => x.date < period.EndTime)
                .OrderByDescending(x => x.date)
                .ToList();
        }
        public void AddImage(string image, int id)
        {
            _context.Photos.Add(new Photo() { Code = image, FeedbackId = id });
            var feedback = _context.Feedbacks.FirstOrDefault(x => x.id == id);
            feedback.photosCount++;
            _context.Feedbacks.Update(feedback);
            _context.SaveChanges();
        }

        public Photo GetFirstImage(int id)
        {
            return _context.Photos.AsNoTracking().FirstOrDefault(x => x.FeedbackId == id);
        }

        public Photo GetSecondImage(int id)
        {
            var photos = _context.Photos.AsNoTracking().Where(x => x.FeedbackId == id);
            return photos.ToList().ElementAtOrDefault(1);
        }

        public Photo GetThirdImage(int id)
        {
            var photos = _context.Photos.AsNoTracking().Where(x => x.FeedbackId == id);
            return photos.ToList().ElementAtOrDefault(2);
        }

        public IOrderedQueryable<Feedback> GetFeedbacksByMark(int mark)
        {
            var feedbacks = _context.Feedbacks.Where(x => x.mark == mark).OrderByDescending(x => x.date);
            return feedbacks;
        }
    }
}
