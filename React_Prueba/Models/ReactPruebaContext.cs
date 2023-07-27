using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace React_Prueba.Models;

public partial class ReactPruebaContext : DbContext
{
    public ReactPruebaContext()
    {
    }

    public ReactPruebaContext(DbContextOptions<ReactPruebaContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Auto> Autos { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=(local); DataBase=React_Prueba;Integrated Security=true;Encrypt=False;TrustServerCertificate=False;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Auto>(entity =>
        {
            entity.HasKey(e => e.IdAuto).HasName("PK__Tarea__756A5402D950138C");

            entity.Property(e => e.IdAuto).HasColumnName("idAuto");
            entity.Property(e => e.Descripcion)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("descripcion");
            entity.Property(e => e.FechaRegistro)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("fechaRegistro");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
