﻿using System;

namespace WeeloPruebaExpertoFullStack.ET.OwnerET
{
    public class Owner
    {
        public int IdOwner { get; set; }
        public string Name {get; set; }
        public string Address { get; set; }
        public byte[] Photo { get; set; }
        public DateTime Birthday { get; set; }
    }
}
