using bookingdetails;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using myorders;

namespace mybookings
{
  [Route("api/[controller]")]
  [ApiController]
  public class BookingController : ControllerBase
  {
    private readonly OrdersandPaymentDbContext _context;
    public BookingController(OrdersandPaymentDbContext context)
    {
      _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<MyOrders>>> getAllOrders()
    {
      return await _context.orderDetails.Include(userBookings=>userBookings.products).Include(address=>address.shippingAddress).ToListAsync();
    }    

    [HttpPost]
    public IActionResult bookingProducts(MyOrders bookings, int productId)
    {
      if(bookings == null)
      {
        return BadRequest("Order is null");
      }
      _context.orderDetails.Add(bookings);
      _context.SaveChanges();
      return Ok(bookings);
    }

    [HttpDelete("id")]
    public async Task<IActionResult> deleteItem(Guid id)
    {
      var itemToDelete = await _context.orderDetails.FindAsync(id);
      _context.orderDetails.Remove(itemToDelete);
      await _context.SaveChangesAsync();
      return NoContent();
    }

    [HttpGet("getOrdersbyUserId")]
    public async Task<IActionResult> getBookingsByUserId(int id)
    {
      var orders = await _context.orderDetails.Include(products=>products.products).Include(address=>address.shippingAddress).Where(users=>users.userId == id).ToListAsync();

      if(orders == null)
      {
        return NotFound();
      }

      return Ok(orders);
    }

    [HttpDelete("Cancelorders")]
    public async Task<IActionResult> cancelOrders(Guid id)
    {
      var orders = await _context.orderDetails.Include(products=>products.products)
      .Include(address=>address.shippingAddress)
      .FirstOrDefaultAsync(bookingid=> bookingid.bookingId == id);

      if(orders == null)
      {
        return NotFound();
      }

      _context.Remove(orders);
      _context.SaveChanges();
      return NoContent();
    }
  }
}
