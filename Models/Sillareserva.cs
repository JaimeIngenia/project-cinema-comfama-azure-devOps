using System;
using System.Collections.Generic;

namespace CinemaComfamaVs5.Models
{
    public partial class Sillareserva
    {
        public Sillareserva()
        {
            //ReservasReales = new HashSet<ReservaReal>();
        }
        public int IdSillaReserva { get; set; }
        public int? IdReserva { get; set; }
        public int? NumeroSilla { get; set; }

        public virtual Reserva? IdReservaNavigation { get; set; }
        //public virtual ICollection<ReservaReal> ReservasReales { get; set; }
    }
}
