using System.Collections.Generic;

namespace WeeloPruebaExpertoFullStack.DA.Helper
{
    public class StoreProcedureParam
    {
        public string NombreParametro { get; set; }
        public object Valor { get; set; }
    }

    public class StoreProcedureParamList : List<StoreProcedureParam>
    {
    }
}
