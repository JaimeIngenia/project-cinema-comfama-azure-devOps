using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace CinemaComfamaVs5.Models
{
    public partial class Formato
    {
        public Formato()
        {
            Peliculas = new HashSet<Pelicula>();
        }

        public int IdFormato { get; set; }
        public string? NombreFormato { get; set; }
        [JsonIgnore]
        public virtual ICollection<Pelicula> Peliculas { get; set; }
    }
}
