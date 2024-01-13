using bookingdetails;
using Microsoft.EntityFrameworkCore;
using users;

namespace myorders
{
  public class OrdersandPaymentDbContext : DbContext
  {
    public OrdersandPaymentDbContext(DbContextOptions<OrdersandPaymentDbContext> options) : base(options)
    {
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);
      modelBuilder.Entity<MyOrders>().HasKey(booking=>booking.bookingId);
      modelBuilder.Entity<MyOrders>().HasMany(cartDetails=>cartDetails.products);
      modelBuilder.Entity<MyCart>().HasKey(cart=>cart.orderId);
      modelBuilder.Entity<UserDetail>().HasKey(useraddress=>useraddress.addressId);
    }

    public DbSet<MyOrders> orderDetails { get; set; }
    public DbSet<MyCart> cartData { get; set; }
  }
}
