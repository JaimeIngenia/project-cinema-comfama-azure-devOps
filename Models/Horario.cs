using System;
using System.Collections.Generic;

namespace CinemaComfamaVs5.Models
{
    public partial class Horario
    {
        public Horario()
        {
            Reservas = new HashSet<Reserva>();
        }

        public int IdHorario { get; set; }
        public int? IdPelicula { get; set; }
        public int? IdSala { get; set; }
        public int? IdHora { get; set; }

        public virtual Hora? IdHoraNavigation { get; set; }
        public virtual Pelicula? IdPeliculaNavigation { get; set; }
        public virtual Sala? IdSalaNavigation { get; set; }
        public virtual ICollection<Reserva> Reservas { get; set; }
    }
}
