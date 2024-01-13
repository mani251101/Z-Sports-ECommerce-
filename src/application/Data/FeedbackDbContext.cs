using Microsoft.EntityFrameworkCore;
using userfeedback;

namespace feedbackform
{
  public class FeedbackDbContext : DbContext
  {
    public FeedbackDbContext(DbContextOptions<FeedbackDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);
      modelBuilder.Entity<Feedback>().HasKey(id=>id.feedbackId);
    }

    public DbSet<Feedback> feedback {get; set;}
  }
}
