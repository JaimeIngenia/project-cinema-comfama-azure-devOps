using CinemaComfamaVs5.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CinemaComfamaVs5.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoDocumentoController : ControllerBase
    {
        private readonly DBCINEMA3Context _DBContext;

        public TipoDocumentoController(DBCINEMA3Context context)
        {
            _DBContext = context;
        }

        [HttpGet]
        [Route("VerTipoDocumento")]
        public async Task<IActionResult> VerTipoDocumento()
        {
            List<Tipodocumento> lista = await _DBContext.Tipodocumentos.ToListAsync();
            return StatusCode(StatusCodes.Status200OK, lista);
        }
    }
}
