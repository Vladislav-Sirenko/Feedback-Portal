using Microsoft.EntityFrameworkCore.Migrations;

namespace FeedbackPortal.API.Migrations
{
    public partial class photos_feedback_Id : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FeedbackId",
                table: "Photos",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FeedbackId",
                table: "Photos");
        }
    }
}
