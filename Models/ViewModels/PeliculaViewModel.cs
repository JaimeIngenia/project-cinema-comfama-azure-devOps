namespace CinemaComfamaVs5.Models.ViewModels
{
    public class PeliculaViewModel
    {
        public int IdPelicula { get; set; }
        public string Titulo { get; set; }
        public string ImagenPromocional { get; set; }
        public int Duracion { get; set; }
        public double Valor { get; set; }
        public string Sinopsis { get; set; }
        public GeneroViewModel Genero { get; set; }
        public FormatoViewModel Formato { get; set; }
    }
}
