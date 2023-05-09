using GuvenEmlakServer.Enitities;

namespace GuvenEmlakServer.Abstraction
{
	public interface IReservationRepository
	{
		
		Task<IEnumerable<Reservation>> GetAllAsync();
		Task<bool> AddAsync(Reservation reservation);
		Task<bool> DeleteAsync(int id );
	}
}
