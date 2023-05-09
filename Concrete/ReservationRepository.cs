using GuvenEmlakServer.Abstraction;
using GuvenEmlakServer.Enitities;
using Microsoft.EntityFrameworkCore;

namespace GuvenEmlakServer.Concrete
{
	public class ReservationRepository : IReservationRepository
	{
		private readonly GuvenEmlakDbContext _contex;
		public ReservationRepository(GuvenEmlakDbContext contex)
		{
			_contex = contex;

		}
		public async Task<bool> AddAsync(Reservation reservation)
		{

			await _contex.Reservations.AddAsync(reservation);
			if (_contex.Entry(reservation).State == EntityState.Added)
			{
				await _contex.SaveChangesAsync();
				return true;
			}
			return false;


		}

		public async Task<bool> DeleteAsync(int id)
		{
			Reservation reservation = await _contex.Reservations.FindAsync(id);
			if (reservation != null)
			{

				_contex.Reservations.Remove(reservation);
				await _contex.SaveChangesAsync();
				return true;

			}
			return false;


		}


		public async Task<IEnumerable<Reservation>> GetAllAsync()
		{

			return await _contex.Reservations.ToListAsync();
		}
	}
}
