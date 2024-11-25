using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace proyectobase.Models.Principal.Default
{
    public class LoginViewModel
    {
        [Required(ErrorMessage = "El usuario es requerido!")]
        public string NombreUsuario { get; set; }

        [Required(ErrorMessage = "La contraseña es requerida!")]
        public string Contrasena { get; set; }
    }
}
