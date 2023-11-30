using System;
using System.Collections.Generic;

namespace CinemaComfamaVs5.Models
{
    public partial class Sillareserva
    {
        public int IdSillaReserva { get; set; }
        public int? IdReserva { get; set; }
        public int? NumeroSilla { get; set; }

        public virtual Reserva? IdReservaNavigation { get; set; }
    }
}
