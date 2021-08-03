using System.Collections.Generic;
using System.IO;
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


        public ResponseBase<PropertyResponse> SaveImage(SaveImagesRequest image, string contentPath)
        {
           
            string urlFile = $"Images/{image.PropertyId}/{image.Image.FileName}";
            string uploads = Path.Combine(contentPath, "Images\\" + image.PropertyId);
            string filePath = Path.Combine(uploads, image.Image.FileName);
            if (!Directory.Exists(uploads))
                Directory.CreateDirectory(uploads);
            using Stream fileStrem = new FileStream(filePath, FileMode.Create);
            image.Image.CopyTo(fileStrem);

            var result = new PropertyImage()
            {
                Enable = image.Enable,
                IdProperty = image.PropertyId,
                fileurl = urlFile
            };
            return new ResponseBase<PropertyResponse>() { Data = propertyDA.SaveImage(result) };
        }

        public ResponseBase<IList<PropertyImage>> ListImage(int propertyId)
        {
            return new ResponseBase<IList<PropertyImage>>() { Data = propertyDA.ListImage(propertyId) }; 
        }
    }
}
