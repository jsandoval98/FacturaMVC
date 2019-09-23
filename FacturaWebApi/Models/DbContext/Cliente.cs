namespace FacturaWebApi
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Cliente")]
    public partial class Cliente
    {
        public int ClienteId { get; set; }

        [Required]
        [StringLength(100)]
        public string RazonSocial { get; set; }

        [Required]
        [StringLength(11)]
        public string RUC { get; set; }

        [StringLength(150)]
        public string Direccion { get; set; }

        [StringLength(100)]
        public string Telefono { get; set; }

        public bool Habilitado { get; set; }

        public int UsuarioRegistro { get; set; }

        public DateTime FechaRegistro { get; set; }

        public int? UsuarioEdicion { get; set; }

        public DateTime? FechaEdicion { get; set; }
    }
}
