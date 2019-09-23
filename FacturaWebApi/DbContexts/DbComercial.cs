namespace FacturaWebApi
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class DbComercial : DbContext
    {
        public DbComercial()
            : base("name=DbComercial")
        {
        }

        public virtual DbSet<Cliente> Clientes { get; set; }
        public virtual DbSet<ConceptoFactura> ConceptoFacturas { get; set; }
        public virtual DbSet<EstadoFactura> EstadoFacturas { get; set; }
        public virtual DbSet<Factura> Facturas { get; set; }
        public virtual DbSet<TipoMoneda> TipoMonedas { get; set; }
        public virtual DbSet<Usuario> Usuarios { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Cliente>()
                .Property(e => e.RazonSocial)
                .IsUnicode(false);

            modelBuilder.Entity<Cliente>()
                .Property(e => e.RUC)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<Cliente>()
                .Property(e => e.Direccion)
                .IsUnicode(false);

            modelBuilder.Entity<Cliente>()
                .Property(e => e.Telefono)
                .IsUnicode(false);

            modelBuilder.Entity<ConceptoFactura>()
                .Property(e => e.Nombre)
                .IsUnicode(false);

            modelBuilder.Entity<EstadoFactura>()
                .Property(e => e.Nombre)
                .IsUnicode(false);

            modelBuilder.Entity<Factura>()
                .Property(e => e.NroSiaf)
                .IsUnicode(false);

            modelBuilder.Entity<Factura>()
                .Property(e => e.NroMemo)
                .IsUnicode(false);

            modelBuilder.Entity<Factura>()
                .Property(e => e.SubTotal)
                .HasPrecision(18, 4);

            modelBuilder.Entity<Factura>()
                .Property(e => e.MontoIGV)
                .HasPrecision(18, 4);

            modelBuilder.Entity<Factura>()
                .Property(e => e.MontoTotal)
                .HasPrecision(18, 4);

            modelBuilder.Entity<Factura>()
                .Property(e => e.Observacion)
                .IsUnicode(false);

            modelBuilder.Entity<TipoMoneda>()
                .Property(e => e.Nombre)
                .IsUnicode(false);

            modelBuilder.Entity<TipoMoneda>()
                .Property(e => e.Abreviacion)
                .IsUnicode(false);

            modelBuilder.Entity<Usuario>()
                .Property(e => e.Nombres)
                .IsUnicode(false);

            modelBuilder.Entity<Usuario>()
                .Property(e => e.Apellidos)
                .IsUnicode(false);

            modelBuilder.Entity<Usuario>()
                .Property(e => e.Usuario1)
                .IsUnicode(false);

            modelBuilder.Entity<Usuario>()
                .Property(e => e.Password)
                .IsUnicode(false);

            modelBuilder.Entity<Usuario>()
                .Property(e => e.Email)
                .IsUnicode(false);
        }
    }
}
