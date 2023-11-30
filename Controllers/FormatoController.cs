using CinemaComfamaVs5.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CinemaComfamaVs5.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FormatoController : ControllerBase
    {
        private readonly DBCINEMA3Context _DBContext;

        public FormatoController(DBCINEMA3Context context)
        {
            _DBContext = context;
        }

        [HttpGet]
        [Route("VerFormato")]
        public async Task<IActionResult> Formato()
        {
            List<Formato> lista = _DBContext.Formatos.ToList();
            return StatusCode(StatusCodes.Status200OK, lista);
        }
    }



}
