
using FacturaWebApi.Models.Base;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace FacturaWebApi.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    //[Authorize]
    public class FacturaController : ApiController
    {
        DbComercial context;

        public FacturaController()
        {
            context = new DbComercial();

            //CultureInfo.DefaultThreadCurrentCulture = CultureInfo.InvariantCulture;
            //CultureInfo.DefaultThreadCurrentUICulture = CultureInfo.InvariantCulture;

            CultureInfo.DefaultThreadCurrentCulture = new CultureInfo("es-PE");
            CultureInfo.DefaultThreadCurrentUICulture = new CultureInfo("es-PE");

        }

        [HttpPost]
        public IHttpActionResult ListarFacturas(Factura filtro)
        {
            //var context = new DbComercial();

            var source = (from f in context.Facturas
                          join c in context.Clientes on f.ClienteId equals c.ClienteId
                          join x in context.ConceptoFacturas on f.ConceptoId equals x.ConceptoId
                          join u in context.Usuarios on f.UsuarioRegistroId equals u.UsuarioId
                          join m in context.TipoMonedas on f.TipoMonedaId equals m.TipoMonedaId
                          join e in context.EstadoFacturas on f.EstadoId equals e.EstadoFacturaId
                          select new FacturaResponse
                          {
                              Numero = f.Numero,
                              ConceptoId = f.ConceptoId,
                              Concepto = x.Nombre,
                              ClienteId = f.ClienteId,
                              Cliente = c.RazonSocial,
                              dFechaEmision = f.FechaEmision,
                              TipoMonedaId = f.TipoMonedaId,
                              TipoMoneda= m.Nombre,
                              MontoTotal = f.MontoTotal,
                              EstadoId= f.EstadoId,
                              Estado= e.Nombre,
                              dFechaRegistro= f.FechaRegistro,
                              MontoIGV = f.MontoIGV,
                              Mes = f.Mes,
                              Ano = f.Ano
                          }).OrderByDescending(a => a.dFechaEmision).AsQueryable();


            if (filtro != null)
            {
                source= source.Where(p=> ((filtro.Numero == 0) || (filtro.Numero != 0  && p.Numero == filtro.Numero)));
                source = source.Where(p => ((filtro.ConceptoId == 0) || (filtro.ConceptoId != 0 && p.ConceptoId == filtro.ConceptoId)));
                source = source.Where(p => ((filtro.ClienteId == 0) || (filtro.ClienteId != 0 && p.ClienteId == filtro.ClienteId)));
                source = source.Where(p => ((filtro.EstadoId == 0) || (filtro.EstadoId != 0 && p.EstadoId == filtro.EstadoId)));
                source = source.Where(p => ((filtro.Mes == 0) || (filtro.Mes != 0 && p.Mes == filtro.Mes)));
                source = source.Where(p => ((filtro.Ano == 0) || (filtro.Ano != 0 && p.Ano == filtro.Ano)));
            }

            int TotalRows = source.Count();

            List<FacturaResponse> facturas = source.ToList<FacturaResponse>();

            return Ok(new PagedList<FacturaResponse>(facturas, TotalRows));

        }

        [HttpPost]
        public IHttpActionResult ListarPagedFacturas(FacturaRequest filtro)
        {
            if(filtro == null)            
                return BadRequest();
            

            var context = new DbComercial();

            var source = (from f in context.Facturas
                          join c in context.Clientes on f.ClienteId equals c.ClienteId
                          join x in context.ConceptoFacturas on f.ConceptoId equals x.ConceptoId
                          join u in context.Usuarios on f.UsuarioRegistroId equals u.UsuarioId
                          join m in context.TipoMonedas on f.TipoMonedaId equals m.TipoMonedaId
                          join e in context.EstadoFacturas on f.EstadoId equals e.EstadoFacturaId
                          select new FacturaResponse
                          {
                              Numero = f.Numero,
                              ConceptoId = f.ConceptoId,
                              Concepto = x.Nombre,
                              ClienteId = f.ClienteId,
                              Cliente = c.RazonSocial,
                              dFechaEmision = f.FechaEmision,
                              TipoMonedaId = f.TipoMonedaId,
                              TipoMoneda = m.Nombre,
                              MontoTotal = f.MontoTotal,
                              EstadoId = f.EstadoId,
                              Estado = e.Nombre,
                              dFechaRegistro = f.FechaRegistro,
                              MontoIGV = f.MontoIGV,
                              Mes = f.Mes,
                              Ano = f.Ano
                          }).OrderByDescending(a => a.dFechaEmision).AsQueryable();


            source = source.Where(p => ((filtro.Numero == 0) || (filtro.Numero != 0 && p.Numero == filtro.Numero)));
            source = source.Where(p => ((filtro.ConceptoId == 0) || (filtro.ConceptoId != 0 && p.ConceptoId == filtro.ConceptoId)));
            source = source.Where(p => ((filtro.ClienteId == 0) || (filtro.ClienteId != 0 && p.ClienteId == filtro.ClienteId)));
            source = source.Where(p => ((filtro.EstadoId == 0) || (filtro.EstadoId != 0 && p.EstadoId == filtro.EstadoId)));
            source = source.Where(p => ((filtro.Mes == 0) || (filtro.Mes != 0 && p.Mes == filtro.Mes)));
            source = source.Where(p => ((filtro.Ano == 0) || (filtro.Ano != 0 && p.Ano == filtro.Ano)));

            int CurrentPage = (filtro.Page == 0 ? 1 : filtro.Page);
            int PageSize = filtro.PageSize; 

            string SortCommand = filtro.SortCommand;
            string SortOrder = filtro.SortOrder;

            if (!string.IsNullOrEmpty(SortCommand) && !string.IsNullOrEmpty(SortOrder))
            {
                switch(SortCommand)
                {
                    case "Numero":
                        if (SortOrder == "asc")                    
                            source= source.OrderBy(a => a.Numero);
                        else if (SortOrder == "desc")
                            source = source.OrderByDescending(a => a.Numero);
                        break;
                    case "Cliente":
                        if (SortOrder == "asc")
                            source = source.OrderBy(a => a.Cliente);
                        else if (SortOrder == "desc")
                            source = source.OrderByDescending(a => a.Cliente);
                        break;
                    case "MontoTotal":
                        if (SortOrder == "asc")
                            source = source.OrderBy(a => a.MontoTotal);
                        else if (SortOrder == "desc")
                            source = source.OrderByDescending(a => a.MontoTotal);
                        break;
                    case "FechaEmision":
                        if (SortOrder == "asc")
                            source = source.OrderBy(a => a.dFechaEmision);
                        else if (SortOrder == "desc")
                            source = source.OrderByDescending(a => a.dFechaEmision);
                        break;
                }
            }

            int TotalRows = source.Count();

            if (PageSize != 0)            
                source = source.Skip((CurrentPage - 1) * PageSize).Take(PageSize);
            
            List<FacturaResponse> facturas= source.ToList();

            return Ok(new PagedList<FacturaResponse>(facturas, TotalRows));
        }

        [HttpPost]
        public IHttpActionResult NuevaFactura(Factura model)
        {
            if (context != null)
            {
                context.Facturas.Add(model);
                context.SaveChanges();

                if(model.FacturaId > 0)
                {
                    return Ok(model.FacturaId);
                }
            }

            return BadRequest();
        }


        [HttpGet]
        public List<ConceptoFactura> ListarConceptos()
        {
            var conceptos = new List<ConceptoFactura>();

            conceptos = context.ConceptoFacturas.Where(x=> x.Habilitado == true).ToList();

            return conceptos;
        }

        [HttpGet]
        [AllowAnonymous]
        public List<EstadoFactura> ListarEstados()
        {
            var estados = new List<EstadoFactura>();

            estados = context.EstadoFacturas.Where(x => x.Habilitado == true).ToList();

            return estados;
        }

        [HttpGet]
        [AllowAnonymous]
        public List<Object> ListarClientes(string term)
        {
            var clientes = new List<Cliente>();

            clientes = context.Clientes.Where(x => x.Habilitado == true).ToList<Cliente>();

            IEnumerable<Object> lista = clientes.Where(x => x.RazonSocial.IndexOf(term, StringComparison.InvariantCultureIgnoreCase) >= 0)
                .Select(x => new { value = x.ClienteId, label = x.RazonSocial });

            return lista.ToList();
        }

        //[HttpGet]
        //public List<Object> ListarClientes()
        //{
        //    var clientes = new List<Object>();

        //    clientes = context.Clientes.Where(x => x.Habilitado == true).Select(x=> new { value= x.ClienteId, label= x.RazonSocial}).ToList<Object>();

        //    return clientes;
        //}

        //public IEnumerable<Factura> Get()
        //{
        //    var facturas = new List<Factura>();

        //    using (var ctx = new dbFactura())
        //    {
        //        facturas = ctx.Facturas.ToList();
        //    }


        //    return facturas;
        //}

        //// GET: api/prueba/5
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //POST: api/prueba
        [HttpPost]
        public void Agregar([FromBody]string value)
        {
        }

        // PUT: api/prueba/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/prueba/5
        public void Delete(int id)
        {
        }
    }
}
