using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using ClosedXML.Excel;
using FeedbackPortal.API.Models;
using FeedbackPortal.API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FeedbackPortal.API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class FeedbacksController : ControllerBase
	{
		private IFeedBackService _feedbackService;

		public FeedbacksController(IFeedBackService feedbackService)
		{
			_feedbackService = feedbackService;
		}

		// GET: api/Feedbacks
		[HttpGet("{id}")]
		public IEnumerable<Feedback> Get(int id)
		{
			return _feedbackService.GetFeedbacksByDepartmentId(id);
		}


		// POST: api/Feedbacks
		[HttpPost]
		public int Post([FromBody] Feedback feedback)
		{
			feedback.date = DateTime.Now;
			return _feedbackService.AddFeedBack(feedback);
		}

		// PUT: api/Feedbacks/5
		[HttpPut("{id}")]
		public void Put(int id, [FromBody] Feedback feedback)
		{
			_feedbackService.EditFeedback(id, feedback);
		}

		// DELETE: api/ApiWithActions/5
		[HttpDelete("{id}")]
		public void Delete(int id)
		{
			_feedbackService.DeleteFeedBack(id);
		}

		// DELETE: api/ApiWithActions/5
		[HttpGet("[action]")]
		public IEnumerable<Department> GetDepartments()
		{
			return _feedbackService.GetDepartments();
		}

		[HttpGet("[action]")]

		public List<Feedback> GetFeedbacksByDepartment(int id)
		{
			return _feedbackService.GetFeedbacksByDepartmentId(id);
		}
		[HttpGet("[action]")]
		public IEnumerable<AuthUser> GetUsers()
		{
			return _feedbackService.GetUsers();
		}
		[HttpPost("[action]")]
		public void AddUser([FromBody] AuthUser user)
		{
			_feedbackService.AddUser(user);
		}
		[HttpPost("[action]")]
		public void AddDepartment([FromBody] Department department)
		{
			_feedbackService.AddDepartment(department);
		}
		[HttpPost("[action]")]
		public List<Feedback> GetByUserName([FromBody] UserPeriod period)
		{
			return _feedbackService.GetFeedbacksByUser(period);
		}
        [HttpPost("[action]")]
        public List<Feedback> GetByQ([FromBody] QPeriod period)
        {
            return _feedbackService.GetFeedbacksByQ(period);
        }
        [HttpGet("{id}/FirstPhoto")]
		public ActionResult<Photo> GetFirstPhoto(int id)
		{
			var photo = _feedbackService.GetFirstImage(id);
			return Ok(photo);
		}

		[HttpGet("{id}/SecondPhoto")]
		public ActionResult<Photo> GetSecondPhoto(int id)
		{
			var photo = _feedbackService.GetSecondImage(id);
			return Ok(photo);
		}
		[HttpGet("{id}/GetFeedbacksByMark")]
		public List<Feedback> GetFeedbacksByMark(int id)
		{
			var feedbacks = _feedbackService.GetFeedbacksByMark(id);
			return feedbacks.ToList();
		}
		[HttpGet("{id}/ThirdPhoto")]
		public ActionResult<Photo> GetThirdPhoto(int id)
		{
			var photo = _feedbackService.GetThirdImage(id);
			return Ok(photo);
		}

		[HttpPost("{id}/UploadFile")]
		public HttpResponseMessage UploadFile(int id)
		{
			HttpResponseMessage response = new HttpResponseMessage();
			var files = HttpContext.Request.Form.Files;
			if (files.Count > 0)
			{
				foreach (IFormFile fil in files)
				{
					using (var ms = new MemoryStream())
					{
						fil.CopyTo(ms);
						var fileBytes = ms.ToArray();
						var image = stringToImage(Convert.ToBase64String(fileBytes));
						Console.WriteLine(image.Size); 
						image = resizeImage(image, new Size(300, 300));
						Console.WriteLine(image.Size);
						var compressedBase64 = ImageToString(image);
						_feedbackService.AddImage(compressedBase64, id);
					}
				}
			}
			return response;
		}
		public static Image resizeImage(Image imgToResize, Size size)
		{
			return new Bitmap(imgToResize, size);
		}
		public Image stringToImage(string inputString)
		{
			byte[] imageBytes = Convert.FromBase64String(inputString);
			MemoryStream ms = new MemoryStream(imageBytes);

			Image image = Image.FromStream(ms, true, true);

			return image;
		}
		public string ImageToString(Image image)
		{
			using (image)
			{
				using (MemoryStream m = new MemoryStream())
				{
					image.Save(m, ImageFormat.Jpeg);
					byte[] imageBytes = m.ToArray();

					// Convert byte[] to Base64 String
					string base64String = Convert.ToBase64String(imageBytes);
					return base64String;
				}
			}
		}
        [HttpGet("[action]")]
        public IActionResult GetReport()
        {
            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("Feedbacks");
                var currentRow = 1;
                worksheet.Cell(currentRow, 1).Value = "Номер отделения";
                worksheet.Cell(currentRow, 2).Value = "Время в отделении";
                worksheet.Cell(currentRow, 3).Value = "Отзыв";
                worksheet.Cell(currentRow, 4).Value = "Дата";
                worksheet.Cell(currentRow, 5).Value = "Оценка";
                var feedbacks = _feedbackService.GetAllWithoutPhotos();
                var deps = _feedbackService.GetDepartmentsAsNoTracking();
                foreach (var feedback in feedbacks)
                {
                    currentRow++;
                    worksheet.Cell(currentRow, 1).Value = deps.FirstOrDefault(x=>x.Id == feedback.departmentId)?.Name;
                    worksheet.Cell(currentRow, 2).Value = feedback.department_time;
                    worksheet.Cell(currentRow, 3).Value = feedback.text;
                    worksheet.Cell(currentRow, 4).Value = feedback.date;
                    worksheet.Cell(currentRow, 5).Value = feedback.mark;
                }

                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    var content = stream.ToArray();

                    return File(
                        content,
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                        "users.xlsx");
                }
            }
        }
    }
}
