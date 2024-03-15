using CinemaComfamaVs5.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CinemaComfamaVs5.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HoraController : ControllerBase
    {
        private readonly DBCINEMA3Context _DBContext;

        public HoraController(DBCINEMA3Context context)
        {
            _DBContext = context;
        }


        [HttpPost]
        [Route("GuardarHora")]
        public async Task<IActionResult> GuardarHora([FromBody] Hora request)
        {
            await _DBContext.Horas.AddAsync(request);
            await _DBContext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "OK");
        }

        [HttpGet]
        [Route("VerHoras")]
        public async Task<IActionResult> VerHora()
        {
            List<Hora> lista = await _DBContext.Horas.ToListAsync();
            return StatusCode(StatusCodes.Status200OK, lista);
        }
    }
}
