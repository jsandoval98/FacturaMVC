using System;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Owin;

[assembly: OwinStartup(typeof(FacturaMVC.Startup))]

namespace FacturaMVC
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // Para obtener más información sobre cómo configurar la aplicación, visite https://go.microsoft.com/fwlink/?LinkID=316888

            app.UseCookieAuthentication(
                new CookieAuthenticationOptions
                {
                    AuthenticationType = "ApplicationCookie",
                    //LoginPath = new PathString("/Seguridad/Login"),
                    LoginPath = new PathString("/Inicio/Index"),
                    CookieName = "micookie",
                    ExpireTimeSpan = TimeSpan.FromSeconds(600),
                    LogoutPath = new PathString("/Inicio/Index")

                }
                );
        }
    }
}
