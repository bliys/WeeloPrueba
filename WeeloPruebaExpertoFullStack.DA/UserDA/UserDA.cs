using System.Linq;
using WeeloPruebaExpertoFullStack.DA.Helper;
using WeeloPruebaExpertoFullStack.ET.UserET;

namespace WeeloPruebaExpertoFullStack.DA.UserDA
{
    public class UserDA
    {
        public virtual User Login(string user, string pass)
        {
            StoreProcedureParamList listParam = new()
            {
                new StoreProcedureParam { NombreParametro = "@pUserName", Valor = user },
                new StoreProcedureParam { NombreParametro = "@pUserPassword", Valor = pass }
            };
            return Helper.Common.ExecuteStoreProcedure<User>("SP_Login", listParam).FirstOrDefault();
        }
    }
}
