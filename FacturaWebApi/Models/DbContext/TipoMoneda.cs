namespace FacturaWebApi
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("TipoMoneda")]
    public partial class TipoMoneda
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int TipoMonedaId { get; set; }

        [Required]
        [StringLength(50)]
        public string Nombre { get; set; }

        [StringLength(50)]
        public string Abreviacion { get; set; }

        public bool Habilitado { get; set; }
    }
}
