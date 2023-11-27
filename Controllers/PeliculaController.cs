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
        private readonly DBCINEMAContext _DBContext;
        public PeliculaController(DBCINEMAContext context)
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

        [HttpGet]
        [Route("VerPelicula")]
        public async Task<IActionResult> VerPelicula()
        {
            List<Pelicula> lista = _DBContext.Peliculas.Include(c=>c.oFormato).Include(ce => ce.oGenero).ToList();
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

        // Controlador para filtrar solo por género
        [HttpGet]
        [Route("VerPeliculasPorGenero/{genero}")]
        public async Task<IActionResult> VerPeliculasPorGenero(string genero)
        {
            List<Pelicula> lista = _DBContext.Peliculas.Include(c => c.oFormato).Include(ce => ce.oGenero).Where(p => p.oGenero.NombreGenero == genero).ToList();
            return Ok(lista);
        }

        // Controlador para filtrar solo por formato
        [HttpGet]
        [Route("VerPeliculasPorFormato/{formato}")]
        public async Task<IActionResult> VerPeliculasPorFormato(string formato)
        {
            List<Pelicula> lista = _DBContext.Peliculas.Include(c => c.oFormato).Include(ce => ce.oGenero).Where(p => p.oFormato.NombreFormato == formato).ToList();
            return Ok(lista);
        }




    }
}
