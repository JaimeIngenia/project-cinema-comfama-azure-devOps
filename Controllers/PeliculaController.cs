using CinemaComfamaVs5.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CinemaComfamaVs5.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeliculaController : ControllerBase
    {
        private readonly DBCINEMA3Context _DBContext;
        public PeliculaController(DBCINEMA3Context context)
        {
            _DBContext = context;
        }

        [HttpPost]
        [Route("GuardarPelicula")]
        public async Task<IActionResult> GuardarPelicula([FromBody] Pelicula request)
        {
            //return StatusCode(StatusCodes.Status200OK, "Hola");
            await _DBContext.Peliculas.AddAsync(request);
            await _DBContext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "OK");
        }

        //[HttpGet]
        //[Route("VerPelicula")]
        //public async Task<IActionResult> VerPelicula()
        //{
        //    List<Pelicula> lista = _DBContext.Peliculas.Include(c=>c.oFormato).Include(ce => ce.oGenero).ToList();
        //    return StatusCode(StatusCodes.Status200OK, lista);
        //}
        [HttpGet]
        [Route("VerPelicula")]
        public async Task<IActionResult> VerPeliculas()
        {
            List<Pelicula> lista = await _DBContext.Peliculas.ToListAsync();
            return StatusCode(StatusCodes.Status200OK, lista);
        }



        // Controlador para filtrar por ID de película
        [HttpGet]
        [Route("VerPeliculaPorId/{id}")]
        public async Task<IActionResult> VerPeliculaPorId(int id)
        {
            Pelicula pelicula = _DBContext.Peliculas.Include(c => c.oFormato).Include(ce => ce.oGenero).FirstOrDefault(p => p.IdPelicula == id);
            if (pelicula == null)
            {
                return NotFound();
            }
            return Ok(pelicula);
        }





    }
}
