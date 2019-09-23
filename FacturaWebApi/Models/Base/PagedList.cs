using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FacturaWebApi.Models.Base
{
    public class PagedList<T> where T : class
    {
        public IEnumerable<T> Lista { get; set; }
        public int TotalRecords { get; set; }

        public PagedList(IEnumerable<T> Lista, int TotalRecords)
        {
            this.Lista = Lista;
            this.TotalRecords = TotalRecords;
        }
    }
}