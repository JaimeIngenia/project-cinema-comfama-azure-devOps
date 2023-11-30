using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace CinemaComfamaVs5.Models
{
    public partial class Genero
    {
        public Genero()
        {
            Peliculas = new HashSet<Pelicula>();
        }

        public int IdGenero { get; set; }
        public string? NombreGenero { get; set; }
        [JsonIgnore]
        public virtual ICollection<Pelicula> Peliculas { get; set; }
    }
}
