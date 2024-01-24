using CinemaComfamaVs5.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CinemaComfamaVs5.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HorarioController : ControllerBase
    {
        private readonly DBCINEMA3Context _DBContext;

        public HorarioController(DBCINEMA3Context context)
        {
            _DBContext = context;
        }

        [HttpPost]
        [Route("GuardarHorario")]
        public async Task<IActionResult> GuardarHorario([FromBody] Horario request)
        {
            //return StatusCode(StatusCodes.Status200OK, "Hola");
            await _DBContext.Horarios.AddAsync(request);
            await _DBContext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "OK");
        }


        [HttpGet]
        [Route("VerHorario")]
        public async Task<IActionResult> VerHorario()
        {
            List<Horario> lista = await _DBContext.Horarios.ToListAsync();
            return StatusCode(StatusCodes.Status200OK, lista);
        }

        [HttpGet]
        [Route("VerUltimoHorario")]
        public async Task<IActionResult> VerUltimoHorario()
        {
            // Obtener el último horario basado en el identificador único (puedes ajustar según tus necesidades).
            var ultimoHorario = await _DBContext.Horarios.OrderByDescending(h => h.IdHorario).FirstOrDefaultAsync();

            if (ultimoHorario == null)
            {
                // Puedes ajustar el código de respuesta según tus necesidades.
                return NotFound("No se encontraron horarios.");
            }

            return StatusCode(StatusCodes.Status200OK, ultimoHorario);
        }
    }
}
