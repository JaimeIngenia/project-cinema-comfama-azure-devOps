namespace CinemaComfamaVs5.Models.ViewModels
{
    public class HorarioDetalleViewModel
    {
        public int IdHorario { get; set; }
        public PeliculaViewModel Pelicula { get; set; }
        public SalaViewModel Sala { get; set; }
        public HoraViewModel Hora { get; set; }
    }
}
