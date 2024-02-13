namespace CinemaComfamaVs5.Models.ViewModels
{
    public class ReservaRealListaViewModel
    {
        public int? IdUsuario { get; set; }
        public int? IdHorario { get; set; }

        public List<int> NumeroSillasReserva { get; set; }
    }
}
