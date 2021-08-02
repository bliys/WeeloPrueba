using System.Collections.Generic;
using WeeloPruebaExpertoFullStack.ET.OwnerET;

namespace WeeloPruebaExpertoFullStack.SV.OwnerSV
{
    public interface IOwnerSV
    {
        ResponseBase<IList<Owner>> ListOwner();
    }
}
