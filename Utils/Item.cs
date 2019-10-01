using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Utils
{
    public class Mes
    {
        //se agrego un comentario
        public int Id { get; set; }
        public string Value { get; set; }
    }

    public class Anho
    {
        public int Id { get; set; }
        public string Value { get; set; }
    }

    public class TipoMoneda
    {
        public int Id { get; set; }
        public string Texto { get; set; }
        public string Abreviacion { get; set; }

    }
}
