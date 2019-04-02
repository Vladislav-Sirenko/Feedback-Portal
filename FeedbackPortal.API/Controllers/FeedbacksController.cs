using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FeedbackPortal.API.Models;
using FeedbackPortal.API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FeedbackPortal.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbacksController : ControllerBase
    {
        private IFeedBackService _feedbackService;

        public FeedbacksController(IFeedBackService feedbackService)
        {
            _feedbackService = feedbackService;
        }

        // GET: api/Feedbacks
        [HttpGet("{id}")]
        public IEnumerable<Feedback> Get(int id)
        {
            return _feedbackService.GetFeedbacksByDepartmentId(id);
        }


        // POST: api/Feedbacks
        [HttpPost]
        public void Post([FromBody] Feedback feedback)
        {
            _feedbackService.AddFeedBack(feedback);
        }

        // PUT: api/Feedbacks/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpGet("[action]")]
        public IEnumerable<Department> GetDepartments()
        {
            return _feedbackService.GetDepartments();
        }

        [HttpGet("[action]")]

        public List<Feedback> GetFeedbacksByDepartment(int id)
        {
            return _feedbackService.GetFeedbacksByDepartmentId(id);
        }
        [HttpGet("[action]")]
        public IEnumerable<AuthUser> GetUsers()
        {
            return _feedbackService.GetUsers();
        }
        [HttpPost("[action]")]
        public void AddUser([FromBody] AuthUser user)
        {
            _feedbackService.AddUser(user);
        }
    }
}
