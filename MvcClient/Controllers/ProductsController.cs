using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using System.Net.Http.Headers;

namespace MvcClient.Controllers
{
    public class ProductsController : Controller
    {
        IConfiguration _configuration;
        public ProductsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        // GET: ProductsController
        public async Task<IActionResult> Index()
        {
            var accessToken = await HttpContext.GetTokenAsync("access_token");

            var client = new HttpClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
            string EcommercewebAPIUrl = _configuration["MyConfigs:BasicEcommerceWebApi"];
            var content = await client.GetStringAsync($"{EcommercewebAPIUrl}/api/Products");
            ViewBag.Json = JArray.Parse(content).ToString();
            return View();
        }



    }
}
