using System;
using System.Collections.Generic;

namespace Utils
{
    public class Util
    {
        public static List<Mes> ListarMeses()
        {
            List<Mes> lista = new List<Mes>();

            lista.Add(new Mes { Id = 1, Value = "ENERO" });
            lista.Add(new Mes { Id = 2, Value = "FEBRERO" });
            lista.Add(new Mes { Id = 3, Value = "MARZO" });
            lista.Add(new Mes { Id = 4, Value = "ABRIL" });
            lista.Add(new Mes { Id = 5, Value = "MAYO" });
            lista.Add(new Mes { Id = 6, Value = "JUNIO" });
            lista.Add(new Mes { Id = 7, Value = "JULIO" });
            lista.Add(new Mes { Id = 8, Value = "AGOSTO" });
            lista.Add(new Mes { Id = 9, Value = "SETIEMBRE" });
            lista.Add(new Mes { Id = 10, Value = "OCTUBRE" });
            lista.Add(new Mes { Id = 11, Value = "NOVIEMBRE" });
            lista.Add(new Mes { Id = 12, Value = "DICIEMBRE" });

            return lista;
        }

        public static List<Anho> ListarAnhos(int AnhoInicio, bool IncluyeAnhoSiguiente)
        {
            List<Anho> lista = new List<Anho>();

            int AnhoFin = DateTime.Now.Year;

            if (IncluyeAnhoSiguiente)
                AnhoFin++;

            for (int i = AnhoFin; i >= AnhoInicio; i--)
            {
                lista.Add(new Anho { Id = i, Value = i.ToString() });
            }

            return lista;
        }

        public static List<TipoMoneda> ListarTiposMonedas()
        {
            List<TipoMoneda> lista = new List<TipoMoneda>();

            lista.Add(new TipoMoneda { Id = 1, Texto = "SOLES", Abreviacion= "S/." });
            lista.Add(new TipoMoneda { Id = 2, Texto = "DÓLARES", Abreviacion= "US$" });
            return lista;
        }

    }
}

