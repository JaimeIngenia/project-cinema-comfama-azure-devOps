namespace CinemaComfamaVs5.Models.ViewModels
{
    //public class UsuarioViewModel
    //{
    //    public int IdUsuario { get; set; }
    //    public int IdTipoDocumento { get; set; }
    //    public string NumeroDocumento { get; set; }
    //    public string Nombres { get; set; }
    //    public string Apellidos { get; set; }
    //    public string Correo { get; set; }
    //    public int IdTipoRol { get; set; }
    //}
    public class UsuarioViewModel
    {
        public int IdUsuario { get; set; }
        public TipoDocumentoViewModel TipoDocumento { get; set; }
        public int IdTipoDocumento { get; set; }
        public string NumeroDocumento { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string Correo { get; set; }
        public string Contrasena { get; set; }
        public TipoRolViewModel TipoRol { get; set; }
        public int IdTipoRol { get; set; }
    }

}
