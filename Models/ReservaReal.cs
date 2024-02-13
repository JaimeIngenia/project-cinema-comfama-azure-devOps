using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CinemaComfamaVs5.Models
{
    public class ReservaReal
    {
        [Key]
        public int IdReservaReal {  get; set; }
        public int? IdUsuario { get; set; }
        public virtual Usuario? IdUsuarioNavegacion { get; set; }
        public int? IdHorario { get; set; }
        public virtual Horario? IdHorarioNavegacion { get; set; }
    }
}
