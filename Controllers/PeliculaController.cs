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
            await _DBContext.Peliculas.AddAsync(request);
            await _DBContext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "OK");
        }

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



        // Controlador para filtrar por título de película
        [HttpGet]
        [Route("VerPeliculaPorTitulo/{titulo}")]
        public async Task<IActionResult> VerPeliculaPorTitulo(string titulo)
        {
            Pelicula pelicula = _DBContext.Peliculas
                .Include(c => c.oFormato)
                .Include(ce => ce.oGenero)
                .FirstOrDefault(p => p.Titulo == titulo);

            if (pelicula == null)
            {
                return NotFound();
            }

            return Ok(pelicula);
        }



        [HttpGet]
        [Route("VerPeliculaPorImagenPromocional/{imagenPromocional}")]
        public async Task<IActionResult> VerPeliculaPorImagenPromocional(string imagenPromocional)
        {
            Pelicula pelicula = _DBContext.Peliculas.Include(c => c.oFormato).Include(ce => ce.oGenero)
                .FirstOrDefault(p => p.ImagenPromocional == imagenPromocional);

            if (pelicula == null)
            {
                return NotFound();
            }

            return Ok(pelicula);
        }

        // Controlador para editar
        [HttpPut]
        [Route("EditarPelicula/{id}")]
        public async Task<IActionResult> EditarPelicula(int id, [FromBody] Pelicula peliculaActualizada)
        {
            // Buscar la película por ID en la base de datos
            var peliculaExistente = await _DBContext.Peliculas.FindAsync(id);

            // Verificar si la película existe
            if (peliculaExistente == null)
            {
                return NotFound(); // Devolver 404 si la película no se encuentra
            }

            // Actualizar los campos de la película existente con la información proporcionada
            peliculaExistente.Titulo = peliculaActualizada.Titulo;
            peliculaExistente.ImagenPromocional = peliculaActualizada.ImagenPromocional;
            peliculaExistente.Duracion = peliculaActualizada.Duracion;
            peliculaExistente.Valor = peliculaActualizada.Valor;
            peliculaExistente.Sinopsis = peliculaActualizada.Sinopsis;
            peliculaExistente.IdGenero = peliculaActualizada.IdGenero;
            peliculaExistente.IdFormato = peliculaActualizada.IdFormato;

            // Guardar los cambios en la base de datos
            await _DBContext.SaveChangesAsync();

            return Ok(peliculaExistente); // Devolver la película actualizada
        }

        // Controlador para eliminar
        [HttpDelete]
        [Route("EliminarPelicula/{id}")]
        public async Task<IActionResult> EliminarPelicula(int id)
        {
            // Buscar la película por ID en la base de datos
            var peliculaExistente = await _DBContext.Peliculas.FindAsync(id);

            // Verificar si la película existe
            if (peliculaExistente == null)
            {
                return NotFound(); // Devolver 404 si la película no se encuentra
            }

            // Eliminar la película de la base de datos
            _DBContext.Peliculas.Remove(peliculaExistente);
            await _DBContext.SaveChangesAsync();

            return Ok("La película ha sido eliminada exitosamente");
        }


  










    }
}
