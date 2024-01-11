namespace CinemaComfamaVs5.Models
{
    public partial class TipoRol
    {
        public TipoRol()
        {
            Usuarios = new HashSet<Usuario>();
        }

        public int IdTipoRol { get; set; }
        public string NombreRol { get; set; }

        public virtual ICollection<Usuario> Usuarios { get; set; }
    }
}
