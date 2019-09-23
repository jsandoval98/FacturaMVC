using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FacturaWebApi.Controllers
{
    [RoutePrefix("api/values")]
    public class ValuesController : ApiController
    {
        // GET api/values/7
        [Route("{id:int}")]
        public string Get(string id)
        {
            return $"You entered an int - {id}";
        }

        // GET api/values/AAC1FB7B-978B-4C39-A90D-271A031BFE5D
        [Route("{id:Guid}")]
        public string Get(Guid id)
        {
            return $"You entered a GUID - {id}";
        }

        // GET api/values/8 - this will not work because it could be an int or a long
        // GET api/values/4147483647 - this works because it can ONLY be a long
        //[Route("{id:long}")]
        //public string Get(long id)
        //{
        //    return $"You entered an long - {id}";
        //}

        //To call it now use http://...api/values/large/8 
        //or http://...api/values/large/4147483647 
        [Route("large/{id:long}")]
        public string Get(long id)
        {
            return $"You entered an long - {id}";
        }


    }
}
