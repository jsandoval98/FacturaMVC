using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FacturaMVC.Models.VM
{
    public class Usuario
    {
        public int UsuarioId { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Roles { get; set; }
    }
}