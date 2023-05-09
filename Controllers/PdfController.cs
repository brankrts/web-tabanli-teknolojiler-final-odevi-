using GuvenEmlakServer.Abstraction;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Syncfusion.Drawing;
using Syncfusion.Pdf;
using Syncfusion.Pdf.Graphics;

namespace GuvenEmlakServer.Controllers
{
	public class PdfController : Controller

	{

		private readonly IReservationRepository _reservationRepository;
		public PdfController(IReservationRepository reservationRepository)
		{
			_reservationRepository = reservationRepository;

		}
		[HttpGet("/[controller]/[action]")]
		public async Task<IActionResult> DownloadPdf()
		{
			var allReservations = await _reservationRepository.GetAllAsync();
			PdfDocument document = new();
			PdfPage page = document.Pages.Add();
			PdfGraphics graphics = page.Graphics;
			PdfFont font = new PdfStandardFont(PdfFontFamily.Helvetica, 20);
			PdfStringFormat format = new PdfStringFormat();
			format.LineSpacing = 20f;
			int count = 0;
			foreach (var reservation in allReservations)
			{


				graphics.DrawString($"Ilgilenilen ev ismi: {reservation.HouseName}", font, PdfBrushes.Black, new PointF(0, count + 20), format);

				graphics.DrawString($"Ilgilenen ismi: {reservation.Name}", font, PdfBrushes.Black, new PointF(0, count + 40), format);
				graphics.DrawString($"Ilgilenen email: {reservation.Email}", font, PdfBrushes.Black, new PointF(0, count + 60), format);
				graphics.DrawString($"Ilgilenen telefon numarasi: {reservation.PhoneNumber}", font, PdfBrushes.Black, new PointF(0, count + 80), format);
				graphics.DrawString($"Aciklama: {reservation.Description}", font, PdfBrushes.Black, new PointF(0, count + 100), format);
				count = count + 120;

			}
			MemoryStream stream = new MemoryStream();
			document.Save(stream);
			stream.Position = 0;
			document.Close(true);
			string contentType = "application/pdf";
			string fileName = "rezervasyonlar.pdf";
			return File(stream, contentType, fileName);

		}
	}
}
	