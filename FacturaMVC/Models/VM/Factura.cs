using System;

namespace FacturaMVC.Models.VM
{
    public  class FacturaResponse
    {
        public int FacturaId { get; set; }

        public int Numero { get; set; }

        public string Concepto { get; set; }

        public int ConceptoId { get; set; }

        public string FechaEmision {
            get {
                return dFechaEmision.ToString("dd/MM/yyyy");
            }
        }

        public DateTime dFechaEmision { get; set; }

        public string TipoMoneda { get; set; }

        public int? TipoMonedaId { get; set; }

        public bool? IncluyeIGV { get; set; }

        public string NroSiaf { get; set; }

        public string NroMemo { get; set; }

        public string FechaMemo { get; set; }

        public string FechaCobro { get; set; }

        public decimal SubTotal { get; set; }

        public decimal MontoIGV { get; set; }

        public decimal MontoTotal { get; set; }

        public int? IGV { get; set; }

        public string Observacion { get; set; }

        public string Cliente { get; set; }

        public int ClienteId { get; set; }

        public int ContratoId { get; set; }

        public DateTime dFechaRegistro { get; set; }

        public string FechaRegistro
        {
            get
            {
                return dFechaRegistro.ToString("dd/MM/yyyy");
            }
        }

        public int UsuarioRegistroId { get; set; }

        public string FechaEdicion { get; set; }

        public int? UsuarioEdicionId { get; set; }

        public string Estado { get; set; }

        public int EstadoId { get; set; }

        public int Mes { get; set; }

        public int Ano { get; set; }

        public bool Habilitado { get; set; }
    }

    public class FacturaRequest
    {
        public int Numero { get; set; }

        public int ConceptoId { get; set; }

        public int ClienteId { get; set; }

        public int Mes { get; set; }

        public int Ano { get; set; }

        public int EstadoId { get; set; }


        public int Page { get; set; }
        public int PageSize { get; set; }
        public string SortCommand { get; set; }
        public string SortOrder { get; set; }
    }
}
