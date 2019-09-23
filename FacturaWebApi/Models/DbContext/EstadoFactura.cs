namespace FacturaWebApi
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("EstadoFactura")]
    public partial class EstadoFactura
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int EstadoFacturaId { get; set; }

        [Required]
        [StringLength(50)]
        public string Nombre { get; set; }

        public bool Habilitado { get; set; }
    }
}
