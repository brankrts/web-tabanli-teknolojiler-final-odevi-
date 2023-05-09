using GuvenEmlakServer.Enitities.Common;

namespace GuvenEmlakServer.Enitities
{
    public class House : BaseEntitiy
    {
        public String Type { get; set; }
        public String Name { get; set; }
        public String Description { get; set; }
        public String Country { get; set; }
        public String Address { get; set; }
        public int Bedrooms { get; set; }
        public int Bathrooms { get; set; }
        public String Surface { get; set; }
        public int Price { get; set; }
        public string Image { get; set; }
     }
}
