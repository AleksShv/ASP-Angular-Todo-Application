using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPI.ResurceServer.Migrations
{
    public partial class ChangeNoteTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Date",
                table: "Notes",
                newName: "CreateDate");

            migrationBuilder.AddColumn<bool>(
                name: "Changed",
                table: "Notes",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "CompleteDate",
                table: "Notes",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Changed",
                table: "Notes");

            migrationBuilder.DropColumn(
                name: "CompleteDate",
                table: "Notes");

            migrationBuilder.RenameColumn(
                name: "CreateDate",
                table: "Notes",
                newName: "Date");
        }
    }
}
