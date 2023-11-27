using CinemaComfamaVs5.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CinemaComfamaVs5.Models;
using System.Diagnostics;

namespace CinemaComfamaVs5.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        private readonly DBCINEMAContext _DBContext;

        public WeatherForecastController(DBCINEMAContext context)
        {
            _DBContext = context;
        }
        [HttpGet]
        [Route("VerPelicula")]
        public async Task<IActionResult> VerPelicula()
        {
            List<Pelicula> lista = _DBContext.Peliculas.ToList();
            return StatusCode(StatusCodes.Status200OK, lista);
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }
    }
}