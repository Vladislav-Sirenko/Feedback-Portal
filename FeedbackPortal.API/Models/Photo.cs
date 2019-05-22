using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FeedbackPortal.API.Models
{
    public class Photo
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public int FeedbackId { get; set; }
    }
}
