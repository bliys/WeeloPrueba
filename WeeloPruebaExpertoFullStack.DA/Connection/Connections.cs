using Microsoft.Extensions.Options;

namespace WeeloPruebaExpertoFullStack.DA
{
    public class Connections
    {
        public static string Main
        {
            get =>ServiceManager.GetInstance<IOptions<DataBaseSettings>>().Value.ConnectionString;
        }
    }
}
