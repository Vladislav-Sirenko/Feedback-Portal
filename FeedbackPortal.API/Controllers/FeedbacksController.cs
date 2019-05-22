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
        public int Post([FromBody] Feedback feedback)
        {
            feedback.date = DateTime.Now;
            return _feedbackService.AddFeedBack(feedback);
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
        [HttpGet("{id}/FirstPhoto")]
        public ActionResult<Photo> GetFirstPhoto(int id)
        {
            var photo = _feedbackService.GetFirstImage(id);
            return Ok(photo);
        }

        [HttpGet("{id}/SecondPhoto")]
        public ActionResult<Photo> GetSecondPhoto(int id)
        {
            var photo = _feedbackService.GetSecondImage(id);
            return Ok(photo);
        }
        [HttpGet("{id}/ThirdPhoto")]
        public ActionResult<Photo> GetThirdPhoto(int id)
        {
            var photo = _feedbackService.GetThirdImage(id);
            return Ok(photo);
        }

        [HttpPost("{id}/UploadFile")]
        public HttpResponseMessage UploadFile(int id)
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
                        _feedbackService.AddImage(Convert.ToBase64String(fileBytes), id);
                    }
                }
            }
            

            return response;
        }


    }
}
