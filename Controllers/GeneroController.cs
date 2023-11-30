using CinemaComfamaVs5.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CinemaComfamaVs5.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GeneroController : ControllerBase
    {
        private readonly DBCINEMA3Context _DBContext;

        public GeneroController(DBCINEMA3Context context)
        {
            _DBContext = context;
        }


        [HttpPost]
        [Route("GuardarGenero")]
        public async Task<IActionResult> GuardarGenero([FromBody] Genero request)
        {
            //return StatusCode(StatusCodes.Status200OK, "Hola");
            await _DBContext.Generos.AddAsync(request);
            await _DBContext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "OK");
        }

        [HttpGet]
        [Route("VerGenero")]
        public async Task<IActionResult> Genero()
        {
            List<Genero> lista = _DBContext.Generos.ToList();
            return StatusCode(StatusCodes.Status200OK, lista);
        }

    }
}
