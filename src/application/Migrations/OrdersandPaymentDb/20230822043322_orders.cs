using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace application.Migrations.OrdersandPaymentDb
{
    public partial class orders : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserDetail",
                columns: table => new
                {
                    addressId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    userId = table.Column<int>(type: "int", nullable: false),
                    address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    state = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    city = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    landmark = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    zipcode = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserDetail", x => x.addressId);
                });

            migrationBuilder.CreateTable(
                name: "orderDetails",
                columns: table => new
                {
                    bookingId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    paymentId = table.Column<int>(type: "int", nullable: false),
                    userId = table.Column<int>(type: "int", nullable: false),
                    cardNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    cvv = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    expireDate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    totalAmount = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    paidDate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    shippingAddressaddressId = table.Column<int>(type: "int", nullable: true),
                    shippingType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    deliveryDate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    deliveryStatus = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_orderDetails", x => x.bookingId);
                    table.ForeignKey(
                        name: "FK_orderDetails_UserDetail_shippingAddressaddressId",
                        column: x => x.shippingAddressaddressId,
                        principalTable: "UserDetail",
                        principalColumn: "addressId");
                });

            migrationBuilder.CreateTable(
                name: "cartData",
                columns: table => new
                {
                    orderId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    productId = table.Column<int>(type: "int", nullable: false),
                    productName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    productPrice = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    category = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    highlights = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    count = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    imageUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MyOrdersbookingId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_cartData", x => x.orderId);
                    table.ForeignKey(
                        name: "FK_cartData_orderDetails_MyOrdersbookingId",
                        column: x => x.MyOrdersbookingId,
                        principalTable: "orderDetails",
                        principalColumn: "bookingId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_cartData_MyOrdersbookingId",
                table: "cartData",
                column: "MyOrdersbookingId");

            migrationBuilder.CreateIndex(
                name: "IX_orderDetails_shippingAddressaddressId",
                table: "orderDetails",
                column: "shippingAddressaddressId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "cartData");

            migrationBuilder.DropTable(
                name: "orderDetails");

            migrationBuilder.DropTable(
                name: "UserDetail");
        }
    }
}
