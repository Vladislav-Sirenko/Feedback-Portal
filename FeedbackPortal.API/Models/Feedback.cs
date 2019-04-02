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

    }
}