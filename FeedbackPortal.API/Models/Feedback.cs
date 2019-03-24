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
        public int mark { get; set; }
        public string text { get; set; }
        public string time { get; set; }
        [ForeignKey("Department")]
        public int Department_ID { get; set; }
        public Department Department { get; set; }

    }
}