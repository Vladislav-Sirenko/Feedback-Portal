using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace FeedbackPortal.API.Models
{
    public class Feedback
    {
        [Key]
        public int id { get; set; }
        [Required]
        public string text { get; set; }
        public int mark { get; set; }
        public DateTime date { get; set; }
        public int departmentId { get; set; }
        public string username { get; set; }
        public int authUserId { get; set; }
        public DateTime dispatch_time { get; set; }
        public DateTime? arrived_time { get; set; }
        public string department_time { get; set; }
        public string cost { get; set; }
        public ICollection<Photo> Feedbacks { get; set; }
    }
}