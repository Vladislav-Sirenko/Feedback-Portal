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
        //FeedbackContext context;
        private readonly List<Feedback> feedbacks;

        private static int Department_ID = 3;

        private readonly List<Department> departments;
        private readonly List<AuthUser> users;
        public FeedbackService()
        {
            feedbacks = new List<Feedback>()
            {
                new Feedback() {id = 1, date = DateTime.Now, mark = 4, text = "Все очень плохо", departmentId = 1,username = "Admin"}
            };
            departments = new List<Department>()
            {
                new Department(),
                new Department() {Address = "Бальзака", Department_ID = 1, Name = "Отделение номер 1"},
                new Department() {Address = "Драйзера", Department_ID = 2, Name = "Отделение номер 2"}
            };
            users = new List<AuthUser>()
            {
                new AuthUser() {id = 1, admin = 1, email = "admin@ukr.net", first_name = "Admin", password = "123"}
            };

        }

        public List<AuthUser> GetUsers()
        {
            return users;
        }
        public void AddFeedBack(Feedback feedback)
        {
            feedbacks.Add(feedback);
         
        }

        public void DeleteFeedBack(int id)
        {
            var feedback = feedbacks.First(x => x.id == id);
            feedbacks.Remove(feedback);
        }

        public List<Feedback> GetAll()
        {
            return feedbacks;
        }

        public List<Feedback> GetFeedbacksByDepartmentId(int id)
        {
            return feedbacks.Where(x => x.departmentId == id).ToList();
        }

        public List<Department> GetDepartments()
        {
            return departments;
        }

        public Feedback GetFeedbackById(int id)
        {
            return feedbacks.First(x => x.id == id);
        }

        public void AddUser(AuthUser user)
        {
            users.Add(user);
        }

        public void AddDepartment(Department department)
        {
            department.Department_ID = Department_ID;
            departments.Add(department);
            Department_ID++;
        }

    }
}
