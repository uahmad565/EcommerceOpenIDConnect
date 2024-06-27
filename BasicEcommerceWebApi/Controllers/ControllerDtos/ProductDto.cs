using BasicEcommerceWebApi.Data;
using System.ComponentModel.DataAnnotations;

namespace BasicEcommerceWebApi.Controllers.ControllerDtos
{
    public class ProductDto
    {
        public int ProductId { get; set; }
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; } = 0;
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
    }
}
