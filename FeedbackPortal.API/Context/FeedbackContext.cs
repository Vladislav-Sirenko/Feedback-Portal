using FeedbackPortal.API.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FeedbackPortal.API.Context
{
    public class FeedbackContext: IdentityDbContext
    {
        public FeedbackContext(DbContextOptions<FeedbackContext> options):base(options) 
        {
            Database.EnsureCreated();
        }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<Department> Departments{ get; set; }
    }
}
