﻿// <auto-generated />
using System;
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

            modelBuilder.Entity("FeedbackPortal.API.Models.AuthUser", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("admin");

                    b.Property<string>("first_name");

                    b.Property<string>("password");

                    b.HasKey("id");

                    b.ToTable("AuthUsers");
                });

            modelBuilder.Entity("FeedbackPortal.API.Models.Department", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Departments");
                });

            modelBuilder.Entity("FeedbackPortal.API.Models.Feedback", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("arrived_time");

                    b.Property<int>("authUserId");

                    b.Property<DateTime>("date");

                    b.Property<int>("departmentId");

                    b.Property<string>("department_time");

                    b.Property<DateTime>("dispatch_time");

                    b.Property<int>("mark");

                    b.Property<string>("text")
                        .IsRequired();

                    b.Property<string>("username");

                    b.HasKey("id");

                    b.HasIndex("authUserId");

                    b.HasIndex("departmentId");

                    b.ToTable("Feedbacks");
                });

            modelBuilder.Entity("FeedbackPortal.API.Models.Photo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Code");

                    b.Property<int>("FeedbackId");

                    b.HasKey("Id");

                    b.HasIndex("FeedbackId");

                    b.ToTable("Photos");
                });

            modelBuilder.Entity("FeedbackPortal.API.Models.Feedback", b =>
                {
                    b.HasOne("FeedbackPortal.API.Models.AuthUser")
                        .WithMany("Feedbacks")
                        .HasForeignKey("authUserId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("FeedbackPortal.API.Models.Department")
                        .WithMany("Feedbacks")
                        .HasForeignKey("departmentId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("FeedbackPortal.API.Models.Photo", b =>
                {
                    b.HasOne("FeedbackPortal.API.Models.Feedback")
                        .WithMany("Feedbacks")
                        .HasForeignKey("FeedbackId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
