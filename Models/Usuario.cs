using System;
using System.Collections.Generic;

namespace CinemaComfamaVs5.Models
{
    public partial class Usuario
    {
        public Usuario()
        {
            Reservas = new HashSet<Reserva>();
        }

        public int IdUsuario { get; set; }
        public int? IdTipoDocumento { get; set; }
        public string? NumeroDocumento { get; set; }
        public string? Nombres { get; set; }
        public string? Apellidos { get; set; }
        public string? Correo { get; set; }
        public string? Contrasena { get; set; }

        public virtual Tipodocumento? IdTipoDocumentoNavigation { get; set; }
        public virtual TipoRol? IdTipoRolNavigation { get; set; }
        public virtual ICollection<Reserva> Reservas { get; set; }

        public int? IdTipoRol { get; set; }

    }
}
