using BasicEcommerceWebApi.Data;

namespace BasicEcommerceWebApi.Controllers.ControllerDtos
{
    public class MapEFModelHelper
    {
        public static ProductDto MapProductResponse(Product product)
        {
            return new ProductDto
            {
                ProductId = product.ProductId,
                Name = product.Name,
                Price = product.Price,
                CategoryId = product.CategoryId,
                CategoryName = product.Category.Name,
                Description = product.Description,
            };
        }
    }
}
