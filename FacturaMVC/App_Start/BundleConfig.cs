﻿using System.Web;
using System.Web.Optimization;

namespace FacturaMVC
{
    public class BundleConfig
    {
        // Para obtener más información sobre las uniones, visite https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(                                        
                        "~/Scripts/jstextbox.js",
                        "~/Scripts/jswindow.js",
                        "~/Scripts/jscombobox.js",
                        "~/Scripts/jsgrid.js",                        
                        "~/Scripts/jquery-{version}.js",
                        "~/Scripts/jquery-ui.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Utilice la versión de desarrollo de Modernizr para desarrollar y obtener información. De este modo, estará
            // para la producción, use la herramienta de compilación disponible en https://modernizr.com para seleccionar solo las pruebas que necesite.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                                             //"~/Content/bootstrap.css",
                                             "~/Content/jquery-ui.css",
                                             "~/Content/jsgrid.css",
                       "~/Content/jswindow.css",
                      "~/Content/site.css"));
        }
    }
}
