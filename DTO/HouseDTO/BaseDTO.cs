namespace GuvenEmlakServer.DTO.HouseDTO
{
	public class BaseDTO
	{
		public string Type { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public string Country { get; set; }
		public string Address { get; set; }
		public int Bedrooms { get; set; }
		public int Bathrooms { get; set; }
		public string Surface { get; set; }
		public int Price { get; set; }
		public IFormFile Image { get; set; }
	}
}
