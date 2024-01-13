using System.ComponentModel.DataAnnotations;

namespace details
{
  public class SportsProduct
    {
        [Key]
        public int productId { get; set; }
        public string productName { get; set; }
        public string productPrice { get; set; }
        public string category { get; set; }
        public string description { get; set; }
        public string highlights { get; set; }
        public string count { get; set; }
        public string stocksAvailability { get; set; }
        public string imageUrl { get; set; }
        public string imageUrl1 { get; set; }
        public string imageUrl2 { get; set; }
        public string imageUrl3 { get; set; }


    }
}
