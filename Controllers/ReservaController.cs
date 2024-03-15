<<<<<<< HEAD
﻿using CinemaComfamaVs5.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CinemaComfamaVs5.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservaController : ControllerBase
    {
        private readonly DBCINEMA3Context _context;
        public ReservaController(DBCINEMA3Context context)
        {
            _context = context;
        }


        // GET: api/Reservas
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Reserva>>> GetReservas()
        //{
        //    return await _context.Reservas.ToListAsync();
        //}
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Reserva>>> GetReservas()
        {
            var reservas = await _context.Reservas
                .Include(r => r.IdUsuarioNavigation) // Incluye la información de Usuario
                //.Include(r => r.IdHorarioNavigation) // Incluye la información de Horario
                .ToListAsync();

            return reservas;
        }

        // GET: api/Reservas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Reserva>> GetReserva(int id)
        {
            var reserva = await _context.Reservas.FindAsync(id);

            if (reserva == null)
            {
                return NotFound();
            }

            return reserva;
        }

        // POST: api/Reservas
        [HttpPost]
        public async Task<ActionResult<Reserva>> PostReserva(Reserva reserva)
        {
            _context.Reservas.Add(reserva);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReserva", new { id = reserva.IdReserva }, reserva);
        }

        // PUT: api/Reservas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReserva(int id, Reserva reserva)
        {
            if (id != reserva.IdReserva)
            {
                return BadRequest();
            }

            _context.Entry(reserva).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReservaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Reservas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReserva(int id)
        {
            var reserva = await _context.Reservas.FindAsync(id);
            if (reserva == null)
            {
                return NotFound();
            }

            _context.Reservas.Remove(reserva);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ReservaExists(int id)
        {
            return _context.Reservas.Any(e => e.IdReserva == id);
        }


    }
}
=======
﻿using CinemaComfamaVs5.Models;
using CinemaComfamaVs5.Models.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CinemaComfamaVs5.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservaController : ControllerBase
    {
        private readonly DBCINEMA3Context _DBContext;

        public ReservaController(DBCINEMA3Context context)
        {
            
            _DBContext = context;

        }

        [HttpPost]
        [Route("GuardarReserva")]
        public async Task<IActionResult> GuardarReserva([FromBody] Reserva request)
        {
            await _DBContext.Reservas.AddAsync(request);
            await _DBContext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "OK");
        }

        //[HttpGet]
        //[Route("VerReserva")]
        //public async Task<IActionResult> VerReserva()
        //{
        //    List<Reserva> lista = await _DBContext.Reservas.ToListAsync();
        //    return StatusCode(StatusCodes.Status200OK, lista);
        //}

        //[HttpGet]
        //[Route("VerReserva")]
        //public async Task<IActionResult> VerReserva()
        //{
        //    List<ReservaDetalleViewModel> lista = await _DBContext.Reservas
        //        .Include(r => r.IdUsuarioNavigation)  // Incluye la relación con Usuario
        //        .Select(r => new ReservaDetalleViewModel
        //        {
        //            IdReserva = r.IdReserva,
        //            Usuario = new UsuarioViewModel
        //            {
        //                IdUsuario = r.IdUsuarioNavigation.IdUsuario,
        //                IdTipoDocumento = r.IdUsuarioNavigation.IdTipoDocumento ?? 0,
        //                NumeroDocumento = r.IdUsuarioNavigation.NumeroDocumento ?? "",
        //                Nombres = r.IdUsuarioNavigation.Nombres ?? "",
        //                Apellidos = r.IdUsuarioNavigation.Apellidos ?? "",
        //                Correo = r.IdUsuarioNavigation.Correo ?? "",
        //                IdTipoRol = r.IdUsuarioNavigation.IdTipoRol ?? 0
        //            },
        //            IdHorario = r.IdHorario ?? 0
        //        })
        //        .ToListAsync();

        //    return StatusCode(StatusCodes.Status200OK, lista);
        //}


        [HttpGet]
        [Route("VerReserva")]
        public async Task<IActionResult> VerReserva()
        {
            List<ReservaDetalleViewModel> lista = await _DBContext.Reservas
                .Include(r => r.IdUsuarioNavigation)
                .Include(r => r.IdHorarioNavigation.IdPeliculaNavigation)
                .Include(r => r.IdHorarioNavigation.IdSalaNavigation)
                .Include(r => r.IdHorarioNavigation.IdHoraNavigation)
                .Select(r => new ReservaDetalleViewModel
                {
                    IdReserva = r.IdReserva,
                    Usuario = new UsuarioViewModel
                    {
                        IdUsuario = r.IdUsuarioNavigation.IdUsuario,
                        IdTipoDocumento = r.IdUsuarioNavigation.IdTipoDocumento ?? 0,
        
                        NumeroDocumento = r.IdUsuarioNavigation.NumeroDocumento ?? "",
                        Nombres = r.IdUsuarioNavigation.Nombres ?? "",
                        Apellidos = r.IdUsuarioNavigation.Apellidos ?? "",
                        Correo = r.IdUsuarioNavigation.Correo ?? "",
                        IdTipoRol = r.IdUsuarioNavigation.IdTipoRol ?? 0
   
                    },
                    Horario = new HorarioDetalleViewModel
                    {
                        IdHorario = r.IdHorarioNavigation.IdHorario,
                        Pelicula = new PeliculaViewModel
                        {
                       
                            IdPelicula = r.IdHorarioNavigation.IdPeliculaNavigation != null ? r.IdHorarioNavigation.IdPeliculaNavigation.IdPelicula : 0,
                            Titulo = r.IdHorarioNavigation.IdPeliculaNavigation != null ? r.IdHorarioNavigation.IdPeliculaNavigation.Titulo : "",
                            ImagenPromocional = r.IdHorarioNavigation.IdPeliculaNavigation != null ? r.IdHorarioNavigation.IdPeliculaNavigation.ImagenPromocional : "",

                            
                        },
                        Sala = new SalaViewModel
                        {
                            
                            IdSala = r.IdHorarioNavigation.IdSalaNavigation != null ? r.IdHorarioNavigation.IdSalaNavigation.IdSala : 0,
                            NombreSala = r.IdHorarioNavigation.IdSalaNavigation != null ? r.IdHorarioNavigation.IdSalaNavigation.NombreSala : "",
                            Estado = r.IdHorarioNavigation.IdSalaNavigation != null ? r.IdHorarioNavigation.IdSalaNavigation.Estado : "",
  

                        },
                        Hora = new HoraViewModel
                        {
                  
                            IdHora = r.IdHorarioNavigation.IdHoraNavigation != null ? r.IdHorarioNavigation.IdHoraNavigation.IdHora : 0,
                            Hora1 = r.IdHorarioNavigation.IdHoraNavigation != null ? r.IdHorarioNavigation.IdHoraNavigation.Hora1 ?? TimeSpan.Zero : TimeSpan.Zero,


                        }
                    }
                })
                .ToListAsync();

            return StatusCode(StatusCodes.Status200OK, lista);
        }

        [HttpGet]
        [Route("VerUltimaReserva")]
        public async Task<IActionResult> VerUltimaReserva()
        {
            // Obtener la última reserva basada en el identificador único.
            var ultimaReserva = await _DBContext.Reservas
                .Include(r => r.IdUsuarioNavigation)
                .Include(r => r.IdHorarioNavigation.IdPeliculaNavigation)
                .Include(r => r.IdHorarioNavigation.IdSalaNavigation)
                .Include(r => r.IdHorarioNavigation.IdHoraNavigation)
                .OrderByDescending(r => r.IdReserva)
                .FirstOrDefaultAsync();

            if (ultimaReserva == null)
            {
                // Puedes ajustar el código de respuesta según tus necesidades.
                return NotFound("No se encontraron reservas.");
            }

            var ultimaReservaViewModel = new ReservaDetalleViewModel
            {
                IdReserva = ultimaReserva.IdReserva,
                Usuario = new UsuarioViewModel
                {
                    IdUsuario = ultimaReserva.IdUsuarioNavigation.IdUsuario,
                    IdTipoDocumento = ultimaReserva.IdUsuarioNavigation.IdTipoDocumento ?? 0,
                    NumeroDocumento = ultimaReserva.IdUsuarioNavigation.NumeroDocumento ?? "",
                    Nombres = ultimaReserva.IdUsuarioNavigation.Nombres ?? "",
                    Apellidos = ultimaReserva.IdUsuarioNavigation.Apellidos ?? "",
                    Correo = ultimaReserva.IdUsuarioNavigation.Correo ?? "",
                    IdTipoRol = ultimaReserva.IdUsuarioNavigation.IdTipoRol ?? 0
                },
                Horario = new HorarioDetalleViewModel
                {
                    IdHorario = ultimaReserva.IdHorarioNavigation.IdHorario,
                    Pelicula = new PeliculaViewModel
                    {
                        IdPelicula = ultimaReserva.IdHorarioNavigation.IdPeliculaNavigation != null ? ultimaReserva.IdHorarioNavigation.IdPeliculaNavigation.IdPelicula : 0,
                        Titulo = ultimaReserva.IdHorarioNavigation.IdPeliculaNavigation != null ? ultimaReserva.IdHorarioNavigation.IdPeliculaNavigation.Titulo : "",
                        ImagenPromocional = ultimaReserva.IdHorarioNavigation.IdPeliculaNavigation != null ? ultimaReserva.IdHorarioNavigation.IdPeliculaNavigation.ImagenPromocional : ""
                    },
                    Sala = new SalaViewModel
                    {
                        IdSala = ultimaReserva.IdHorarioNavigation.IdSalaNavigation != null ? ultimaReserva.IdHorarioNavigation.IdSalaNavigation.IdSala : 0,
                        NombreSala = ultimaReserva.IdHorarioNavigation.IdSalaNavigation != null ? ultimaReserva.IdHorarioNavigation.IdSalaNavigation.NombreSala : "",
                        Estado = ultimaReserva.IdHorarioNavigation.IdSalaNavigation != null ? ultimaReserva.IdHorarioNavigation.IdSalaNavigation.Estado : ""
                    },
                    Hora = new HoraViewModel
                    {
                        IdHora = ultimaReserva.IdHorarioNavigation.IdHoraNavigation != null ? ultimaReserva.IdHorarioNavigation.IdHoraNavigation.IdHora : 0,
                        Hora1 = ultimaReserva.IdHorarioNavigation.IdHoraNavigation != null ? ultimaReserva.IdHorarioNavigation.IdHoraNavigation.Hora1 ?? TimeSpan.Zero : TimeSpan.Zero
                    }
                }
            };

            return StatusCode(StatusCodes.Status200OK, ultimaReservaViewModel);
        }


        [HttpGet]
        [Route("VerUltimaReservaId")]
        public async Task<IActionResult> VerUltimaReservaId()
        {
            // Obtener el Id de la última reserva basada en el identificador único.
            var idUltimaReserva = await _DBContext.Reservas
                .OrderByDescending(r => r.IdReserva)
                .Select(r => r.IdReserva)
                .FirstOrDefaultAsync();

            if (idUltimaReserva == 0)
            {
                // Puedes ajustar el código de respuesta según tus necesidades.
                return NotFound("No se encontraron reservas.");
            }

            return StatusCode(StatusCodes.Status200OK, idUltimaReserva);
        }
        //**********************************************

        //[HttpGet]
        //[Route("VerReserva")]
        //public async Task<IActionResult> VerReserva()
        //{
        //    List<ReservaDetalleViewModel> lista = await _DBContext.Reservas
        //        .Include(r => r.IdUsuarioNavigation)
        //            .ThenInclude(u => u.IdTipoDocumentoNavigation)
        //        .Include(r => r.IdUsuarioNavigation)
        //            .ThenInclude(u => u.IdTipoRolNavigation)
        //        .Include(r => r.IdHorarioNavigation.IdPeliculaNavigation)
        //        .Include(r => r.IdHorarioNavigation.IdSalaNavigation)
        //        .Include(r => r.IdHorarioNavigation.IdHoraNavigation)
        //        .Select(r => new ReservaDetalleViewModel
        //        {
        //            IdReserva = r.IdReserva,
        //            Usuario = new UsuarioViewModel
        //            {
        //                IdUsuario = r.IdUsuarioNavigation.IdUsuario,
        //                TipoDocumento = new TipoDocumentoViewModel
        //                {
        //                    //IdTipoDocumento = r.IdUsuarioNavigation.IdTipoDocumentoNavigation?.IdTipoDocumento ?? 0,
        //                    //TipoDocumento1 = r.IdUsuarioNavigation.IdTipoDocumentoNavigation?.TipoDocumento1 ?? ""
        //                    IdTipoDocumento = r.IdUsuarioNavigation.IdTipoDocumentoNavigation != null ? r.IdUsuarioNavigation.IdTipoDocumentoNavigation.IdTipoDocumento : 0,
        //                    TipoDocumento1 = r.IdUsuarioNavigation.IdTipoDocumentoNavigation != null ? r.IdUsuarioNavigation.IdTipoDocumentoNavigation.TipoDocumento1 : "",

        //                },
        //                IdTipoDocumento = r.IdUsuarioNavigation.IdTipoDocumento ?? 0,
        //                NumeroDocumento = r.IdUsuarioNavigation.NumeroDocumento ?? "",
        //                Nombres = r.IdUsuarioNavigation.Nombres ?? "",
        //                Apellidos = r.IdUsuarioNavigation.Apellidos ?? "",
        //                Correo = r.IdUsuarioNavigation.Correo ?? "",
        //                Contrasena = r.IdUsuarioNavigation.Contrasena ?? "",
        //                TipoRol = new TipoRolViewModel
        //                {
        //                    //IdTipoRol = r.IdUsuarioNavigation.IdTipoRolNavigation?.IdTipoRol ?? 0,
        //                    //NombreRol = r.IdUsuarioNavigation.IdTipoRolNavigation?.NombreRol ?? ""
        //                    IdTipoRol = r.IdUsuarioNavigation.IdTipoRolNavigation != null ? r.IdUsuarioNavigation.IdTipoRolNavigation.IdTipoRol : 0,
        //                    NombreRol = r.IdUsuarioNavigation.IdTipoRolNavigation != null ? r.IdUsuarioNavigation.IdTipoRolNavigation.NombreRol : ""
        //                },
        //                IdTipoRol = r.IdUsuarioNavigation.IdTipoRol ?? 0
        //            },
        //            Horario = new HorarioDetalleViewModel
        //            {
        //                // ... (Resto de las propiedades del horario)
        //            }
        //        })
        //        .ToListAsync();

        //    return StatusCode(StatusCodes.Status200OK, lista);
        //}


    }
}
>>>>>>> master
