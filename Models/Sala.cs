using System;
using System.Collections.Generic;

namespace CinemaComfamaVs5.Models
{
    public partial class Sala
    {
        public Sala()
        {
            Horarios = new HashSet<Horario>();
        }

        public int IdSala { get; set; }
        public string? NombreSala { get; set; }
        public string? Estado { get; set; }
        public int? NumeroSilla { get; set; }

        public virtual ICollection<Horario> Horarios { get; set; }
    }
}
