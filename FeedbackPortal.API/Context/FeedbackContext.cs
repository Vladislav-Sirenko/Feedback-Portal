using FeedbackPortal.API.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FeedbackPortal.API.Context
{
    public class FeedbackContext: DbContext
    {
        public FeedbackContext(DbContextOptions<FeedbackContext> options):base(options) 
        {
        }
        public DbSet<AuthUser> AuthUsers { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<Department> Departments{ get; set; }
        public DbSet<Photo> Photos { get; set; }
    }
}
