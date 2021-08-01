using System;

namespace WeeloPruebaExpertoFullStack.ET.Property
{
    public class Property
    {
        public int IdProperty { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public decimal Price { get; set; }
        public DateTime Year { get; set; }
        public int IdOwner { get; set; }

    }
}
