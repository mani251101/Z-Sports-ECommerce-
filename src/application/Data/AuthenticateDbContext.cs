using Microsoft.EntityFrameworkCore;
using Userregister;

namespace apijwt
{
    public class AuthenticateDbContext : DbContext
    {
        public AuthenticateDbContext(DbContextOptions options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Register>().HasKey(user=>user.userId);
            builder.Entity<Register>().HasMany(user=>user.myCarts);
            builder.Entity<Cart>().HasKey(cart=>cart.cartId);
        }

        public DbSet<Register>registers{get;set;}
        public DbSet<Cart> mycart {get; set;}
    }
}
