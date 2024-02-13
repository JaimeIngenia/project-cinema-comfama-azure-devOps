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

        [HttpGet]
        [Route("GetAllReservaRealSuperDetalle")]
        public IActionResult GetAllReservaRealSuperDetalle()
        {
            var reservaRealDetails = _DBContext.ReservasReales
                .Include(r => r.IdUsuarioNavegacion)
                .Select(r => new ReservaRealSuperDetalleViewModel
                {
                    Usuario = new UsuarioViewModel
                    {
                        Nombres = r.IdUsuarioNavegacion.Nombres,
                        Correo = r.IdUsuarioNavegacion.Correo
                    }
                })
                .ToList();

            return Ok(reservaRealDetails);
        }




        //[HttpGet]
        //[Route("GetAllReservaRealProperties")]
        //public IActionResult GetAllReservaRealProperties()
        //{
        //    // Obtener la lista de ReservaReal desde tu contexto de base de datos
        //    var reservaRealList = _DBContext.ReservasReales.ToList();

        //    // Crear una lista de ReservaRealViewModel para almacenar los datos necesarios
        //    var reservaRealViewModelList = new List<ReservaRealViewModel>();

        //    // Iterar a través de la lista de ReservaReal y mapear los datos al ReservaRealViewModel
        //    foreach (var reservaReal in reservaRealList)
        //    {
        //        var reservaRealViewModel = new ReservaRealViewModel
        //        {
        //            IdUsuario = reservaReal.IdUsuarioNavegacion?.IdUsuario ?? 0,
        //            Nombres = reservaReal.IdUsuarioNavegacion?.Nombres ?? "",
        //            Correo = reservaReal.IdUsuarioNavegacion?.Correo ?? ""
        //        };

        //        // Agregar el objeto ReservaRealViewModel a la lista
        //        reservaRealViewModelList.Add(reservaRealViewModel);
        //    }

        //    // Devolver la lista de ReservaRealViewModel
        //    return Ok(reservaRealViewModelList);
        //}


        //[HttpGet]
        //[Route("GetAllReservaRealProperties")]
        //public async Task<IActionResult> GetAllReservaRealProperties()
        //{
        //    List<ReservaRealViewModel> lista = await _DBContext.ReservasReales
        //        .Include(s => s.IdUsuarioNavegacion)
        //        .Select(s => new ReservaRealViewModel
        //        {
        //            Nombres = s.Nombres,
        //            Correo = s.Correo,

        //        })
        //        .ToListAsync();

        //    return StatusCode(StatusCodes.Status200OK, lista);
        //}


        [HttpGet]
        [Route("GetAllReservaRealProperties")]
        public async Task<IActionResult> GetAllReservaRealProperties()
        {
            List<ReservaRealViewModel> lista = await _DBContext.ReservasReales
                .Include(rr => rr.IdUsuarioNavegacion)
                .Include(rr => rr.IdHorarioNavegacion)
                    .ThenInclude(h => h.IdSalaNavigation)
                .Include(rr => rr.IdHorarioNavegacion)
                    .ThenInclude(h => h.IdHoraNavigation) // Incluye la entidad Hora
                .Include(rr => rr.IdHorarioNavegacion)
                    .ThenInclude(h => h.IdPeliculaNavigation)
                .Select(rr => new ReservaRealViewModel
                {
                    IdUsuario = rr.IdUsuarioNavegacion.IdUsuario,
                    Nombres = rr.IdUsuarioNavegacion.Nombres,
                    Correo = rr.IdUsuarioNavegacion.Correo,
                    IdHorario = rr.IdHorarioNavegacion.IdHorario,
                    Titulo = rr.IdHorarioNavegacion.IdPeliculaNavigation.Titulo,
                    ImagenPromocional = rr.IdHorarioNavegacion.IdPeliculaNavigation.ImagenPromocional,
                    IdSala = rr.IdHorarioNavegacion.IdSala ?? 0,
                    NombreSala = rr.IdHorarioNavegacion.IdSalaNavigation.NombreSala ?? "Sin Sala",
                    IdHora = rr.IdHorarioNavegacion.IdHora ?? 0,
                    Hora = rr.IdHorarioNavegacion.IdHoraNavigation.Hora1// Nueva propiedad
                })
                .ToListAsync();

            return StatusCode(StatusCodes.Status200OK, lista);
        }


        //[HttpGet]
        //[Route("GetAllReservaRealProperties")]
        //public async Task<IActionResult> GetAllReservaRealProperties()
        //{
        //    List<ReservaRealViewModel> lista = await _DBContext.ReservasReales
        //        .Include(rr => rr.IdUsuarioNavegacion)
        //        .Include(rr => rr.IdHorarioNavegacion)
        //            .ThenInclude(h => h.IdSalaNavigation)
        //        .Include(rr => rr.IdHorarioNavegacion)
        //            .ThenInclude(h => h.IdHoraNavigation)
        //        .Include(rr => rr.IdHorarioNavegacion)
        //            .ThenInclude(h => h.IdPeliculaNavigation)
        //        .Select(rr => new ReservaRealViewModel
        //        {
        //            IdUsuario = rr.IdUsuarioNavegacion.IdUsuario,
        //            Nombres = rr.IdUsuarioNavegacion.Nombres,
        //            Correo = rr.IdUsuarioNavegacion.Correo,
        //            IdHorario = rr.IdHorarioNavegacion.IdHorario,
        //            Titulo = rr.IdHorarioNavegacion.IdPeliculaNavigation.Titulo,
        //            ImagenPromocional = rr.IdHorarioNavegacion.IdPeliculaNavigation.ImagenPromocional,
        //            IdSala = rr.IdHorarioNavegacion.IdSala ?? 0,
        //            NombreSala = rr.IdHorarioNavegacion.IdSalaNavigation.NombreSala ?? "Sin Sala", // Manejo de valores nulos
        //            IdHora = rr.IdHorarioNavegacion.IdHora ?? 0
        //        })
        //        .ToListAsync();

        //    return StatusCode(StatusCodes.Status200OK, lista);
        //}


        //[HttpGet]
        //[Route("GetAllReservaRealProperties")]
        //public async Task<IActionResult> GetAllReservaRealProperties()
        //{
        //    List<ReservaRealViewModel> lista = await _DBContext.ReservasReales
        //        .Include(rr => rr.IdUsuarioNavegacion)
        //        .Include(rr => rr.IdHorarioNavegacion)
        //            .ThenInclude(h => h.IdSalaNavigation)
        //        .Include(rr => rr.IdHorarioNavegacion)
        //            .ThenInclude(h => h.IdHoraNavigation)
        //        .Include(rr => rr.IdHorarioNavegacion)
        //            .ThenInclude(h => h.IdPeliculaNavigation)
        //        .Select(rr => new ReservaRealViewModel
        //        {

        //            IdUsuario = rr.IdUsuarioNavegacion.IdUsuario,
        //            Nombres = rr.IdUsuarioNavegacion.Nombres,
        //            Correo = rr.IdUsuarioNavegacion.Correo,
        //            IdHorario = rr.IdHorarioNavegacion.IdHorario,
        //            Titulo = rr.IdHorarioNavegacion.IdPeliculaNavigation.Titulo,
        //            ImagenPromocional = rr.IdHorarioNavegacion.IdPeliculaNavigation.ImagenPromocional,
        //            //IdSala = rr.IdHorarioNavegacion.IdSala,
        //            //IdHora = rr.IdHorarioNavegacion.IdHora
        //            IdSala = rr.IdHorarioNavegacion.IdSala ?? 0, // Manejo de valores nulos
        //            IdHora = rr.IdHorarioNavegacion.IdHora ?? 0 // Manejo de valores nulos
        //        })
        //        .ToListAsync();

        //    return StatusCode(StatusCodes.Status200OK, lista);
        //}





        //[HttpGet]
        //[Route("GetAllReservaRealProperties")]
        //public async Task<IActionResult> GetAllReservaRealProperties()
        //{
        //    List<ReservaRealViewModel> lista = await _DBContext.ReservasReales
        //        .Include(rr => rr.IdUsuarioNavegacion)
        //        .Include(rr => rr.IdHorarioNavegacion)
        //        .Select(rr => new ReservaRealViewModel
        //        {
        //            IdUsuario = rr.IdUsuarioNavegacion.IdUsuario,
        //            Nombres = rr.IdUsuarioNavegacion.Nombres,
        //            Correo = rr.IdUsuarioNavegacion.Correo,
        //        })
        //        .ToListAsync();

        //    return StatusCode(StatusCodes.Status200OK, lista);
        //}







    }
}
