using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using details;
using productdetails;
using apijwt;
using Microsoft.AspNetCore.JsonPatch;

namespace application.Controllers
{
  [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ProductsDbContext _context;
        private readonly AuthenticateDbContext _apiContext;
        private readonly IWebHostEnvironment _hostEnvironment;

        public ProductsController(ProductsDbContext context, IWebHostEnvironment hostEnvironment, AuthenticateDbContext apicontext)
        {
            _context = context;
            _hostEnvironment = hostEnvironment;
            _apiContext = apicontext;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SportsProduct>>> getAllSportsProduct()
        {
            return await _context.sportsProduct.ToListAsync();
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SportsProduct>> getSportsProduct(int id)
        {
            var sportsProduct = await _context.sportsProduct.FindAsync(id);

            if (sportsProduct == null)
            {
                return NotFound();
            }

            return sportsProduct;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Product>> updateSportsProduct(int id, [FromForm] Product sportsProduct)
        {
            var product = _context.sportsProduct.FirstOrDefault(products=>products.productId == id);

            if(product == null)
            {
                return NotFound();
            }

            product.productName = sportsProduct.productName;
            product.productPrice = sportsProduct.productPrice;
            product.category = sportsProduct.category;
            product.description = sportsProduct.description;
            product.highlights = sportsProduct.highlights;
            product.count = sportsProduct.count;
            product.stocksAvailability = sportsProduct.stocksAvailability;

            if(sportsProduct.image != null)
            {
              product.imageUrl = await saveImage(sportsProduct.image);
              product.imageUrl1 = await saveImage(sportsProduct.image1);
              product.imageUrl2 = await saveImage(sportsProduct.image2);
              product.imageUrl3 = await saveImage(sportsProduct.image3);
            }
            _context.sportsProduct.Update(product);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<SportsProduct>> postSportsProduct([FromForm] Product products)
        {
            var product = new SportsProduct
            {
                productName = products.productName,
                productPrice = products.productPrice,
                category = products.category,
                description = products.description,
                highlights = products.highlights,
                count = products.count,
                stocksAvailability = products.stocksAvailability,

            };

                if(products.image != null)
                {
                  product.imageUrl = await saveImage(products.image);
                }
                if(products.image1 != null)
                {
                  product.imageUrl1 = await saveImage(products.image1);
                }
                if(products.image2 != null)
                {
                  product.imageUrl2 = await saveImage(products.image2);
                }
                if(products.image3 != null)
                {
                  product.imageUrl3 = await saveImage(products.image3);
                }
                _context.sportsProduct.Add(product);
                await _context.SaveChangesAsync();

            return CreatedAtAction("GetSportsProduct", new { id = product.productId }, product);
        }

        private async Task<string> saveImage(IFormFile image)
        {
            var fileName = Path.GetFileName(image.FileName);
            var uploadsDirPath = Path.Combine(_hostEnvironment.WebRootPath, "ProductImage");

            if (!Directory.Exists(uploadsDirPath))
            {
                Directory.CreateDirectory(uploadsDirPath);
            }

            var filePath = Path.Combine(uploadsDirPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await image.CopyToAsync(stream);
            }

            return fileName;
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> deleteSportsProduct(int id)
        {
            var sportsProduct = await _context.sportsProduct.FindAsync(id);
            if (sportsProduct == null)
            {
                return NotFound();
            }

            _context.sportsProduct.Remove(sportsProduct);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool sportsProductExists(int id)
        {
            return _context.sportsProduct.Any(e => e.productId == id);
        }

    [HttpGet]
    [Route("api/categories")]
    public IActionResult productCategories(string category)
    {
      var product = _context.sportsProduct.Where(e => e.category == category);

      if (product == null)
      {
        return NotFound();
      }

      return Ok(product);
    }

    [HttpGet("search")]
        public IActionResult searchProduct(string query)
        {
          var product = _context.sportsProduct.Where(p=>p.category.ToLower().Contains(query.ToLower()));
          return Ok(product);
        }

        [HttpDelete("DeletebyCartId")]
        public IActionResult deleteCartItem(int cartId)
        {
          var cartProducts = _apiContext.mycart.FirstOrDefault(cartitem => cartitem.cartId == cartId);
          if(cartProducts == null)
          {
            return NotFound("Cart items not found");
          }
          _apiContext.mycart.Remove(cartProducts);
          _apiContext.SaveChanges();
          return Ok(cartProducts);
        }

        [HttpPatch]
        [Route("productbyid")]
        public ActionResult getStocksAvailability(int productId, [FromBody]JsonPatchDocument<SportsProduct> products)
        {
          if(products == null)
          {
            return BadRequest();
          }
          var availability = _context.sportsProduct.Where(product =>product.productId == productId).FirstOrDefault();
          if(availability == null)
          {
              return NotFound();
          }
          products.ApplyTo(availability);
          _context.SaveChangesAsync();
          return NoContent();
        }
    }
}
