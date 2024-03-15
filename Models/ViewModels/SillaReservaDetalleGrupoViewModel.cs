namespace CinemaComfamaVs5.Models.ViewModels
{
    public class SillaReservaDetalleGrupoViewModel
    {
        public int IdReserva { get; set; }
        public List<int> NumeroSillas { get; set; }
        public string NumeroDocumento { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string Correo { get; set; }
        public string TituloPelicula { get; set; }
        public string ImagenPromocionalPelicula { get; set; }
        public string NombreSala { get; set; }
        public string HoraFuncion { get; set; }
    }
}
