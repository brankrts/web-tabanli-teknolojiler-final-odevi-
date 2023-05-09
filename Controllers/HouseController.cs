using AutoMapper;
using GuvenEmlakServer.Abstraction;
using GuvenEmlakServer.DTO;
using GuvenEmlakServer.DTO.HouseDTO;
using GuvenEmlakServer.Enitities;
using GuvenEmlakServer.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace GuvenEmlakServer.Controllers
{
    public class HouseController : Controller
    {
        private readonly IHouseRepository _houseRepository;
        private readonly IMapper _mapper;
        public HouseController(IHouseRepository houseRepository, IMapper mapper)
        {
            _houseRepository = houseRepository;
            _mapper = mapper;

        }
        [HttpPost("/[controller]/[action]")]
        public async Task<IActionResult> AddHouse(HouseAddDTO house)

        {

            House addedHouse = _mapper.Map<House>(house);

            bool isAdded = await _houseRepository.AddAsync(addedHouse);

            if (isAdded)
            {
                return Ok(JsonSerializer.Serialize(addedHouse));

            }
            return BadRequest(new ErrorModel()
            {
                ErrorCode = 502,
                Message = "Could not add house"
            });
        }
        [HttpGet("/[controller]/[action]")]
        public async Task<IActionResult> GetHouses()
        {

            var houses = await _houseRepository.GetAllAsync();

            if (houses != null)
            {
                foreach (House house in houses)
                {
                    house.Image = "https://localhost:7161/" + "HouseImages/" + house.Image;

                }
                return Ok(JsonSerializer.Serialize(houses));
            }

            return NotFound(new ErrorModel()
            {
                ErrorCode = 404,
                Message = "No house found"
            });
        }
        [HttpDelete("/[controller]/[action]/{id}")]
        public async Task<IActionResult> DeleteHouse(int id)
        {

            bool isDeleted = await _houseRepository.DeleteAsync(id);
            if (isDeleted)
            {
                return Ok(JsonSerializer.Serialize(new ResponseSuccessModel()
                {
                    SuccessCode = 200,
                    Message = "House is deleted"
                }));
            }
            return NotFound(JsonSerializer.Serialize(new ErrorModel()
            {
                ErrorCode = 404,
                Message = "House Not Found"

            }));

        }
        [HttpPost("/[controller]/[action]")]
        public async Task<IActionResult> UpdateHouse(HouseUpdateDTO house)
        {
            House updatingHouse = await _houseRepository.GetByIdAsync(house.Id);
            if (updatingHouse != null)
            {
                updatingHouse = _mapper.Map(house, updatingHouse);

                await _houseRepository.UpdateAsync(updatingHouse);

                return Ok(new ResponseSuccessModel()
                {
                    SuccessCode = 201,
                    Message = "Current house is updated"
                });
            }

            return NotFound(new ErrorModel()
            {
                ErrorCode = 404,
                Message = "House is not found"
            });
        }
        [HttpGet("/[controller]/[action]/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            House house = await _houseRepository.GetByIdAsync(id);


            if (house != null)
            {
                house.Image = "https://localhost:7161/" + "HouseImages/" + house.Image;
                return Ok(JsonSerializer.Serialize(house));
            }
            return NotFound(JsonSerializer.Serialize(new ErrorModel()
            {
                ErrorCode = 404,
                Message = "House not found"

            }));

        }

    }
}
