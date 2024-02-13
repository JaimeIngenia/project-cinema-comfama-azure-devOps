using CinemaComfamaVs5.Models;
using CinemaComfamaVs5.Models.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CinemaComfamaVs5.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservaRealController : ControllerBase
    {
        private readonly DBCINEMA3Context _DBContext;

        public ReservaRealController(DBCINEMA3Context context)
        {
            _DBContext = context;
        }

        [HttpPost]
        [Route("GuardarReservaReal")]
        public async Task<IActionResult> GuardarReservaReal([FromBody] ReservaReal request)
        {
            await _DBContext.ReservasReales.AddAsync(request);
            await _DBContext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "OK");
        }


        [HttpPost]
        [Route("GuardarReservaRealLista")]
        public async Task<IActionResult> GuardarReservaRealLista([FromBody] ReservaRealListaViewModel request)
        {
            try
            {
                if (request.IdUsuario.HasValue && request.IdHorario.HasValue && request.NumeroSillasReserva != null && request.NumeroSillasReserva.Any())
                {
                    foreach (var numeroSilla in request.NumeroSillasReserva)
                    {
                        var reservaReal = new ReservaReal
                        {
                            IdUsuario = request.IdUsuario,
                            IdHorario = request.IdHorario,
                            NumeroSillasReserva = numeroSilla
                        };

                        await _DBContext.ReservasReales.AddAsync(reservaReal);
                        await _DBContext.SaveChangesAsync();
                    }

                    return StatusCode(StatusCodes.Status200OK, "OK");
                }
                else
                {
                    return BadRequest("IdUsuario, IdHorario y IdSillaReserva son obligatorios y deben contener datos.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al guardar la silla de reserva: {ex.Message}");
            }
        }




        [HttpGet]
        [Route("GetAllReservaRealProperties")]
        public async Task<IActionResult> GetAllReservaRealProperties()
        {
            List<ReservaRealViewModel> lista = await _DBContext.ReservasReales
                .Include(rr => rr.IdUsuarioNavegacion)
                //.Include(rr => rr.IdSillaReservaNavegacion)
                .Include(rr => rr.IdHorarioNavegacion)
                    .ThenInclude(h => h.IdSalaNavigation)
                .Include(rr => rr.IdHorarioNavegacion)
                    .ThenInclude(h => h.IdHoraNavigation) // Incluye la entidad Hora
                .Include(rr => rr.IdHorarioNavegacion)
                    .ThenInclude(h => h.IdPeliculaNavigation)
                .Select(rr => new ReservaRealViewModel
                {
                    IdReservaReal = rr.IdReservaReal,
                    IdUsuario = rr.IdUsuarioNavegacion.IdUsuario,
                    Nombres = rr.IdUsuarioNavegacion.Nombres,
                    Correo = rr.IdUsuarioNavegacion.Correo,
                    IdHorario = rr.IdHorarioNavegacion.IdHorario,
                    Titulo = rr.IdHorarioNavegacion.IdPeliculaNavigation.Titulo,
                    ImagenPromocional = rr.IdHorarioNavegacion.IdPeliculaNavigation.ImagenPromocional,
                    IdSala = rr.IdHorarioNavegacion.IdSala ?? 0,
                    NombreSala = rr.IdHorarioNavegacion.IdSalaNavigation.NombreSala ?? "Sin Sala",
                    IdHora = rr.IdHorarioNavegacion.IdHora ?? 0,
                    Hora = rr.IdHorarioNavegacion.IdHoraNavigation.Hora1,
                    //NumeroSilla = rr.IdSillaReservaNavegacion.NumeroSilla ?? 0,
                })
                .ToListAsync();

            return StatusCode(StatusCodes.Status200OK, lista);
        }



        [HttpGet]
        [Route("GetReservaRealPropertiesByUser/{idUsuario}")]
        public async Task<IActionResult> GetReservaRealPropertiesByUser(int idUsuario)
        {
            try
            {
                List<ReservaRealViewModel> lista = await _DBContext.ReservasReales
                    .Include(rr => rr.IdUsuarioNavegacion)
                    .Include(rr => rr.IdHorarioNavegacion)
                        .ThenInclude(h => h.IdSalaNavigation)
                    .Include(rr => rr.IdHorarioNavegacion)
                        .ThenInclude(h => h.IdHoraNavigation)
                    .Include(rr => rr.IdHorarioNavegacion)
                        .ThenInclude(h => h.IdPeliculaNavigation)
                    .Where(rr => rr.IdUsuario == idUsuario)  // Filtrar por IdUsuario
                    .Select(rr => new ReservaRealViewModel
                    {
                        IdReservaReal = rr.IdReservaReal,
                        NumeroSillasReserva = rr.NumeroSillasReserva,


                        IdUsuario = rr.IdUsuarioNavegacion.IdUsuario,
                        Nombres = rr.IdUsuarioNavegacion.Nombres,
                        Correo = rr.IdUsuarioNavegacion.Correo,
                        IdHorario = rr.IdHorarioNavegacion.IdHorario,
                        Titulo = rr.IdHorarioNavegacion.IdPeliculaNavigation.Titulo,
                        ImagenPromocional = rr.IdHorarioNavegacion.IdPeliculaNavigation.ImagenPromocional,
                        IdSala = rr.IdHorarioNavegacion.IdSala ?? 0,
                        NombreSala = rr.IdHorarioNavegacion.IdSalaNavigation.NombreSala ?? "Sin Sala",
                        IdHora = rr.IdHorarioNavegacion.IdHora ?? 0,
                        Hora = rr.IdHorarioNavegacion.IdHoraNavigation.Hora1,
                    })
                    .ToListAsync();

                return StatusCode(StatusCodes.Status200OK, lista);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al obtener las reservas por usuario: {ex.Message}");
            }
        }



        [HttpDelete]
        [Route("EliminarReservaReal/{idReservaReal}")]
        public async Task<IActionResult> EliminarReservaReal(int idReservaReal)
        {
            try
            {
                var reserva = await _DBContext.ReservasReales.FindAsync(idReservaReal);

                if (reserva == null)
                {
                    return NotFound($"No se encontró la reserva con IdReservaReal: {idReservaReal}");
                }

                _DBContext.ReservasReales.Remove(reserva);
                await _DBContext.SaveChangesAsync();

                return StatusCode(StatusCodes.Status200OK, "Reserva eliminada exitosamente");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al eliminar la reserva: {ex.Message}");
            }
        }

        [HttpPut]
        [Route("EditarReservaReal/{idReservaReal}")]
        public async Task<IActionResult> EditarReservaReal(int idReservaReal, [FromBody] ReservaRealViewModel reservaRealActualizada)
        {
            try
            {
                // Buscar la reserva real por su identificador
                var reservaReal = await _DBContext.ReservasReales.FindAsync(idReservaReal);

                // Verificar si la reserva real existe
                if (reservaReal == null)
                {
                    return NotFound($"No se encontró la reserva real con el ID {idReservaReal}");
                }

                // Actualizar los campos de la reserva real con la información proporcionada
                reservaReal.NumeroSillasReserva = reservaRealActualizada.NumeroSillasReserva;
                // Actualiza los demás campos según sea necesario

                // Guardar los cambios en la base de datos
                await _DBContext.SaveChangesAsync();

                return Ok($"La reserva real con el ID {idReservaReal} ha sido actualizada exitosamente");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al actualizar la reserva real: {ex.Message}");
            }
        }







    }
}
