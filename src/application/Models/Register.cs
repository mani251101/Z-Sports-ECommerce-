namespace Userregister
{
  public class Register
    {
        public int userId {get; set;}
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string mobile { get; set; }
        public string email{get; set;}
        public string password { get; set; }
        public byte[] passwordHash{get; set;}
        public byte[] passwordSalt{get; set;}
        public List<Cart> myCarts { get; set; }
    }

    public class Cart
    {
      public int cartId { get; set; }
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
