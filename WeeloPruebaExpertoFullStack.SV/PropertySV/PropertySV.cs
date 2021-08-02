using System.Collections.Generic;
using WeeloPruebaExpertoFullStack.DA.PropertyDA;
using WeeloPruebaExpertoFullStack.ET.PropertyET;
using WeeloPruebaExpertoFullStack.ET.Response;

namespace WeeloPruebaExpertoFullStack.SV.PropertySV
{
    public class PropertySV : IPropertySV
    {
        readonly PropertyDA propertyDA = new();

        public ResponseBase<PropertyResponse> Create(Property property)
        {
            return new ResponseBase<PropertyResponse>() { Data = propertyDA.Create(property) };
        }

        public ResponseBase<IList<Property>> ListProperty(int index)
        {
            return new ResponseBase<IList<Property>>() { Data = propertyDA.ListProperty(index) }; 
        }
    }
}
