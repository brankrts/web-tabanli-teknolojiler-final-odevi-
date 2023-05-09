using GuvenEmlakServer.Enitities;
using Microsoft.EntityFrameworkCore;

namespace GuvenEmlakServer
{
	public class GuvenEmlakDbContext : DbContext

	{
		public DbSet<House> Houses { get; set; }
		public DbSet<Reservation> Reservations { get; set; }

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			optionsBuilder.UseSqlServer("Server=.\\;Database=GuvenEmlakDb;Trusted_Connection=False; User Id=baran; Password=Baran.1234;TrustServerCertificate=True");
		}
	}

}
