using Microsoft.EntityFrameworkCore;

namespace BasicEcommerceWebApi.Data
{
    public class Category
    {
        public int CategoryId { get; set; }
        public string Name { get; set; }




        // Foreign key to represent the parent category
        public int? ParentCategoryId { get; set; }

        // Navigation property to represent the parent category
        public Category ParentCategory { get; set; }
        // Navigation property to represent the child categories
        public ICollection<Category> ChildCategories { get; set; }



        public ICollection<Product> Products { get; set; }
    }
}
