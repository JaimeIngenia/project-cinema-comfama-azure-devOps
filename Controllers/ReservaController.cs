using CinemaComfamaVs5.Models;
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
                //            .ThenInclude(u => u.IdTipoDocumentoNavigation)
                //            .ThenInclude(u => u.IdTipoRolNavigation)
                .Include(r => r.IdHorarioNavigation.IdHoraNavigation)
                .Select(r => new ReservaDetalleViewModel
                {
                    IdReserva = r.IdReserva,
                    Usuario = new UsuarioViewModel
                    {
                        IdUsuario = r.IdUsuarioNavigation.IdUsuario,
                        IdTipoDocumento = r.IdUsuarioNavigation.IdTipoDocumento ?? 0,
                        //                TipoDocumento = new TipoDocumentoViewModel
                        //                {
                        //                    //IdTipoDocumento = r.IdUsuarioNavigation.IdTipoDocumentoNavigation?.IdTipoDocumento ?? 0,
                        //                    //TipoDocumento1 = r.IdUsuarioNavigation.IdTipoDocumentoNavigation?.TipoDocumento1 ?? ""
                        //                    IdTipoDocumento = r.IdUsuarioNavigation.IdTipoDocumentoNavigation != null ? r.IdUsuarioNavigation.IdTipoDocumentoNavigation.IdTipoDocumento : 0,
                        //                    TipoDocumento1 = r.IdUsuarioNavigation.IdTipoDocumentoNavigation != null ? r.IdUsuarioNavigation.IdTipoDocumentoNavigation.TipoDocumento1 : "",

                        //                },
                        NumeroDocumento = r.IdUsuarioNavigation.NumeroDocumento ?? "",
                        Nombres = r.IdUsuarioNavigation.Nombres ?? "",
                        Apellidos = r.IdUsuarioNavigation.Apellidos ?? "",
                        Correo = r.IdUsuarioNavigation.Correo ?? "",
                        IdTipoRol = r.IdUsuarioNavigation.IdTipoRol ?? 0
                        //                TipoRol = new TipoRolViewModel
                        //                {
                        //                    //IdTipoRol = r.IdUsuarioNavigation.IdTipoRolNavigation?.IdTipoRol ?? 0,
                        //                    //NombreRol = r.IdUsuarioNavigation.IdTipoRolNavigation?.NombreRol ?? ""
                        //                    IdTipoRol = r.IdUsuarioNavigation.IdTipoRolNavigation != null ? r.IdUsuarioNavigation.IdTipoRolNavigation.IdTipoRol : 0,
                        //                    NombreRol = r.IdUsuarioNavigation.IdTipoRolNavigation != null ? r.IdUsuarioNavigation.IdTipoRolNavigation.NombreRol : ""
                        //                },
                    },
                    Horario = new HorarioDetalleViewModel
                    {
                        IdHorario = r.IdHorarioNavigation.IdHorario,
                        Pelicula = new PeliculaViewModel
                        {
                            //IdPelicula = r.IdHorarioNavigation.IdPeliculaNavigation?.IdPelicula ?? 0,
                            //Titulo = r.IdHorarioNavigation.IdPeliculaNavigation?.Titulo ?? "",
                            //ImagenPromocional = r.IdHorarioNavigation.IdPeliculaNavigation?.ImagenPromocional ?? "",
                            IdPelicula = r.IdHorarioNavigation.IdPeliculaNavigation != null ? r.IdHorarioNavigation.IdPeliculaNavigation.IdPelicula : 0,
                            Titulo = r.IdHorarioNavigation.IdPeliculaNavigation != null ? r.IdHorarioNavigation.IdPeliculaNavigation.Titulo : "",
                            ImagenPromocional = r.IdHorarioNavigation.IdPeliculaNavigation != null ? r.IdHorarioNavigation.IdPeliculaNavigation.ImagenPromocional : "",

                            // ... (Resto de las propiedades de PeliculaViewModel)
                        },
                        Sala = new SalaViewModel
                        {
                            //IdSala = r.IdHorarioNavigation.IdSalaNavigation?.IdSala ?? 0,
                            //NombreSala = r.IdHorarioNavigation.IdSalaNavigation?.NombreSala ?? "",
                            //Estado = r.IdHorarioNavigation.IdSalaNavigation?.Estado ?? "",
                            //NumeroSilla = r.IdHorarioNavigation.IdSalaNavigation?.NumeroSilla ?? 0
                            IdSala = r.IdHorarioNavigation.IdSalaNavigation != null ? r.IdHorarioNavigation.IdSalaNavigation.IdSala : 0,
                            NombreSala = r.IdHorarioNavigation.IdSalaNavigation != null ? r.IdHorarioNavigation.IdSalaNavigation.NombreSala : "",
                            Estado = r.IdHorarioNavigation.IdSalaNavigation != null ? r.IdHorarioNavigation.IdSalaNavigation.Estado : "",
                            //NumeroSilla = r.IdHorarioNavigation.IdSalaNavigation != null ? r.IdHorarioNavigation.IdSalaNavigation.NumeroSilla ?? 0 : 0,

                            //NumeroSilla = r.IdHorarioNavigation.IdSalaNavigation != null ? r.IdHorarioNavigation.IdSalaNavigation.NumeroSilla : 0,

                        },
                        Hora = new HoraViewModel
                        {
                            //IdHora = r.IdHorarioNavigation.IdHoraNavigation?.IdHora ?? 0,
                            //Hora1 = r.IdHorarioNavigation.IdHoraNavigation?.Hora1 ?? TimeSpan.Zero
                            IdHora = r.IdHorarioNavigation.IdHoraNavigation != null ? r.IdHorarioNavigation.IdHoraNavigation.IdHora : 0,
                            Hora1 = r.IdHorarioNavigation.IdHoraNavigation != null ? r.IdHorarioNavigation.IdHoraNavigation.Hora1 ?? TimeSpan.Zero : TimeSpan.Zero,

                            //Hora1 = r.IdHorarioNavigation.IdHoraNavigation != null ? r.IdHorarioNavigation.IdHoraNavigation.Hora1 : TimeSpan.Zero,

                        }
                    }
                })
                .ToListAsync();

            return StatusCode(StatusCodes.Status200OK, lista);
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
