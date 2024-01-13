using Microsoft.EntityFrameworkCore;
using users;

namespace address
{
  public class UserAddressDbContext : DbContext
  {
    public UserAddressDbContext(DbContextOptions<UserAddressDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);
      modelBuilder.Entity<UserDetail>().HasKey(address=>address.addressId);
    }

    public DbSet<UserDetail> address { get; set; }
  }
}
