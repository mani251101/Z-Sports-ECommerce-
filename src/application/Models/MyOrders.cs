using users;

namespace bookingdetails
{
  public class MyOrders
  {
    public Guid bookingId { get; set; }
    public int paymentId { get; set; }
    public int userId { get; set; }
    public string cardNumber { get; set; }
    public string cvv { get; set; }
    public string expireDate { get; set; }
    public string totalAmount { get; set; }
    public string paidDate { get; set; }
    public UserDetail shippingAddress { get; set; }
    public string shippingType { get; set; }
    public string deliveryDate { get; set; }
    public string deliveryStatus { get; set; }
    public List<MyCart> products { get; set; }
  }

  public class MyCart
  {
    public int orderId { get; set; }
    public int productId { get; set; }
    public string productName { get; set; }
    public string productPrice { get; set; }
    public string category { get; set; }
    public string description { get; set; }
    public string highlights { get; set; }
    public string count { get; set; }
    public string imageUrl { get; set; }
  }
}
