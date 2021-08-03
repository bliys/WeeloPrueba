using System.Collections.Generic;
using WeeloPruebaExpertoFullStack.ET.PropertyET;
using WeeloPruebaExpertoFullStack.ET.Response;

namespace WeeloPruebaExpertoFullStack.SV.PropertySV
{
    public interface IPropertySV
    {
        ResponseBase<PropertyResponse> Create(Property property);

        ResponseBase<IList<Property>> ListProperty(int index);

        ResponseBase<PropertyResponse> SaveImage(SaveImagesRequest property, string contentPath);

        ResponseBase<IList<PropertyImage>> ListImage(int propertyId);
    }
}
