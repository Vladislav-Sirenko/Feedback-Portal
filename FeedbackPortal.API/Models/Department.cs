using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FeedbackPortal.API.Models
{
    public class Department
    {
        [Key]
        public int Department_ID { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public ICollection<Feedback> Feedbacks { get; set; }
    }
}
