using GuvenEmlakServer.Abstraction;
using GuvenEmlakServer.Enitities;
using Microsoft.EntityFrameworkCore;

namespace GuvenEmlakServer.Concrete
{
	public class HouseRepository : IHouseRepository

	{
		private readonly GuvenEmlakDbContext _contex;
        public HouseRepository(GuvenEmlakDbContext contex)
        {
			_contex = contex;
            
        }

		public async Task<bool> AddAsync(House house)
		{
			await _contex.Houses.AddAsync(house);

			if(_contex.Entry(house).State == EntityState.Added) {
				await _contex.SaveChangesAsync();
				return true;
			}
			return false;
		}

		public async Task<bool> DeleteAsync(int id)

		{
			House currentHouse = await _contex.Houses.FindAsync(id);
			if (currentHouse != null)
			{
				_contex.Houses.Remove(currentHouse);
				if (_contex.Entry(currentHouse).State == EntityState.Deleted)
				{
					await _contex.SaveChangesAsync();
					return true;
				}
				return false;

			}
			return false;
		}

	
		public async Task<IEnumerable<House>> GetAllAsync()
		{
			return await _contex.Houses.ToListAsync();
		}

		public async Task<House> GetByIdAsync(int id)
		{

			return await _contex.Houses.FindAsync(id);
		}
		public async Task UpdateAsync(House house)
		{
			_contex.Entry(house).State = EntityState.Modified;
			await _contex.SaveChangesAsync();

		}
	}
}
