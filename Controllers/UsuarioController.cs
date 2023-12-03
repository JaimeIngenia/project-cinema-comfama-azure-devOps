using CinemaComfamaVs5.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CinemaComfamaVs5.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Microsoft.AspNetCore.Mvc.SuppressModelStateInvalidFilter]
    public class UsuarioController : ControllerBase
    {
        private readonly DBCINEMA3Context _DBContext;
        public UsuarioController(DBCINEMA3Context context)
        {
            _DBContext = context;
        }

        [HttpGet]
        [Route("VerUsuario")]
        public async Task<IActionResult> VerUsuario()
        {
            List<Usuario> lista = await _DBContext.Usuarios.ToListAsync();
            return StatusCode(StatusCodes.Status200OK, lista);
        }

        //Prueba para el login
        [HttpGet("{Correo}/{Contrasena}")]
        [Route("GetIniciarSesion")]
        public ActionResult<List<Usuario>> GetIniciarSesion(string Correo, string Contrasena)
        {
            var usuarios =  _DBContext.Usuarios.Where(usuario => usuario.Correo.Equals(Correo) && usuario.Contrasena.Equals(Contrasena)).ToList();

            if(usuarios == null)
            {
                return NotFound();
            }
            return usuarios;
        }

        [HttpPost]
        [Route("GuardarUsuario")]
        public async Task<IActionResult> GuardarUsuario([FromBody] Usuario request)
        {
            //return StatusCode(StatusCodes.Status200OK, "Hola");
            await _DBContext.Usuarios.AddAsync(request);
            await _DBContext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "OK");
        }

    }
}
