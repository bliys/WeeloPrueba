using System.Collections.Generic;
using System.Linq;
using WeeloPruebaExpertoFullStack.DA.Helper;
using WeeloPruebaExpertoFullStack.ET.PropertyET;
using WeeloPruebaExpertoFullStack.ET.Response;

namespace WeeloPruebaExpertoFullStack.DA.PropertyDA
{
    public class PropertyDA
    {
        public virtual PropertyResponse Create(Property property)
        {
            StoreProcedureParamList listParam = new()
            {
                new StoreProcedureParam { NombreParametro = "@pName", Valor = property.Name },
                new StoreProcedureParam { NombreParametro = "@pAddress", Valor = property.Address },
                new StoreProcedureParam { NombreParametro = "@pPrice", Valor = property.Price },
                new StoreProcedureParam { NombreParametro = "@pCodeInternal", Valor = property.CodeInternal },
                new StoreProcedureParam { NombreParametro = "@pYear", Valor = property.Year },
                new StoreProcedureParam { NombreParametro = "@pIdOwner", Valor = property.IdOwner },

            };
            return Helper.Common.ExecuteStoreProcedure<PropertyResponse>("SP_Property_I", listParam).FirstOrDefault();
        }

        public virtual IList<Property> ListProperty(int index)
        {
            StoreProcedureParamList listParam = new()
            {
                new StoreProcedureParam { NombreParametro = "@startIndex", Valor = index }

            };
            return Helper.Common.ExecuteStoreProcedure<Property>("SP_Property_G", listParam);
        }

        public virtual PropertyResponse SaveImage(PropertyImage image)
        {
            StoreProcedureParamList listParam = new()
            {
                new StoreProcedureParam { NombreParametro = "@pfileUrl", Valor = image.fileurl },
                new StoreProcedureParam { NombreParametro = "@pIdProperty", Valor = image.IdProperty },
                new StoreProcedureParam { NombreParametro = "@pEnabled", Valor = image.Enable }
            };
            return Helper.Common.ExecuteStoreProcedure<PropertyResponse>("SP_PropertyImage_I", listParam).FirstOrDefault();
        }

        public virtual IList<PropertyImage> ListImage(int propertyId)
        {
            StoreProcedureParamList listParam = new()
            {
                new StoreProcedureParam { NombreParametro = "@pIdProperty", Valor = propertyId }

            };
            return Helper.Common.ExecuteStoreProcedure<PropertyImage>("SP_PropertyImageByIdProperty_G", listParam);
        }
    }
}
