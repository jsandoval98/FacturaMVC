using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FacturaMVC.Models.VM
{
    public class Login
    {
        public string Usuario { get; set; }
        public string Password { get; set; }
        public string MensajeValidacion { get; set; }
        public string ReturnUrl { get; set; }
    }
}