using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using WeeloPruebaExpertoFullStack.ET.PropertyET;
using WeeloPruebaExpertoFullStack.SV.PropertySV;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WeeloPruebaExpertoFullStack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PropertyController : ControllerBase
    {
        private IPropertySV _service;

        public PropertyController(IPropertySV service)
        {
            _service = service;
        }


        [Authorize]
        [HttpGet("{index}")]
        public IActionResult Get(int index)
        {
            return Ok(_service.ListProperty(index));
        }

        [Authorize]
        [HttpPost("CreateProperty")]
        public IActionResult Post([FromBody] Property property)
        {
            return Ok(_service.Create(property));
        }

    }
}
