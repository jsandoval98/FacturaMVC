using FacturaMVC.Models.VM;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web.Mvc;
using Utils;

namespace FacturaMVC.Controllers
{
    [Authorize]
    public class FacturaController : BaseController
    {
        public ActionResult Index()
        {

            //if (token != null)
            //    ViewBag.Message = "token=" + token.access_token;
            //else
            //    ViewBag.Message = "no hay token aun";

            return View();
        }

        //[AllowAnonymous]
        public async Task<JsonResult> ListarPagedFacturas(FacturaRequest filtro)
        {
            PagedList<FacturaResponse> pagedlista = null;

            HttpResponseMessage response = await client.PostAsJsonAsync("api/factura/ListarPagedFacturas", filtro);

            //HttpResponseMessage response = await client.GetAsync("api/test/resource1");
            //string frase = await response.Content.ReadAsAsync<string>();

            if (response.IsSuccessStatusCode)
            {
                pagedlista = await response.Content.ReadAsAsync<PagedList<FacturaResponse>>();
            }

            return new JsonResult()
            {
                Data = pagedlista,
                MaxJsonLength = Int32.MaxValue,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        //public async Task<JsonResult> ListarPagedFacturas(FacturaRequest filtro)
        //{
        //    PagedList<FacturaResponse> pagedlista = null;

        //    HttpResponseMessage response = await client.PostAsJsonAsync("api/factura/ListarPagedFacturas", filtro);

        //    if (response.IsSuccessStatusCode)
        //    {
        //        pagedlista = await response.Content.ReadAsAsync<PagedList<FacturaResponse>>();
        //    }

        //    return new JsonResult()
        //    {
        //        Data = pagedlista,
        //        MaxJsonLength = Int32.MaxValue,
        //        JsonRequestBehavior = JsonRequestBehavior.AllowGet
        //    };
        //}

        [Authorize]
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
            List<Mes> lista= Util.ListarMeses();

            return new JsonResult()
            {
                Data = lista,
                MaxJsonLength = Int32.MaxValue,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public JsonResult ListarAnhos()
        {
            List<Anho> lista = Util.ListarAnhos(2015, false);

            return new JsonResult()
            {
                Data = lista,
                MaxJsonLength = Int32.MaxValue,
                JsonRequestBehavior= JsonRequestBehavior.AllowGet
            };
        }
    }
}