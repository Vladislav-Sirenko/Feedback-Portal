using FeedbackPortal.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FeedbackPortal.API.Services
{
    public interface IFeedBackService
    {
        void AddDepartment(Department department);
        List<Feedback> GetAll();
        Feedback GetFeedbackById(int id);
        List<Feedback> GetFeedbacksByDepartmentId(int id);
        List<Department> GetDepartments();
        int AddFeedBack(Feedback feedback);
        void DeleteFeedBack(int id);
        List<AuthUser> GetUsers();
        void AddUser(AuthUser user);
        void AddImage(string image, int Id);
        Photo GetFirstImage(int id);
        Photo GetSecondImage(int id);
        Photo GetThirdImage(int id);
        IOrderedQueryable<Feedback> GetFeedbacksByMark(int mark);
        List<Feedback> GetFeedbacksByUser(UserPeriod period);
        void EditFeedback(int id, Feedback feedback);
    }
}
