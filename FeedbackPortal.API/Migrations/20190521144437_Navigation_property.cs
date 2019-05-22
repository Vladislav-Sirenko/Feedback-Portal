using Microsoft.EntityFrameworkCore.Migrations;

namespace FeedbackPortal.API.Migrations
{
    public partial class Navigation_property : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Photos_FeedbackId",
                table: "Photos",
                column: "FeedbackId");

            migrationBuilder.AddForeignKey(
                name: "FK_Photos_Feedbacks_FeedbackId",
                table: "Photos",
                column: "FeedbackId",
                principalTable: "Feedbacks",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Photos_Feedbacks_FeedbackId",
                table: "Photos");

            migrationBuilder.DropIndex(
                name: "IX_Photos_FeedbackId",
                table: "Photos");
        }
    }
}
