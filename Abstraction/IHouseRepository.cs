using GuvenEmlakServer.Enitities;

namespace GuvenEmlakServer.Abstraction
{
	public interface IHouseRepository
	{
		Task<IEnumerable<House>> GetAllAsync();
		Task<House> GetByIdAsync(int id);
		Task<bool> AddAsync(House house);
		Task<bool> DeleteAsync(int id );
		Task UpdateAsync(House house);


	}
}
