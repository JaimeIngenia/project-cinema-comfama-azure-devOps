namespace CinemaComfamaVs5.Models.ViewModels
{
    public class SillaReservaViewModel
    {
        public int IdSillaReserva { get; set; }
        public int? NumeroSilla { get; set; }
        public ReservaDetalleViewModel Reserva { get; set; }
    }
}
