using Microsoft.EntityFrameworkCore;


namespace BasicEcommerceWebApi.Data
{
    public class InMemoryDbContext : DbContext
    {
        public InMemoryDbContext(DbContextOptions<InMemoryDbContext> options)
            : base(options)
        { }

        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Category { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<Product>().HasKey(p => p.ProductId);

            modelBuilder.Entity<Product>()
                .HasOne(product => product.Category)
                .WithMany(category => category.Products)
                .HasForeignKey(product => product.CategoryId)
                .IsRequired(true);

            modelBuilder.Entity<Category>()
                .HasMany(c => c.ChildCategories)
                .WithOne(c => c.ParentCategory)
                .HasForeignKey(c => c.ParentCategoryId)
                .IsRequired(false);

            modelBuilder.Entity<Category>().HasData(
                new Category { CategoryId = 1, Name = "Sports" },
                new Category { CategoryId = 2, Name = "Electronics" },
                new Category { CategoryId = 3, Name = "Home Devices", ParentCategoryId = 2 },
                new Category { CategoryId = 4, Name = "PCs", ParentCategoryId = 2 },
                new Category { CategoryId = 5, Name = "Laptops", ParentCategoryId = 4 },
                new Category { CategoryId = 6, Name = "Tablets", ParentCategoryId = 4 },
                new Category { CategoryId = 7, Name = "Books" }
                );

            modelBuilder.Entity<Product>().HasData(
                new Product { ProductId = 1, Name = "Bedminton", Description = "ABC", Price = 15, CategoryId = 1 }, // Sports
                new Product { ProductId = 2, Name = "Bat", Description = "ABC", Price = 15, CategoryId = 1 },

                new Product { ProductId = 3, Name = "AMD Ryzen7", Description = "ABC", Price = 15, CategoryId = 5 }, //Laptops
                new Product { ProductId = 4, Name = "Hp i9 6Core", Description = "ABC", Price = 15, CategoryId = 5 }, //Laptops

                new Product { ProductId = 5, Name = "S1 Tablet", Description = "ABC", Price = 15, CategoryId = 6 }, // tablets
                new Product { ProductId = 6, Name = "S2 Tablet", Description = "ABC", Price = 15, CategoryId = 6 },

                new Product { ProductId = 7, Name = "AC", Description = "ABC", Price = 15, CategoryId = 3 }, //Home Devices
                new Product { ProductId = 8, Name = "Fridge", Description = "ABC", Price = 15, CategoryId = 3 },

                new Product { ProductId = 9, Name = "C++ DNS Malik", Description = "ABC", Price = 15, CategoryId = 7 }, //Books
                new Product { ProductId = 10, Name = "Rippon .Net React", Description = "ABC", Price = 15, CategoryId = 7 }
                );
        }
    }
}
