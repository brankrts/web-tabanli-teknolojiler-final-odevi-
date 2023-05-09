namespace GuvenEmlakServer.Enitities.Common
{
    public class BaseEntitiy
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
