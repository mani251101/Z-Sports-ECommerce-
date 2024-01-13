using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using details;

public class ProductsDbContext : DbContext
    {
        public ProductsDbContext (DbContextOptions<ProductsDbContext> options)
            : base(options)
        {
        }
        public DbSet<details.SportsProduct> sportsProduct { get; set; }
    }
