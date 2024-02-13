namespace CinemaComfamaVs5.Models.ViewModels
{
    public class ReservaRealViewModel
    {
        public int IdUsuario { get; set; }
        public string Nombres { get; set; }
        public string Correo { get; set; }
        public int IdHorario { get; set; }
  
        public string Titulo { get; set; }
        public string ImagenPromocional { get; set; }
        public int IdSala { get; set; }
        public string NombreSala { get; set; }
        public int IdHora { get; set; }
        public TimeSpan? Hora { get; set; }
    }


}
