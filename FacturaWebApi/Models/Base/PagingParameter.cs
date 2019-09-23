using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FacturaWebApi.Models.Base
{
    public class PagingParameter
    {
        public int Page { get; set; }
        public int PageSize { get; set; }
        public string SortCommand { get; set; }
        public string SortOrder { get; set; }
    }
}