namespace FacturaWebApi
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Factura")]
    public partial class Factura
    {
        public int FacturaId { get; set; }

        public int Numero { get; set; }

        public int Serie { get; set; }

        public int ConceptoId { get; set; }

        [Column(TypeName = "date")]
        public DateTime FechaEmision { get; set; }

        public int? TipoMonedaId { get; set; }

        public bool? IncluyeIGV { get; set; }

        [StringLength(10)]
        public string NroSiaf { get; set; }

        [StringLength(10)]
        public string NroMemo { get; set; }

        [Column(TypeName = "date")]
        public DateTime? FechaMemo { get; set; }

        [Column(TypeName = "date")]
        public DateTime? FechaCobro { get; set; }

        public decimal SubTotal { get; set; }

        public decimal MontoIGV { get; set; }

        public decimal MontoTotal { get; set; }

        public int? IGV { get; set; }

        [StringLength(500)]
        public string Observacion { get; set; }

        public int ClienteId { get; set; }

        public int ContratoId { get; set; }

        public DateTime FechaRegistro { get; set; }

        public int UsuarioRegistroId { get; set; }

        public DateTime? FechaEdicion { get; set; }

        public int? UsuarioEdicionId { get; set; }

        public int EstadoId { get; set; }

        public int Mes { get; set; }

        public int Ano { get; set; }

        public bool Habilitado { get; set; }
    }
}
