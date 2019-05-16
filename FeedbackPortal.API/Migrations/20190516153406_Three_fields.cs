using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace FeedbackPortal.API.Migrations
{
    public partial class Three_fields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ispositive",
                table: "Feedbacks");

            migrationBuilder.AddColumn<DateTime>(
                name: "arrived_time",
                table: "Feedbacks",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "department_time",
                table: "Feedbacks",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "dispatch_time",
                table: "Feedbacks",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "arrived_time",
                table: "Feedbacks");

            migrationBuilder.DropColumn(
                name: "department_time",
                table: "Feedbacks");

            migrationBuilder.DropColumn(
                name: "dispatch_time",
                table: "Feedbacks");

            migrationBuilder.AddColumn<bool>(
                name: "ispositive",
                table: "Feedbacks",
                nullable: false,
                defaultValue: false);
        }
    }
}
