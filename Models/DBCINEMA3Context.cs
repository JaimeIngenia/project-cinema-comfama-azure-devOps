using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CinemaComfamaVs5.Models
{
    public partial class DBCINEMA3Context : DbContext
    {
        public virtual DbSet<Formato> Formatos { get; set; } = null!;
        public virtual DbSet<Genero> Generos { get; set; } = null!;
        public virtual DbSet<Hora> Horas { get; set; } = null!;
        public virtual DbSet<Horario> Horarios { get; set; } = null!;
        public virtual DbSet<Pelicula> Peliculas { get; set; } = null!;
        public virtual DbSet<Reserva> Reservas { get; set; } = null!;
        public virtual DbSet<Sala> Salas { get; set; } = null!;
        public virtual DbSet<Sillareserva> Sillareservas { get; set; } = null!;
        public virtual DbSet<Tipodocumento> Tipodocumentos { get; set; } = null!;
        public virtual DbSet<Usuario> Usuarios { get; set; } = null!;

        public virtual DbSet<TipoRol> TiposRoles { get; set; } = null!;
        public virtual DbSet<ReservaReal> ReservasReales { get; set; } = null!;


        public DBCINEMA3Context(DbContextOptions<DBCINEMA3Context> options)
            : base(options)
        {

            this.Database.EnsureCreated();
        }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Formato>(entity =>
            {
                entity.HasKey(e => e.IdFormato)
                    .HasName("PK__FORMATO__A7043164AA3DE512");

                entity.ToTable("FORMATO");

                entity.Property(e => e.NombreFormato)
                    .HasMaxLength(250)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Genero>(entity =>
            {
                entity.HasKey(e => e.IdGenero)
                    .HasName("PK__GENERO__0F8349889A4C9B30");

                entity.ToTable("GENERO");

                entity.Property(e => e.NombreGenero)
                    .HasMaxLength(250)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Hora>(entity =>
            {
                entity.HasKey(e => e.IdHora)
                    .HasName("PK__HORAS__5FEB39EB359E0DA9");

                entity.ToTable("HORAS");

                entity.Property(e => e.Hora1).HasColumnName("Hora");
            });

            modelBuilder.Entity<Horario>(entity =>
            {
                entity.HasKey(e => e.IdHorario)
                    .HasName("PK__HORARIOS__1539229B8F5E278C");

                entity.ToTable("HORARIOS");

                entity.HasMany(d => d.ReservasReales)
                  .WithOne(rr => rr.IdHorarioNavegacion) // Corregir aquí
                  .HasForeignKey(d => d.IdHorario)
                  .HasConstraintName("FK_HorarioReservaReal");

                entity.HasOne(d => d.IdHoraNavigation)
                    .WithMany(p => p.Horarios)
                    .HasForeignKey(d => d.IdHora)
                    .HasConstraintName("FK_HoraHorario");

                entity.HasOne(d => d.IdPeliculaNavigation)
                    .WithMany(p => p.Horarios)
                    .HasForeignKey(d => d.IdPelicula)
                    .HasConstraintName("FK_PeliculaHorario");

                entity.HasOne(d => d.IdSalaNavigation)
                    .WithMany(p => p.Horarios)
                    .HasForeignKey(d => d.IdSala)
                    .HasConstraintName("FK_SalaHorario");
            });

            modelBuilder.Entity<Pelicula>(entity =>
            {
                entity.HasKey(e => e.IdPelicula)
                    .HasName("PK__PELICULA__60537FD0BE8AB58A");

                entity.ToTable("PELICULA");

                entity.Property(e => e.ImagenPromocional)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.Sinopsis).HasColumnType("text");

                entity.Property(e => e.Titulo)
                    .HasMaxLength(250)
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

            modelBuilder.Entity<Reserva>(entity =>
            {
                entity.HasKey(e => e.IdReserva)
                    .HasName("PK__RESERVAS__0E49C69D91FF0D96");

                entity.ToTable("RESERVAS");

                entity.HasOne(d => d.IdHorarioNavigation)
                    .WithMany(p => p.Reservas)
                    .HasForeignKey(d => d.IdHorario)
                    .HasConstraintName("FK_HorarioReserva");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.Reservas)
                    .HasForeignKey(d => d.IdUsuario)
                    .HasConstraintName("FK_UsuarioReserva");
            });

            modelBuilder.Entity<Sala>(entity =>
            {
                entity.HasKey(e => e.IdSala)
                    .HasName("PK__SALA__A04F9B3B4DBCA541");

                entity.ToTable("SALA");

                entity.Property(e => e.Estado)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.NombreSala)
                    .HasMaxLength(250)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Sillareserva>(entity =>
            {
                entity.HasKey(e => e.IdSillaReserva)
                    .HasName("PK__SILLARES__169371E86B378E11");

                entity.ToTable("SILLARESERVA");

                entity.HasOne(d => d.IdReservaNavigation)
                    .WithMany(p => p.Sillareservas)
                    .HasForeignKey(d => d.IdReserva)
                    .HasConstraintName("FK_ReservaSilla");
            });

            modelBuilder.Entity<Tipodocumento>(entity =>
            {
                entity.HasKey(e => e.IdTipoDocumento)
                    .HasName("PK__TIPODOCU__3AB3332F60150BF4");

                entity.ToTable("TIPODOCUMENTO");

                entity.Property(e => e.TipoDocumento1)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasColumnName("TipoDocumento");
            });
      

            modelBuilder.Entity<ReservaReal>(entity =>
            {
                entity.HasKey(e => e.IdReservaReal)
                    .HasName("PK__RESERVARE__A7B8B83270A6D52F");

                entity.ToTable("RESERVAREAL");

                // Other property configurations...

                entity.HasOne(rr => rr.IdUsuarioNavegacion)
                    .WithMany(u => u.ReservasReales)
                    .HasForeignKey(rr => rr.IdUsuario)
                    .HasConstraintName("FK_UsuarioReservaReal");

                entity.HasOne(rr => rr.IdHorarioNavegacion)
                      .WithMany(h => h.ReservasReales)
                      .HasForeignKey(rr => rr.IdHorario)
                      .HasConstraintName("FK_HorarioReservaReal");

                //entity.HasOne(rr => rr.IdHorarioNavegacion)
                //    .WithMany(u => u.ReservasReales)
                //    .HasForeignKey(rr => rr.IdHorario)
                //    .HasConstraintName("FK_HorarioReservaReal");
            });

            //modelBuilder.Entity<ReservaReal>(entity =>
            //{
            //    entity.HasKey(e => e.IdReservaReal)
            //        .HasName("PK__ReservaReal__123456789");

            //    entity.ToTable("RESERVAREAL");

            //    entity.HasOne(d => d.IdUsuarioNavegacion)
            //        .WithMany(p => p.ReservasReales)
            //        .HasForeignKey(d => d.IdUsuario)
            //        .HasConstraintName("FK_UsuarioReservaReal");
            //});

            //modelBuilder.Entity<Usuario>(entity =>
            //{
            //    entity.HasKey(e => e.IdUsuario)
            //        .HasName("PK__USUARIO__C61F1C65A2030A3F");

            //    entity.ToTable("USUARIO");

            //    // Other property configurations...

            //    entity.HasMany(u => u.ReservasReales)
            //        .WithOne(rr => rr.IdUsuarioNavegacion)
            //        .HasForeignKey(rr => rr.IdUsuario)
            //        .HasConstraintName("FK_UsuarioReservaReal");
            //});


            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(e => e.IdUsuario)
                    .HasName("PK__USUARIOS__5B65BF97E27CBFF4");

                entity.ToTable("USUARIOS");

                entity.HasMany(u => u.ReservasReales)
                    .WithOne(rr => rr.IdUsuarioNavegacion)
                    .HasForeignKey(rr => rr.IdUsuario)
                    .HasConstraintName("FK_UsuarioReservaReal");

                entity.Property(e => e.Apellidos)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.Contrasena)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.Correo)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Nombres)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.NumeroDocumento)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdTipoDocumentoNavigation)
                    .WithMany(p => p.Usuarios)
                    .HasForeignKey(d => d.IdTipoDocumento)
                    .HasConstraintName("FK_TipoDocumento");

                entity.HasOne(d => d.IdTipoRolNavigation)
                    .WithMany(p => p.Usuarios)
                    .HasForeignKey(d => d.IdTipoRol)
                    .HasConstraintName("FK_TipoRolUsuario");
            });

            modelBuilder.Entity<TipoRol>(entity =>
            {
                entity.HasKey(e => e.IdTipoRol)
                    .HasName("PK_TipoRol");

                entity.ToTable("TIPOROL");

                entity.Property(e => e.NombreRol)
                    .HasMaxLength(250)
                    .IsUnicode(false);
            });


            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
