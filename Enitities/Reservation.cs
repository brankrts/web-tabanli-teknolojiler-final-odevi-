using GuvenEmlakServer.Enitities.Common;

namespace GuvenEmlakServer.Enitities
{
	public class Reservation : BaseEntitiy
	{
        public string HouseName { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Description { get; set; }



    }
}
