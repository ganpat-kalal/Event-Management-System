using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend_EventManagement.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TblCategories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TblCategories", x => x.Id);
                });

            migrationBuilder.InsertData(
            table: "TblCategories",
            columns: new[] { "Id", "Name" },
            values: new object[,]
            {
                { 1, "Conferences and Trade Shows" },
                { 2, "Workshops and Educational Seminars" },
                { 3, "Corporate Meetings and Retreats" },
                { 4, "Technology Events" },
                { 5, "Art and Cultural Festivals" },
                { 6, "Sports Events" },
                { 7, "Charity Events and Galas" },
                { 8, "Social Gatherings" },
                { 9, "Religious Events" },
                { 10, "Networking Events" }
            });

            migrationBuilder.CreateTable(
                name: "TblEvents",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Attendees = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TblEvents", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TblUsers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TblUsers", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TblCategories");

            migrationBuilder.DropTable(
                name: "TblEvents");

            migrationBuilder.DropTable(
                name: "TblUsers");
        }
    }
}
