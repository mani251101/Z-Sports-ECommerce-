using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace application.Migrations.ProductsDb
{
    public partial class products : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "sportsProduct",
                columns: table => new
                {
                    productId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    productName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    productPrice = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    category = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    highlights = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    count = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    stocksAvailability = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    imageUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    imageUrl1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    imageUrl2 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    imageUrl3 = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_sportsProduct", x => x.productId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "sportsProduct");
        }
    }
}
