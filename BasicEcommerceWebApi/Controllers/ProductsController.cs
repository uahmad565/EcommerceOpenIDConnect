using BasicEcommerceWebApi.Controllers.ControllerDtos;
using BasicEcommerceWebApi.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography.X509Certificates;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BasicEcommerceWebApi.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private InMemoryDbContext _context;
        public ProductsController(InMemoryDbContext dbContext)
        {
            _context = dbContext;
            _context.Database.EnsureCreated();

        }
        // GET: api/<ProductsController>
        [Authorize(Roles ="Admin")]
        [HttpGet]
        public IActionResult Get()
        {
            List<ProductDto> list = new List<ProductDto>();
            var products = this._context.Products.Include(p => p.Category).ToList();
            foreach (var item in products)
            {
                list.Add(MapEFModelHelper.MapProductResponse(item));
            }
            return Ok(list);
        }

        // GET: api/<ProductsController>

        [HttpGet("GetProducts")]
        public IActionResult GetProducts([FromQuery] string category)
        {
            var productsList = this._context.Products.Include(p => p.Category).Where(p => p.Category.Name.Equals(category, StringComparison.OrdinalIgnoreCase));
            var subCategories = this._context.Category.Include(c => c.ChildCategories).FirstOrDefault(c => c.Name.Equals(category, StringComparison.OrdinalIgnoreCase))?.ChildCategories.Select(x => x.Name);

            if (productsList.Count() == 0 && subCategories == null)
            {
                return NotFound();
            }
            return Ok(new { products = productsList.Select(x => MapEFModelHelper.MapProductResponse(x)), subCategories });
        }

        // GET api/<ProductsController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var product = _context.Products.Include(p => p.Category).FirstOrDefault(p => p.ProductId == id);
            if (product == default)
                return BadRequest("Product not found");
            return Ok(MapEFModelHelper.MapProductResponse(product));
        }

        // POST api/<ProductsController>
        [HttpPost]
        public IActionResult Post([FromBody] ProductDto productForm)
        {
            try
            {
                var foundCategory = this._context.Category.FirstOrDefault(c => c.Name.Equals(productForm.CategoryName, StringComparison.OrdinalIgnoreCase));
                if (foundCategory == default)
                {
                    return BadRequest($"No such category '{productForm.CategoryName}' exist");
                }
                _context.Products.Add(new Product { Name = productForm.Name, Description = productForm.Description, Price = productForm.Price, CategoryId = foundCategory.CategoryId });
                _context.SaveChanges();
                return Ok(productForm);

            }
            catch (Exception ex)
            {
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }
        }

        // PUT api/<ProductsController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] ProductDto value)
        {
            var product = _context.Products.FirstOrDefault(p => p.ProductId == id);
            if (product == default)
                return BadRequest("This product doesn't exist");
            var category = this._context.Category.FirstOrDefault(c => c.Name.Equals(value.CategoryName, StringComparison.OrdinalIgnoreCase));
            if (category == default)
                return BadRequest("specified category doesn't exist");
            product.Name = value.Name;
            product.Description = value.Description;
            product.Price = value.Price;
            product.CategoryId = category.CategoryId;
            _context.Update(product);
            _context.SaveChanges();
            return NoContent();

        }

        // DELETE api/<ProductsController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var product = _context.Products.FirstOrDefault(p => p.ProductId == id);
            if (product == default)
                BadRequest("Product not found");
            _context.Products.Remove(product);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
