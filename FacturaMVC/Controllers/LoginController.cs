using FacturaMVC.Models.VM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;
using System.Web.Mvc;

namespace FacturaMVC.Controllers
{
    public class LoginController : Controller
    {
        [AllowAnonymous]
        public ActionResult Login()
        {
            return View();
        }

        [AllowAnonymous]
        [HttpPost]
        public ActionResult Login(Login model)
        {
            if (!ModelState.IsValid)
                return View(model);

            //verificar en la base de datos
            /* Usuario usuario = null;*/ // seguridadServices.VerificarUsuario(model.Usuario, model.Password);

            Usuario usuario = new Usuario
            {
                Nombres = "Jorge",
                Apellidos = "Sandoval",
                Login= "jsandoval",
                Email = "jsandoval@pucp.edu.pe",
                UsuarioId = 1,
                Roles = "Admin"
            };

            if (usuario != null)
            {
                //ingreso a la aplicacion
                var claims = new List<Claim>();

                //creando pedazos de información para que se guarden en la cookie de seguridad
                claims.Add(new Claim(ClaimTypes.Name, $"{usuario.Nombres} {usuario.Apellidos}"));
                claims.Add(new Claim(ClaimTypes.NameIdentifier, usuario.Login));
                claims.Add(new Claim(ClaimTypes.Email, usuario.Email));
                claims.Add(new Claim("UsuarioID", usuario.UsuarioId.ToString()));
                string[] roles = usuario.Roles.Split(',');
                foreach (string rol in roles)
                {
                    claims.Add(new Claim(ClaimTypes.Role, rol));
                }

                var identity = new ClaimsIdentity(claims, "ApplicationCookie");
                var context = Request.GetOwinContext();
                var AuthManager = context.Authentication;

                try
                {
                    BaseController.Inicializa();
                }
                catch(Exception ex)
                {

                }

                AuthManager.SignIn(identity);

                return Redirect(model.ReturnUrl ?? "/Factura/Index");
            }
            else
            {
                model.MensajeValidacion = "Usuario no registrado en el sistema";
                return View(model);
            }
        }

        public ActionResult Salir()
        {
            Request.GetOwinContext().Authentication.SignOut();

            return RedirectToAction("Login");
        }

        public ActionResult CambiarContrasena()
        {           
            return View();
        }
    }
}