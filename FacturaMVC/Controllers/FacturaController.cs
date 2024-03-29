﻿using FacturaMVC.Models.VM;
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
            return View();
        }

        public ActionResult NuevaFactura()
        {
            return View();
        }

        public ActionResult EditarFactura()
        {
            return View();
        }

        public ActionResult BusquedaOIPs()
        {
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

    }
}