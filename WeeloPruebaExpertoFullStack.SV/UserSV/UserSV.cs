using Microsoft.Extensions.Options;
using WeeloPruebaExpertoFullStack.DA.UserDA;
using WeeloPruebaExpertoFullStack.ET.Response;
using WeeloPruebaExpertoFullStack.SV.Security;

namespace WeeloPruebaExpertoFullStack.SV.UserSV
{
    public class UserSV : IUserSV
    {
        readonly UserDA userDA = new();
        readonly JwtSettings _jwtSettings = new();

        public UserSV(IOptions<JwtSettings> jwtSettings)
        {
            _jwtSettings = jwtSettings.Value;
        }
        public ResponseBase<LoginResponse> Login(string user, string pass)
        {
            LoginResponse loginResponse = null;
            var result = userDA.Login(user, pass);
            if (result != null)
                loginResponse = new() { IdUser = result.IdUser, Token = Token.GenerateJwtToken(result, _jwtSettings.Secret) };
            return new ResponseBase<LoginResponse>() { Data = loginResponse };
        }
    }
}
