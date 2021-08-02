using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;

namespace WeeloPruebaExpertoFullStack.ET.PropertyET
{
    public class Property
    {
        public int IdProperty { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public decimal Price { get; set; }
        public string CodeInternal { get; set; }
        public int Year { get; set; }
        public int IdOwner { get; set; }
    }

    public class SaveImagesRequest
    {
        public int PropertyId { get; set; }
        public IFormFile Image { get; set; }
    }
}
