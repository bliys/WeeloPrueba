using WeeloPruebaExpertoFullStack.ET.Response;

namespace WeeloPruebaExpertoFullStack.SV.UserSV
{
    public interface IUserSV
    {
        ResponseBase<LoginResponse> Login(string user, string pass);
    }
}
