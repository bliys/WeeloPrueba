using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;


namespace WeeloPruebaExpertoFullStack.DA.Helper
{
    public class Common
    {
        public static IList<T> ExecuteStoreProcedure<T>(string SPname, List<StoreProcedureParam> sqlParameters = null) where T : new()
        {
            List<T> result = null;
            using (SqlConnection cnn = new(Connections.Main))
            using (SqlCommand cmd = new(SPname, cnn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                if (sqlParameters != null)
                    sqlParameters.ForEach(x => { cmd.Parameters.AddWithValue(x.NombreParametro, x.Valor); });
                cmd.Connection.Open();
                using (var reader = cmd.ExecuteReader())
                {
                    if (reader != null)
                    {
                        result = reader.Translate<T>().ToList();
                    }
                }
                cmd.Connection.Close();
            }
            return result;
        }
    }
}
