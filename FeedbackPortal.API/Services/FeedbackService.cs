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
            return _context.Feedbacks.FirstOrDefault(x => x.departmentId == feedback.departmentId && x.date == feedback.date).id;
        }

        public void EditFeedback(int id, Feedback feedback)
        {
            var feedbackModel = _context.Feedbacks.FirstOrDefault(x => x.id == id);
            if (feedbackModel != null)
            {
                feedbackModel.arrived_time = feedback.arrived_time;
                feedbackModel.cost = feedback.cost;
                feedbackModel.department_time = feedback.department_time;
                feedbackModel.dispatch_time = feedback.dispatch_time;
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

        public List<Feedback> GetAll()
        {
            var feedbacks =  _context.Feedbacks.ToList();
            foreach (var feedback in feedbacks)
            {
                feedback.photosCount = _context.Photos.Count(x => x.FeedbackId == feedback.id);
            }
            _context.UpdateRange(feedbacks);
            _context.SaveChanges();
            return feedbacks;
        }

        public List<Feedback> GetFeedbacksByDepartmentId(int id) => _context.Feedbacks.Where(x => x.departmentId == id).ToList();

        public List<Department> GetDepartments() => _context.Departments.ToList();

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
            if (period.UserName != null && period.StartTime != null && period.EndTime != null)
                return _context.Feedbacks.Where(x =>
                     x.date > period.StartTime && x.date < period.EndTime && x.username == period.UserName).ToList();
            if (period.UserName != null && period.StartTime != null)
            {
                return _context.Feedbacks.Where(x => x.username == period.UserName && x.date > period.StartTime).ToList();
            }
            if (period.UserName != null && period.EndTime != null)
            {
                return _context.Feedbacks.Where(x => x.username == period.UserName && x.date < period.EndTime).ToList();
            }
            return _context.Feedbacks.Where(x => x.username == period.UserName).ToList();
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
