using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CinemaComfamaVs5.Migrations
{
    public partial class nombreMigracionJaime : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FORMATO",
                columns: table => new
                {
                    IdFormato = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NombreFormato = table.Column<string>(type: "varchar(250)", unicode: false, maxLength: 250, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__FORMATO__A7043164AA3DE512", x => x.IdFormato);
                });

            migrationBuilder.CreateTable(
                name: "GENERO",
                columns: table => new
                {
                    IdGenero = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NombreGenero = table.Column<string>(type: "varchar(250)", unicode: false, maxLength: 250, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__GENERO__0F8349889A4C9B30", x => x.IdGenero);
                });

            migrationBuilder.CreateTable(
                name: "HORAS",
                columns: table => new
                {
                    IdHora = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Hora = table.Column<TimeSpan>(type: "time", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__HORAS__5FEB39EB359E0DA9", x => x.IdHora);
                });

            migrationBuilder.CreateTable(
                name: "SALA",
                columns: table => new
                {
                    IdSala = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NombreSala = table.Column<string>(type: "varchar(250)", unicode: false, maxLength: 250, nullable: true),
                    Estado = table.Column<string>(type: "varchar(250)", unicode: false, maxLength: 250, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__SALA__A04F9B3B4DBCA541", x => x.IdSala);
                });

            migrationBuilder.CreateTable(
                name: "TIPODOCUMENTO",
                columns: table => new
                {
                    IdTipoDocumento = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TipoDocumento = table.Column<string>(type: "varchar(250)", unicode: false, maxLength: 250, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__TIPODOCU__3AB3332F60150BF4", x => x.IdTipoDocumento);
                });

            migrationBuilder.CreateTable(
                name: "TIPOROL",
                columns: table => new
                {
                    IdTipoRol = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NombreRol = table.Column<string>(type: "varchar(250)", unicode: false, maxLength: 250, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TipoRol", x => x.IdTipoRol);
                });

            migrationBuilder.CreateTable(
                name: "PELICULA",
                columns: table => new
                {
                    IdPelicula = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Titulo = table.Column<string>(type: "varchar(250)", unicode: false, maxLength: 250, nullable: true),
                    ImagenPromocional = table.Column<string>(type: "varchar(250)", unicode: false, maxLength: 250, nullable: true),
                    Duracion = table.Column<int>(type: "int", nullable: true),
                    Valor = table.Column<double>(type: "float", nullable: true),
                    Sinopsis = table.Column<string>(type: "text", nullable: true),
                    IdGenero = table.Column<int>(type: "int", nullable: true),
                    IdFormato = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__PELICULA__60537FD0BE8AB58A", x => x.IdPelicula);
                    table.ForeignKey(
                        name: "FK_Formato",
                        column: x => x.IdFormato,
                        principalTable: "GENERO",
                        principalColumn: "IdGenero");
                    table.ForeignKey(
                        name: "FK_Genero",
                        column: x => x.IdGenero,
                        principalTable: "FORMATO",
                        principalColumn: "IdFormato");
                });

            migrationBuilder.CreateTable(
                name: "USUARIOS",
                columns: table => new
                {
                    IdUsuario = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdTipoDocumento = table.Column<int>(type: "int", nullable: true),
                    NumeroDocumento = table.Column<string>(type: "varchar(250)", unicode: false, maxLength: 250, nullable: true),
                    Nombres = table.Column<string>(type: "varchar(250)", unicode: false, maxLength: 250, nullable: true),
                    Apellidos = table.Column<string>(type: "varchar(250)", unicode: false, maxLength: 250, nullable: true),
                    Correo = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    Contrasena = table.Column<string>(type: "varchar(250)", unicode: false, maxLength: 250, nullable: true),
                    IdTipoRol = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__USUARIOS__5B65BF97E27CBFF4", x => x.IdUsuario);
                    table.ForeignKey(
                        name: "FK_TipoDocumento",
                        column: x => x.IdTipoDocumento,
                        principalTable: "TIPODOCUMENTO",
                        principalColumn: "IdTipoDocumento");
                    table.ForeignKey(
                        name: "FK_TipoRolUsuario",
                        column: x => x.IdTipoRol,
                        principalTable: "TIPOROL",
                        principalColumn: "IdTipoRol");
                });

            migrationBuilder.CreateTable(
                name: "HORARIOS",
                columns: table => new
                {
                    IdHorario = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdPelicula = table.Column<int>(type: "int", nullable: true),
                    IdSala = table.Column<int>(type: "int", nullable: true),
                    IdHora = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__HORARIOS__1539229B8F5E278C", x => x.IdHorario);
                    table.ForeignKey(
                        name: "FK_HoraHorario",
                        column: x => x.IdHora,
                        principalTable: "HORAS",
                        principalColumn: "IdHora");
                    table.ForeignKey(
                        name: "FK_PeliculaHorario",
                        column: x => x.IdPelicula,
                        principalTable: "PELICULA",
                        principalColumn: "IdPelicula");
                    table.ForeignKey(
                        name: "FK_SalaHorario",
                        column: x => x.IdSala,
                        principalTable: "SALA",
                        principalColumn: "IdSala");
                });

            migrationBuilder.CreateTable(
                name: "RESERVAREAL",
                columns: table => new
                {
                    IdReservaReal = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdUsuario = table.Column<int>(type: "int", nullable: true),
                    IdHorario = table.Column<int>(type: "int", nullable: true),
                    NumeroSillasReserva = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__RESERVARE__A7B8B83270A6D52F", x => x.IdReservaReal);
                    table.ForeignKey(
                        name: "FK_HorarioReservaReal",
                        column: x => x.IdHorario,
                        principalTable: "HORARIOS",
                        principalColumn: "IdHorario");
                    table.ForeignKey(
                        name: "FK_UsuarioReservaReal",
                        column: x => x.IdUsuario,
                        principalTable: "USUARIOS",
                        principalColumn: "IdUsuario");
                });

            migrationBuilder.CreateTable(
                name: "RESERVAS",
                columns: table => new
                {
                    IdReserva = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdUsuario = table.Column<int>(type: "int", nullable: true),
                    IdHorario = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__RESERVAS__0E49C69D91FF0D96", x => x.IdReserva);
                    table.ForeignKey(
                        name: "FK_HorarioReserva",
                        column: x => x.IdHorario,
                        principalTable: "HORARIOS",
                        principalColumn: "IdHorario");
                    table.ForeignKey(
                        name: "FK_UsuarioReserva",
                        column: x => x.IdUsuario,
                        principalTable: "USUARIOS",
                        principalColumn: "IdUsuario");
                });

            migrationBuilder.CreateTable(
                name: "SILLARESERVA",
                columns: table => new
                {
                    IdSillaReserva = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdReserva = table.Column<int>(type: "int", nullable: true),
                    NumeroSilla = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__SILLARES__169371E86B378E11", x => x.IdSillaReserva);
                    table.ForeignKey(
                        name: "FK_ReservaSilla",
                        column: x => x.IdReserva,
                        principalTable: "RESERVAS",
                        principalColumn: "IdReserva");
                });

            migrationBuilder.CreateIndex(
                name: "IX_HORARIOS_IdHora",
                table: "HORARIOS",
                column: "IdHora");

            migrationBuilder.CreateIndex(
                name: "IX_HORARIOS_IdPelicula",
                table: "HORARIOS",
                column: "IdPelicula");

            migrationBuilder.CreateIndex(
                name: "IX_HORARIOS_IdSala",
                table: "HORARIOS",
                column: "IdSala");

            migrationBuilder.CreateIndex(
                name: "IX_PELICULA_IdFormato",
                table: "PELICULA",
                column: "IdFormato");

            migrationBuilder.CreateIndex(
                name: "IX_PELICULA_IdGenero",
                table: "PELICULA",
                column: "IdGenero");

            migrationBuilder.CreateIndex(
                name: "IX_RESERVAREAL_IdHorario",
                table: "RESERVAREAL",
                column: "IdHorario");

            migrationBuilder.CreateIndex(
                name: "IX_RESERVAREAL_IdUsuario",
                table: "RESERVAREAL",
                column: "IdUsuario");

            migrationBuilder.CreateIndex(
                name: "IX_RESERVAS_IdHorario",
                table: "RESERVAS",
                column: "IdHorario");

            migrationBuilder.CreateIndex(
                name: "IX_RESERVAS_IdUsuario",
                table: "RESERVAS",
                column: "IdUsuario");

            migrationBuilder.CreateIndex(
                name: "IX_SILLARESERVA_IdReserva",
                table: "SILLARESERVA",
                column: "IdReserva");

            migrationBuilder.CreateIndex(
                name: "IX_USUARIOS_IdTipoDocumento",
                table: "USUARIOS",
                column: "IdTipoDocumento");

            migrationBuilder.CreateIndex(
                name: "IX_USUARIOS_IdTipoRol",
                table: "USUARIOS",
                column: "IdTipoRol");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RESERVAREAL");

            migrationBuilder.DropTable(
                name: "SILLARESERVA");

            migrationBuilder.DropTable(
                name: "RESERVAS");

            migrationBuilder.DropTable(
                name: "HORARIOS");

            migrationBuilder.DropTable(
                name: "USUARIOS");

            migrationBuilder.DropTable(
                name: "HORAS");

            migrationBuilder.DropTable(
                name: "PELICULA");

            migrationBuilder.DropTable(
                name: "SALA");

            migrationBuilder.DropTable(
                name: "TIPODOCUMENTO");

            migrationBuilder.DropTable(
                name: "TIPOROL");

            migrationBuilder.DropTable(
                name: "GENERO");

            migrationBuilder.DropTable(
                name: "FORMATO");
        }
    }
}
