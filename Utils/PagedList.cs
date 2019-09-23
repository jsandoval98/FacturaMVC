using System.Collections.Generic;

namespace Utils
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