using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FeedbackPortal.API.Models;
using FeedbackPortal.API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace FeedbackPortal.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly IFeedBackService _feedbackService;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public FeedbackController(IFeedBackService feedbackService)
        {
            _feedbackService = feedbackService;
        }

        [HttpPost]
        public async Task Register(User user)
        {
            User newUser = new User { Email = user.Email, Name = user.Name, PhoneNumber = user.PhoneNumber };
            var result = await _userManager.CreateAsync(user, user.Password);
        }
        [HttpPost("[action]")]
        public async Task Login(UserLogin user)
        {
            var result =
                await _signInManager.PasswordSignInAsync(user.Name, user.Password, user.RememberMe, false);
        }

        [HttpPost("[action]")]
        public async Task LogOff()
        {
            await _signInManager.SignOutAsync();
        }
        
        [HttpGet]
        public string[] Get()
        {
            //return _feedbackService.GetAll();
            return new string[] { "a", "b", "c" };
        }

        // POST: api/Rooms
        [HttpPost]
        public void Post([FromBody] Feedback feedback)
        {
            _feedbackService.AddFeedBack(feedback);
        }

        // PUT: api/Rooms/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _feedbackService.DeleteFeedBack(id);
        }

        [HttpGet("[action]")]

        public List<Feedback> GetFeedbacksByDepartment(int id)
        {
            return _feedbackService.GetFeedbacksByDepartmentId(id);
        }

        [HttpGet("[action]")]
        public List<Department> GetDepartments()
        {
            return _feedbackService.GetDepartments();
        }

        //[HttpPost("{id}/ResetVotes")]
        //public void ResetVotesByRoom(string id)
        //{
        //    _userService.ResetVote(id);

        //}

        //[HttpPost("[action]")]
        //public void UserVote([FromBody] UserVote userVote)
        //{
        //    _userService.AddVote(userVote);

        //}
    }
}
