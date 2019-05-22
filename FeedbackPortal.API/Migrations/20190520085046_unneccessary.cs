using Microsoft.EntityFrameworkCore.Migrations;

namespace FeedbackPortal.API.Migrations
{
    public partial class unneccessary : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "Departments");

            migrationBuilder.DropColumn(
                name: "email",
                table: "AuthUsers");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Departments",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "email",
                table: "AuthUsers",
                nullable: true);
        }
    }
}
