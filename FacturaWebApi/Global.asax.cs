using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Routing;

namespace FacturaWebApi
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
        }

        protected void Application_BeginRequest()
        {
            //CultureInfo cInf = new CultureInfo("es-PE", true);
            //// NOTE: change the culture name en-ZA to whatever culture suits your needs

            ////cInf.DateTimeFormat.DateSeparator = "/";
            ////cInf.DateTimeFormat.ShortDatePattern = "dd/MM/yyyy";
            ////cInf.DateTimeFormat.LongDatePattern = "dd/MM/yyyy hh:mm:ss tt";

            //System.Threading.Thread.CurrentThread.CurrentCulture = cInf;
            //System.Threading.Thread.CurrentThread.CurrentUICulture = cInf;
        }
    }
}
