using CinemaComfamaVs5.Models;
using CinemaComfamaVs5.Models.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CinemaComfamaVs5.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SillaReservaController : ControllerBase
    {
        private readonly DBCINEMA3Context _DBContext;

        public SillaReservaController(DBCINEMA3Context context)
        {
            _DBContext = context;
        }

        [HttpPost]
        [Route("GuardarSillaReserva")]
        public async Task<IActionResult> GuardarSillaReserva([FromBody] Sillareserva request)
        {
            await _DBContext.Sillareservas.AddAsync(request);
            await _DBContext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "OK");
        }

        // ESTE ES EL MEJOR --------------------------------------------------------------------

        [HttpGet]
        [Route("VerSillaReservas")]
        public async Task<IActionResult> VerSillaReservas()
        {
            List<SillaReservaViewModel> lista = await _DBContext.Sillareservas
                .Include(s => s.IdReservaNavigation.IdUsuarioNavigation)
                .Include(s => s.IdReservaNavigation.IdHorarioNavigation.IdPeliculaNavigation)
                .Include(s => s.IdReservaNavigation.IdHorarioNavigation.IdSalaNavigation)
                .Include(s => s.IdReservaNavigation.IdHorarioNavigation.IdHoraNavigation)
                .Select(s => new SillaReservaViewModel
                {
                    IdSillaReserva = s.IdSillaReserva,
                    NumeroSilla = s.NumeroSilla,
                    Reserva = new ReservaDetalleViewModel
                    {
                        IdReserva = s.IdReservaNavigation.IdReserva,
                        Usuario = new UsuarioViewModel
                        {
                            IdUsuario = s.IdReservaNavigation.IdUsuarioNavigation.IdUsuario,
                            IdTipoDocumento = s.IdReservaNavigation.IdUsuarioNavigation.IdTipoDocumento ?? 0,
                            NumeroDocumento = s.IdReservaNavigation.IdUsuarioNavigation.NumeroDocumento ?? "",
                            Nombres = s.IdReservaNavigation.IdUsuarioNavigation.Nombres ?? "",
                            Apellidos = s.IdReservaNavigation.IdUsuarioNavigation.Apellidos ?? "",
                            Correo = s.IdReservaNavigation.IdUsuarioNavigation.Correo ?? "",
                            IdTipoRol = s.IdReservaNavigation.IdUsuarioNavigation.IdTipoRol ?? 0
                        },
                        Horario = new HorarioDetalleViewModel
                        {
                            IdHorario = s.IdReservaNavigation.IdHorarioNavigation.IdHorario,
                            Pelicula = new PeliculaViewModel
                            {
                                IdPelicula = s.IdReservaNavigation.IdHorarioNavigation.IdPeliculaNavigation != null ? s.IdReservaNavigation.IdHorarioNavigation.IdPeliculaNavigation.IdPelicula : 0,
                                Titulo = s.IdReservaNavigation.IdHorarioNavigation.IdPeliculaNavigation != null ? s.IdReservaNavigation.IdHorarioNavigation.IdPeliculaNavigation.Titulo : "",
                                ImagenPromocional = s.IdReservaNavigation.IdHorarioNavigation.IdPeliculaNavigation != null ? s.IdReservaNavigation.IdHorarioNavigation.IdPeliculaNavigation.ImagenPromocional : "",
                                // ... (Resto de las propiedades de PeliculaViewModel)
                            },
                            Sala = new SalaViewModel
                            {
                                IdSala = s.IdReservaNavigation.IdHorarioNavigation.IdSalaNavigation != null ? s.IdReservaNavigation.IdHorarioNavigation.IdSalaNavigation.IdSala : 0,
                                NombreSala = s.IdReservaNavigation.IdHorarioNavigation.IdSalaNavigation != null ? s.IdReservaNavigation.IdHorarioNavigation.IdSalaNavigation.NombreSala : "",
                                Estado = s.IdReservaNavigation.IdHorarioNavigation.IdSalaNavigation != null ? s.IdReservaNavigation.IdHorarioNavigation.IdSalaNavigation.Estado : "",

                            },
                            Hora = new HoraViewModel
                            {
                                IdHora = s.IdReservaNavigation.IdHorarioNavigation.IdHoraNavigation != null ? s.IdReservaNavigation.IdHorarioNavigation.IdHoraNavigation.IdHora : 0,
                                Hora1 = s.IdReservaNavigation.IdHorarioNavigation.IdHoraNavigation != null ? s.IdReservaNavigation.IdHorarioNavigation.IdHoraNavigation.Hora1 ?? TimeSpan.Zero : TimeSpan.Zero
                            }
                        }
                    }
                })
                .ToListAsync();

            return StatusCode(StatusCodes.Status200OK, lista);
        }


        [HttpGet]
        [Route("VerSillasReservaPorUsuario/{idUsuario}")]
        public async Task<IActionResult> VerSillasReservaPorUsuario(int idUsuario)
        {
            try
            {
                List<SillaReservaViewModel> sillasReserva = await _DBContext.Sillareservas
                    .Where(s => s.IdReservaNavigation.IdUsuarioNavigation.IdUsuario == idUsuario)
                    .Include(s => s.IdReservaNavigation.IdUsuarioNavigation)
                    .Include(s => s.IdReservaNavigation.IdHorarioNavigation.IdPeliculaNavigation)
                    .Include(s => s.IdReservaNavigation.IdHorarioNavigation.IdSalaNavigation)
                    .Include(s => s.IdReservaNavigation.IdHorarioNavigation.IdHoraNavigation)
                    .Select(s => new SillaReservaViewModel
                    {
                        IdSillaReserva = s.IdSillaReserva,
                        NumeroSilla = s.NumeroSilla,
                        Reserva = new ReservaDetalleViewModel
                        {
                            IdReserva = s.IdReservaNavigation.IdReserva,
                            Usuario = new UsuarioViewModel
                            {
                                IdUsuario = s.IdReservaNavigation.IdUsuarioNavigation.IdUsuario,
                                IdTipoDocumento = s.IdReservaNavigation.IdUsuarioNavigation.IdTipoDocumento ?? 0,
                                NumeroDocumento = s.IdReservaNavigation.IdUsuarioNavigation.NumeroDocumento ?? "",
                                Nombres = s.IdReservaNavigation.IdUsuarioNavigation.Nombres ?? "",
                                Apellidos = s.IdReservaNavigation.IdUsuarioNavigation.Apellidos ?? "",
                                Correo = s.IdReservaNavigation.IdUsuarioNavigation.Correo ?? "",
                                IdTipoRol = s.IdReservaNavigation.IdUsuarioNavigation.IdTipoRol ?? 0
                            },
                            Horario = new HorarioDetalleViewModel
                            {
                                IdHorario = s.IdReservaNavigation.IdHorarioNavigation.IdHorario,
                                Pelicula = new PeliculaViewModel
                                {
                                    IdPelicula = s.IdReservaNavigation.IdHorarioNavigation.IdPeliculaNavigation != null ? s.IdReservaNavigation.IdHorarioNavigation.IdPeliculaNavigation.IdPelicula : 0,
                                    Titulo = s.IdReservaNavigation.IdHorarioNavigation.IdPeliculaNavigation != null ? s.IdReservaNavigation.IdHorarioNavigation.IdPeliculaNavigation.Titulo : "",
                                    ImagenPromocional = s.IdReservaNavigation.IdHorarioNavigation.IdPeliculaNavigation != null ? s.IdReservaNavigation.IdHorarioNavigation.IdPeliculaNavigation.ImagenPromocional : ""
                                    // ... (Resto de las propiedades de PeliculaViewModel)
                                },
                                Sala = new SalaViewModel
                                {
                                    IdSala = s.IdReservaNavigation.IdHorarioNavigation.IdSalaNavigation != null ? s.IdReservaNavigation.IdHorarioNavigation.IdSalaNavigation.IdSala : 0,
                                    NombreSala = s.IdReservaNavigation.IdHorarioNavigation.IdSalaNavigation != null ? s.IdReservaNavigation.IdHorarioNavigation.IdSalaNavigation.NombreSala : "",
                                    Estado = s.IdReservaNavigation.IdHorarioNavigation.IdSalaNavigation != null ? s.IdReservaNavigation.IdHorarioNavigation.IdSalaNavigation.Estado : ""
                                    // ... (Resto de las propiedades de SalaViewModel)
                                },
                                Hora = new HoraViewModel
                                {
                                    IdHora = s.IdReservaNavigation.IdHorarioNavigation.IdHoraNavigation != null ? s.IdReservaNavigation.IdHorarioNavigation.IdHoraNavigation.IdHora : 0,
                                    Hora1 = s.IdReservaNavigation.IdHorarioNavigation.IdHoraNavigation != null ? s.IdReservaNavigation.IdHorarioNavigation.IdHoraNavigation.Hora1 ?? TimeSpan.Zero : TimeSpan.Zero
                                    // ... (Resto de las propiedades de HoraViewModel)
                                }
                            }
                        }
                    })
                    .ToListAsync();

                return StatusCode(StatusCodes.Status200OK, sillasReserva);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }





        //[HttpGet]
        //[Route("VerSillasReservaPorUsuarioModificada/{idUsuario}")]
        //public async Task<IActionResult> VerSillasReservaPorUsuarioModificada(int idUsuario)
        //{
        //    try
        //    {
        //        List<SillaReservaDetalleViewModel> sillasReserva = await _DBContext.Sillareservas
        //            .Where(s => s.IdReservaNavigation.IdUsuarioNavigation.IdUsuario == idUsuario)
        //            .Include(s => s.IdReservaNavigation.IdUsuarioNavigation)
        //            .Include(s => s.IdReservaNavigation.IdHorarioNavigation.IdPeliculaNavigation)
        //            .Include(s => s.IdReservaNavigation.IdHorarioNavigation.IdSalaNavigation)
        //            .Include(s => s.IdReservaNavigation.IdHorarioNavigation.IdHoraNavigation)
        //            .Select(s => new SillaReservaDetalleViewModel
        //            {
        //                NumeroSilla = s.NumeroSilla ?? 0,
        //                NumeroDocumento = s.IdReservaNavigation.IdUsuarioNavigation.NumeroDocumento ?? "",
        //                Nombres = s.IdReservaNavigation.IdUsuarioNavigation.Nombres ?? "",
        //                Apellidos = s.IdReservaNavigation.IdUsuarioNavigation.Apellidos ?? "",
        //                Correo = s.IdReservaNavigation.IdUsuarioNavigation.Correo ?? "",
        //                TituloPelicula = s.IdReservaNavigation != null && s.IdReservaNavigation.IdHorarioNavigation != null && s.IdReservaNavigation.IdHorarioNavigation.IdPeliculaNavigation != null
        //                    ? s.IdReservaNavigation.IdHorarioNavigation.IdPeliculaNavigation.Titulo ?? ""
        //                    : "",
        //                ImagenPromocionalPelicula = s.IdReservaNavigation != null && s.IdReservaNavigation.IdHorarioNavigation != null && s.IdReservaNavigation.IdHorarioNavigation.IdPeliculaNavigation != null
        //                    ? s.IdReservaNavigation.IdHorarioNavigation.IdPeliculaNavigation.ImagenPromocional ?? ""
        //                    : "",
        //                NombreSala = s.IdReservaNavigation != null && s.IdReservaNavigation.IdHorarioNavigation != null && s.IdReservaNavigation.IdHorarioNavigation.IdSalaNavigation != null
        //                    ? s.IdReservaNavigation.IdHorarioNavigation.IdSalaNavigation.NombreSala ?? ""
        //                    : "",
        //                HoraFuncion = s.IdReservaNavigation != null && s.IdReservaNavigation.IdHorarioNavigation != null && s.IdReservaNavigation.IdHorarioNavigation.IdHoraNavigation != null
        //                    ? DateTime.Today.Add(s.IdReservaNavigation.IdHorarioNavigation.IdHoraNavigation.Hora1 ?? TimeSpan.Zero).ToString("HH:mm:ss")
        //                    : ""
        //            })
        //            .ToListAsync();

        //        return StatusCode(StatusCodes.Status200OK, sillasReserva);
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        //    }
        //}



        [HttpGet]
        [Route("VerSillasReservaPorUsuarioModificada/{idUsuario}")]
        public async Task<IActionResult> VerSillasReservaPorUsuarioModificada(int idUsuario)
        {
            try
            {
                List<SillaReservaDetalleViewModel> sillasReserva = await _DBContext.Sillareservas
                    .Where(s => s.IdReservaNavigation.IdUsuarioNavigation.IdUsuario == idUsuario)
                    .Include(s => s.IdReservaNavigation.IdUsuarioNavigation)
                    .Include(s => s.IdReservaNavigation.IdHorarioNavigation.IdPeliculaNavigation)
                    .Include(s => s.IdReservaNavigation.IdHorarioNavigation.IdSalaNavigation)
                    .Include(s => s.IdReservaNavigation.IdHorarioNavigation.IdHoraNavigation)
                    .Select(s => new SillaReservaDetalleViewModel
                    {
                        IdSillaReserva = s.IdSillaReserva,
                        NumeroSilla = s.NumeroSilla ?? 0,
                        NumeroDocumento = s.IdReservaNavigation.IdUsuarioNavigation.NumeroDocumento ?? "",
                        Nombres = s.IdReservaNavigation.IdUsuarioNavigation.Nombres ?? "",
                        Apellidos = s.IdReservaNavigation.IdUsuarioNavigation.Apellidos ?? "",
                        Correo = s.IdReservaNavigation.IdUsuarioNavigation.Correo ?? "",
                        TituloPelicula = s.IdReservaNavigation != null && s.IdReservaNavigation.IdHorarioNavigation != null && s.IdReservaNavigation.IdHorarioNavigation.IdPeliculaNavigation != null
                            ? s.IdReservaNavigation.IdHorarioNavigation.IdPeliculaNavigation.Titulo ?? ""
                            : "",
                        ImagenPromocionalPelicula = s.IdReservaNavigation != null && s.IdReservaNavigation.IdHorarioNavigation != null && s.IdReservaNavigation.IdHorarioNavigation.IdPeliculaNavigation != null
                            ? s.IdReservaNavigation.IdHorarioNavigation.IdPeliculaNavigation.ImagenPromocional ?? ""
                            : "",
                        NombreSala = s.IdReservaNavigation != null && s.IdReservaNavigation.IdHorarioNavigation != null && s.IdReservaNavigation.IdHorarioNavigation.IdSalaNavigation != null
                            ? s.IdReservaNavigation.IdHorarioNavigation.IdSalaNavigation.NombreSala ?? ""
                            : "",
                        HoraFuncion = s.IdReservaNavigation != null && s.IdReservaNavigation.IdHorarioNavigation != null && s.IdReservaNavigation.IdHorarioNavigation.IdHoraNavigation != null
                            ? DateTime.Today.Add(s.IdReservaNavigation.IdHorarioNavigation.IdHoraNavigation.Hora1 ?? TimeSpan.Zero).ToString("HH:mm:ss")
                            : ""
                    })
                    .ToListAsync();

                return StatusCode(StatusCodes.Status200OK, sillasReserva);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }




        [HttpDelete]
        [Route("EliminarSillasReserva/{idSillaReserva}")]
        public async Task<IActionResult> EliminarSillasReserva(int idSillaReserva)
        {
            try
            {
                // Buscar la silla de reserva por su identificador
                var sillaReserva = await _DBContext.Sillareservas.FindAsync(idSillaReserva);

                // Verificar si la silla de reserva existe
                if (sillaReserva == null)
                {
                    return NotFound($"No se encontró la silla de reserva con el ID {idSillaReserva}");
                }

                // Eliminar la silla de reserva
                _DBContext.Sillareservas.Remove(sillaReserva);
                await _DBContext.SaveChangesAsync();

                return Ok($"La silla de reserva con el ID {idSillaReserva} ha sido eliminada exitosamente");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPut]
        [Route("EditarSillaReserva/{idSillaReserva}")]
        public async Task<IActionResult> EditarSillaReserva(int idSillaReserva, [FromBody] SillaReservaDetalleViewModel sillaReservaActualizada)
        {
            try
            {
                // Buscar la silla de reserva por su identificador
                var sillaReserva = await _DBContext.Sillareservas.FindAsync(idSillaReserva);

                // Verificar si la silla de reserva existe
                if (sillaReserva == null)
                {
                    return NotFound($"No se encontró la silla de reserva con el ID {idSillaReserva}");
                }

                // Actualizar los campos de la silla de reserva con la información proporcionada
                sillaReserva.NumeroSilla = sillaReservaActualizada.NumeroSilla;
                // Actualiza los demás campos según sea necesario

                // Guardar los cambios en la base de datos
                await _DBContext.SaveChangesAsync();

                return Ok($"La silla de reserva con el ID {idSillaReserva} ha sido actualizada exitosamente");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }













    }
}
