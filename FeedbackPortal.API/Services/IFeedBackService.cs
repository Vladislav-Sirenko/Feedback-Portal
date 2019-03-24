using FeedbackPortal.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FeedbackPortal.API.Services
{
    public interface IFeedBackService
    {
        List<Feedback> GetAll();
        Feedback GetFeedbackById(int id);
        List<Feedback> GetFeedbacksByDepartmentId(int id);
        List<Department> GetDepartments();
        void AddFeedBack(Feedback feedback);
        void DeleteFeedBack(int id);
    }
}
