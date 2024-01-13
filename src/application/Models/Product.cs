namespace productdetails
{
    public class Product
    {
        public string productName { get; set; }
        public string productPrice { get; set; }
        public string category { get; set; }
        public string description { get; set; }
        public string highlights { get; set; }
        public string count { get; set; }
        public string stocksAvailability { get; set; }
        public IFormFile image { get; set; }
        public IFormFile image1 { get; set; }
        public IFormFile image2 { get; set; }
        public IFormFile image3 { get; set; }
    }
}
