using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FeedbackPortal.API.Context;
using FeedbackPortal.API.Models;

namespace FeedbackPortal.API.Services
{
    public class FeedbackService : IFeedBackService
    {
        FeedbackContext context; 
        public FeedbackService(FeedbackContext FeedbackContext)
        {
            context = FeedbackContext;
        }

        public void AddFeedBack(Feedback feedback)
        {
            context.Feedbacks.Add(feedback);
            context.SaveChanges();
        }

        public void DeleteFeedBack(int id)
        {
            var feedback = GetFeedbackById(id);
            context.Remove(feedback);
            context.SaveChanges();
        }

        public List<Feedback> GetAll()
        {
          return  context.Feedbacks.ToList();
        }

        public List<Department> GetDepartments()
        {
            return context.Departments.ToList();
        }

        public Feedback GetFeedbackById(int id)
        {
            return context.Feedbacks.First(x=>x.Feedback_ID == id);
        }

        public List<Feedback> GetFeedbacksByDepartmentId(int id)
        {
            return context.Feedbacks.Where(x => x.Department_ID == id).ToList();
        }
    }
}
