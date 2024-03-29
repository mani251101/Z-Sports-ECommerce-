﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using apijwt;

#nullable disable

namespace application.Migrations
{
    [DbContext(typeof(AuthenticateDbContext))]
    [Migration("20230822043218_orders")]
    partial class orders
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("Userregister.Cart", b =>
                {
                    b.Property<int>("cartId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("cartId"), 1L, 1);

                    b.Property<int?>("RegisteruserId")
                        .HasColumnType("int");

                    b.Property<string>("category")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("count")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("highlights")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("imageUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("productId")
                        .HasColumnType("int");

                    b.Property<string>("productName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("productPrice")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("cartId");

                    b.HasIndex("RegisteruserId");

                    b.ToTable("mycart");
                });

            modelBuilder.Entity("Userregister.Register", b =>
                {
                    b.Property<int>("userId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("userId"), 1L, 1);

                    b.Property<string>("email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("firstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("lastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("mobile")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("passwordHash")
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("passwordSalt")
                        .HasColumnType("varbinary(max)");

                    b.HasKey("userId");

                    b.ToTable("registers");
                });

            modelBuilder.Entity("Userregister.Cart", b =>
                {
                    b.HasOne("Userregister.Register", null)
                        .WithMany("myCarts")
                        .HasForeignKey("RegisteruserId");
                });

            modelBuilder.Entity("Userregister.Register", b =>
                {
                    b.Navigation("myCarts");
                });
#pragma warning restore 612, 618
        }
    }
}
