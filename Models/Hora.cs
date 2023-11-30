using System;
using System.Collections.Generic;

namespace CinemaComfamaVs5.Models
{
    public partial class Hora
    {
        public Hora()
        {
            Horarios = new HashSet<Horario>();
        }

        public int IdHora { get; set; }
        public TimeSpan? Hora1 { get; set; }

        public virtual ICollection<Horario> Horarios { get; set; }
    }
}
