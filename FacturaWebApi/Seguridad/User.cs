using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FacturaWebApi.Seguridad
{
    public class User : IDisposable
    {
        DbComercial context = new DbComercial();

        public Usuario ValidaUsuario(string usuario, string password)
        {
            return context.Usuarios.FirstOrDefault(x => x.Usuario1.Equals(usuario, StringComparison.OrdinalIgnoreCase) && x.Password == password);
        }

        public void Dispose()
        {
            context.Dispose();
        }
    }
}