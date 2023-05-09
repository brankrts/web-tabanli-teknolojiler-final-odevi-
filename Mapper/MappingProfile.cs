using AutoMapper;
using GuvenEmlakServer.DTO;
using GuvenEmlakServer.DTO.HouseDTO;
using GuvenEmlakServer.DTO.ReservationDTO;
using GuvenEmlakServer.Enitities;

namespace GuvenEmlakServer.Mapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<HouseAddDTO, House>().ForMember(dest => dest.Image, opt => opt.MapFrom(src => GetImagePath(src.Image)));
            CreateMap<HouseUpdateDTO, House>().ForMember(dest => dest.Image, opt => opt.MapFrom(src => GetImagePath(src.Image))).ForMember(dest => dest.Id, opt => opt.Ignore());
            CreateMap<ReservationDTO, Reservation>();
        }
        private static string GetImagePath(IFormFile image)
        {
            var extention = Path.GetExtension(image.FileName);
            var newImageName = Guid.NewGuid().ToString() + extention;
            var location = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/HouseImages/", newImageName);
            var stream = new FileStream(location, FileMode.Create);
            image.CopyTo(stream);
            stream.Close();
            return newImageName;

        }
    }
}
