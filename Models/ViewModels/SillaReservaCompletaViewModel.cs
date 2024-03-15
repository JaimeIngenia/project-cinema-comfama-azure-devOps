namespace CinemaComfamaVs5.Models.ViewModels
{
    public class SillaReservaCompletaViewModel
    {
        public int IdReserva { get; set; }
        public List<int> NumeroSillas { get; set; }
        public ReservaDetalleViewModel ReservaDetalle { get; set; }
    }
}
