using System.ComponentModel.DataAnnotations.Schema;

namespace BasicEcommerceWebApi.Data
{
    public class Product
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; } = 0;
        public int CategoryId { get; set; }
        public Category Category { get; set; }
    }
}
