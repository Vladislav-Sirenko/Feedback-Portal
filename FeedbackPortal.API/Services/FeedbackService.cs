using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FeedbackPortal.API.Context;
using FeedbackPortal.API.Models;
using Microsoft.EntityFrameworkCore;

namespace FeedbackPortal.API.Services
{
    public class FeedbackService : IFeedBackService
    {
        List<Feedback> feedbacks;
        List<Department> departments;
        FeedbackContext feedbackContext;
        public FeedbackService(FeedbackContext context)
        {
            feedbackContext = context;
            feedbacks = new List<Feedback>();
            departments = new List<Department>(){
                new Department(){Department_ID=1,Address="Бальзака",Name="Отделение номер 1"},
                new Department(){Department_ID=2,Address="Драйзера",Name="Отделение номер 2"},
                new Department(){Department_ID=3,Address="Волкова",Name="Отделение номер 3"},
                new Department(){Department_ID=4,Address="Градинская",Name="Отделение номер 4"}
                
            };
        }

        public void AddFeedBack(Feedback feedback)
        {
            feedbackContext.Feedbacks.Add(feedback);
            feedbackContext.SaveChanges();
            feedbacks.Add(feedback);
        }

        public void DeleteFeedBack(int id)
        {
            var removedFeedback = GetFeedbackById(id);
            feedbacks.Remove(removedFeedback);
        }

        public List<Feedback> GetAll()
        {
          return  feedbacks;
        }

        public List<Department> GetDepartments()
        {
            return departments;
        }

        public Feedback GetFeedbackById(int id)
        {
             return feedbacks.First(x=>x.Department_ID==id);
        }

        public List<Feedback> GetFeedbacksByDepartmentId(int id)
        {
            return feedbacks.Where(x => x.Department_ID == id).ToList();
        }
    }
}
