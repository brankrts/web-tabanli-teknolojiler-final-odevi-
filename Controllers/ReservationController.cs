using AutoMapper;
using GuvenEmlakServer.Abstraction;
using GuvenEmlakServer.DTO.ReservationDTO;
using GuvenEmlakServer.Enitities;
using GuvenEmlakServer.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace GuvenEmlakServer.Controllers
{
	public class ReservationController : Controller
	{
		private readonly IReservationRepository _reservationRepository;
		private readonly IMapper _mapper;
		public ReservationController(IReservationRepository reservationRepository, IMapper mapper)
		{
			_reservationRepository = reservationRepository;
			_mapper = mapper;

		}
		[HttpGet("/[controller]/[action]")]
		public async Task<IActionResult> GetReservations()
		{
			var reservations = await _reservationRepository.GetAllAsync();
			if (reservations != null)
			{
				return Ok(JsonSerializer.Serialize(reservations));
			}
			return NotFound(new ErrorModel()
			{
				ErrorCode = 404,
				Message = "No reservation found"
			});
		}
		[HttpPost("/[controller]/[action]")]
		public async Task<IActionResult> AddReservation(ReservationDTO reservation)
		{

			Reservation newReservation = _mapper.Map<Reservation>(reservation);
			bool isAdded = await _reservationRepository.AddAsync(newReservation);
			if (isAdded)
			{
				return Ok(new ResponseSuccessModel()
				{
					SuccessCode = 201,
					Message = "Reservation is added"
				});
			}
			return Ok();
		}
		[HttpDelete("/[controller]/[action]/{id}")]
		public async Task<IActionResult> DeleteReservation(int id)
		{
			bool isDeleted = await _reservationRepository.DeleteAsync(id);

			if (isDeleted)
			{
				return Ok(new ResponseSuccessModel()
				{
					SuccessCode = 201,
					Message = "Reservation is deleted"

				});
			}
			return NotFound(new ErrorModel()
			{
				ErrorCode = 404,
				Message = "Reservation not found"
			});
		}

	}
}
