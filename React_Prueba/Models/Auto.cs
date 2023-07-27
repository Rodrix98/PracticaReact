using System;
using System.Collections.Generic;

namespace React_Prueba.Models;

public partial class Auto
{
    public int IdAuto { get; set; }

    public string? Descripcion { get; set; }

    public DateTime? FechaRegistro { get; set; }
}
