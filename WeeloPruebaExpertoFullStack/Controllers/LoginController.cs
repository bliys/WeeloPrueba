using Microsoft.AspNetCore.Mvc;
using WeeloPruebaExpertoFullStack.ET.Request;
using WeeloPruebaExpertoFullStack.SV.UserSV;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WeeloPruebaExpertoFullStack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IUserSV _UserService;
        public LoginController(IUserSV userService)
        {
            _UserService = userService;
        }

        // POST api/<LoginController>
        [HttpPost]
        public IActionResult Post([FromBody] LoginRequest loginRequest)
        {
            return Ok(_UserService.Login(loginRequest.User, loginRequest.Password));
        }
    }
}
