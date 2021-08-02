using System.Collections.Generic;
using WeeloPruebaExpertoFullStack.ET.OwnerET;

namespace WeeloPruebaExpertoFullStack.DA.OwnerDA
{
    public  class OwnerDA
    {
        public virtual IList<Owner> ListOwner()
        {
            return Helper.Common.ExecuteStoreProcedure<Owner>("SP_Owner_G");
        }
    }
}
