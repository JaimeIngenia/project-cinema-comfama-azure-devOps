using System;
using System.Collections.Generic;

namespace CinemaComfamaVs5.Models
{
    public partial class Reserva
    {
        public Reserva()
        {
            Sillareservas = new HashSet<Sillareserva>();
        }

        public int IdReserva { get; set; }
        public int? IdUsuario { get; set; }
        public int? IdHorario { get; set; }

        public virtual Horario? IdHorarioNavigation { get; set; }
        public virtual Usuario? IdUsuarioNavigation { get; set; }
        public virtual ICollection<Sillareserva> Sillareservas { get; set; }
    }
}
