using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using FeedbackPortal.API.Context;
using FeedbackPortal.API.Models;

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
        public void AddFeedBack(Feedback feedback)
        {
            feedback.authUserId = _context.AuthUsers.FirstOrDefault(x => x.first_name == feedback.username).id;
            _context.Feedbacks.Add(feedback);
            _context.SaveChanges();
        }

        public void DeleteFeedBack(int id)
        {
            var feedback = _context.Feedbacks.First(x => x.id == id);
            _context.Feedbacks.Remove(feedback);
            _context.SaveChanges();
        }

        public List<Feedback> GetAll()
        {
            return _context.Feedbacks.ToList();
        }

        public List<Feedback> GetFeedbacksByDepartmentId(int id)
        {
            return _context.Feedbacks.Where(x => x.departmentId == id).ToList();
        }

        public List<Department> GetDepartments()
        {
            return _context.Departments.ToList();
        }

        public Feedback GetFeedbackById(int id)
        {
            return _context.Feedbacks.First(x => x.id == id);
        }

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
        public void AddImage(string image,string Id)
        {
            int id = Convert.ToInt32(Id);
            var feedback = _context.Feedbacks.FirstOrDefault(x => x.id == id);
            if (feedback != null)
            {
                feedback.photo = image;
                _context.SaveChanges();
            }
        }

    }
}
