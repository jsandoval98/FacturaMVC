using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web.Mvc;
using Utils;

namespace FacturaMVC.Controllers
{
    public class BaseController : Controller
    {
        public static HttpClient client= null;
        public static AuthenticationToken token;

        public static void Inicializa()
        {
            ViewBag.Message3 = "Se Ejecuto base! 56676 888  ";

            //if (client == null)
            //{
                //ViewBag.Message3 = "Se Ejecuto cliente!  ";

                client = new HttpClient();
                client.BaseAddress = new Uri("http://localhost:54375/");
                client.DefaultRequestHeaders.Accept.Clear();
                //client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                Aunthenticate();

                //client.DefaultRequestHeaders.Add("IDENTITY_KEY", "");
            //}

        }

        public static void Aunthenticate()
        {

            //ViewBag.Message3 = "Se Ejecuto Aunthenticate!  ";

            Task<HttpResponseMessage> response = client.PostAsync("token", new FormUrlEncodedContent(new[]
                {
                    new KeyValuePair<string,string>("grant_type","password"),
                    new KeyValuePair<string,string>("username", "jsandoval"),
                    new KeyValuePair<string,string>("password","123")
                }));

            Task<AuthenticationToken> tokenResult = response.Result.Content.ReadAsAsync<AuthenticationToken>();            
            token = tokenResult.Result;

            if (!string.IsNullOrEmpty(token.access_token))
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(token.token_type, token.access_token);

        }
    }
}