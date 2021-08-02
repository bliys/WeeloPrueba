using System.Collections.Generic;
using WeeloPruebaExpertoFullStack.DA.OwnerDA;
using WeeloPruebaExpertoFullStack.ET.OwnerET;

namespace WeeloPruebaExpertoFullStack.SV.OwnerSV
{
    public class OwnerSV : IOwnerSV
    {
        OwnerDA ownerDA = new();
        public ResponseBase<IList<Owner>> ListOwner()
        {
            return new ResponseBase<IList<Owner>>() { Data = ownerDA.ListOwner() }; 
        }
    }
}
