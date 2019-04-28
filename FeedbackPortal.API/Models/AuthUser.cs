using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FeedbackPortal.API.Models
{
    public class AuthUser
    {
        [Key]
        public int id { get; set; }
        public string first_name{ get; set; }
        public string email { get; set; }
        public string password{ get; set; }
        public int admin { get; set; }
        public ICollection<Feedback> Feedbacks { get; set; }

    }
}
