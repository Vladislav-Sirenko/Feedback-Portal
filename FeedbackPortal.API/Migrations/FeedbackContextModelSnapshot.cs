﻿// <auto-generated />
using FeedbackPortal.API.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace FeedbackPortal.API.Migrations
{
    [DbContext(typeof(FeedbackContext))]
    partial class FeedbackContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.8-servicing-32085")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("FeedbackPortal.API.Models.Department", b =>
                {
                    b.Property<int>("Department_ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address");

                    b.Property<string>("Name");

                    b.HasKey("Department_ID");

                    b.ToTable("Departments");
                });

            modelBuilder.Entity("FeedbackPortal.API.Models.Feedback", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Department_ID");

                    b.Property<int>("mark");

                    b.Property<string>("text");

                    b.Property<string>("time");

                    b.HasKey("id");

                    b.HasIndex("Department_ID");

                    b.ToTable("Feedbacks");
                });

            modelBuilder.Entity("FeedbackPortal.API.Models.Feedback", b =>
                {
                    b.HasOne("FeedbackPortal.API.Models.Department", "Department")
                        .WithMany("feedbacks")
                        .HasForeignKey("Department_ID")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
