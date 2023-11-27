using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CinemaComfamaVs5.Models
{
    public partial class DBCINEMAContext : DbContext
    {
        public DBCINEMAContext()
        {
        }

        public DBCINEMAContext(DbContextOptions<DBCINEMAContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Formato> Formatos { get; set; } = null!;
        public virtual DbSet<Genero> Generos { get; set; } = null!;
        public virtual DbSet<Pelicula> Peliculas { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Formato>(entity =>
            {
                entity.HasKey(e => e.IdFormato)
                    .HasName("PK__FORMATO__A7043164652FC9D6");

                entity.ToTable("FORMATO");

                entity.Property(e => e.NombreFormato)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Genero>(entity =>
            {
                entity.HasKey(e => e.IdGenero)
                    .HasName("PK__GENERO__0F8349888BAE9A4E");

                entity.ToTable("GENERO");

                entity.Property(e => e.NombreGenero)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Pelicula>(entity =>
            {
                entity.HasKey(e => e.IdPelicula)
                    .HasName("PK__PELICULA__60537FD05B928795");

                entity.ToTable("PELICULA");

                entity.Property(e => e.ImagenPromocional)
                    .HasMaxLength(60)
                    .IsUnicode(false);

                entity.Property(e => e.Sinopsis).HasColumnType("text");

                entity.Property(e => e.Titulo)
                    .HasMaxLength(60)
                    .IsUnicode(false);

                entity.HasOne(d => d.oFormato)
                    .WithMany(p => p.Peliculas)
                    .HasForeignKey(d => d.IdFormato)
                    .HasConstraintName("FK_Formato");

                entity.HasOne(d => d.oGenero)
                    .WithMany(p => p.Peliculas)
                    .HasForeignKey(d => d.IdGenero)
                    .HasConstraintName("FK_Genero");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
