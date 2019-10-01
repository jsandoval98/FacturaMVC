using FacturaMVC.Models.VM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Utils;

namespace FacturaMVC.Controllers
{
    public class ComboController : BaseController
    {
        public async Task<JsonResult> ListarConceptos()
        {
            List<ConceptoFactura> lista = null;

            HttpResponseMessage response = await client.GetAsync("api/factura/ListarConceptos");

            if (response.IsSuccessStatusCode)
            {
                lista = await response.Content.ReadAsAsync<List<ConceptoFactura>>();
            }

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListarMeses()
        {
            List<Mes> lista = Util.ListarMeses();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListarAnhos()
        {
            List<Anho> lista = Util.ListarAnhos(2015, false);

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListarTiposMonedas()
        {
            List<TipoMoneda> lista = Util.ListarTiposMonedas();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

    }
}