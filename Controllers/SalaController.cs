using CinemaComfamaVs5.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CinemaComfamaVs5.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalaController : ControllerBase
    {
        private readonly DBCINEMA3Context _DBContext;

        public SalaController(DBCINEMA3Context context)
        {
            _DBContext = context;
        }

        [HttpPost]
        [Route("GuardarSala")]
        public async Task<IActionResult> GuardarSala([FromBody] Sala request)
        {
            await _DBContext.Salas.AddAsync(request);
            await _DBContext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "OK");
        }

        //[HttpGet]
        //[Route("VerSala")]
        //public async Task<IActionResult> VerSala()
        //{
        //    List<Sala> lista = await _DBContext.Salas.ToListAsync();
        //    return StatusCode(StatusCodes.Status200OK, lista);
        //}
        [HttpGet]
        [Route("VerSala")]
        public async Task<IActionResult> VerSala()
        {
            List<Sala> lista = await _DBContext.Salas.ToListAsync();
            return StatusCode(StatusCodes.Status200OK, lista);
        }
    }
}