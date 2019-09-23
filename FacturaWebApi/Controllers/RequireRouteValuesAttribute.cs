
using System.Reflection;
using System.Web.Mvc;

namespace FacturaWebApi.Controllers
{
    public class RequireRouteValuesAttribute : ActionMethodSelectorAttribute
    {
        public RequireRouteValuesAttribute(string[] valueNames)
        {
            ValueNames = valueNames;
        }

        public override bool IsValidForRequest(ControllerContext controllerContext, MethodInfo methodInfo)
        {
            bool contains = false;
            foreach (var value in ValueNames)
            {
                contains = controllerContext.RequestContext.RouteData.Values.ContainsKey(value);
                if (!contains) break;
            }
            return contains;
        }

        public string[] ValueNames { get; private set; }
    }
}