namespace CinemaComfamaVs5.Models.ViewModels
{
    //public class ReservaDetalleViewModel
    //{
    //    public int IdReserva { get; set; }
    //    public UsuarioViewModel Usuario { get; set; }
    //    //public int IdHorario { get; set; }
    //    public HorarioViewModel Horario { get; set; }
    //}
    public class ReservaDetalleViewModel
    {
        public int IdReserva { get; set; }
        public UsuarioViewModel Usuario { get; set; }
        public HorarioDetalleViewModel Horario { get; set; }
    }


}
