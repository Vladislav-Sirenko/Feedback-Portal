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
        public int Feedback_ID { get; set; }
        [Required]
        public string User_ID { get; set; }
        public int Mark { get; set; }
        public string Feedback_Text { get; set; }
        public DateTime Feedback_time { get; set; }
        [ForeignKey("Department")]
        public int Department_ID { get; set; }
        public Department Department { get; set; }

    }
}