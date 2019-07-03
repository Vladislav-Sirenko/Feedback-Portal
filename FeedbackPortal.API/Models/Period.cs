using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FeedbackPortal.API.Models
{
    public class UserPeriod
    {
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public string UserName { get; set; }
    }
}
