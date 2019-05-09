using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
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
            feedback.date = DateTime.Now;
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
        [HttpPost("[action]")]
        public void AddDepartment([FromBody] Department department)
        {
            _feedbackService.AddDepartment(department);
        }

        [HttpPost("{id}/UploadFile")]
        public HttpResponseMessage UploadFile(string id)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            var files = HttpContext.Request.Form.Files;
            if (files.Count > 0)
            {
                foreach (IFormFile fil in files)
                {
                    using (var ms = new MemoryStream())
                    {
                        fil.CopyTo(ms);
                        var fileBytes = ms.ToArray();
                        string s = Convert.ToBase64String(fileBytes);
                        _feedbackService.AddImage(s,id);
                    }
                }
            }
            return response;
        }

      
    }
}
