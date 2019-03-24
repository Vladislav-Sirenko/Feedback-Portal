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
        [HttpGet]
        public IEnumerable<Feedback> Get()
        {
            return _feedbackService.GetFeedbacksByDepartmentId(1);
        }

        // GET: api/Feedbacks/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
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
    }
}
