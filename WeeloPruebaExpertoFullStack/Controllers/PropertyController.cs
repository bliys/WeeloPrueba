using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
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
        private readonly IWebHostEnvironment _env;

        public PropertyController(IPropertySV service, IWebHostEnvironment env)
        {
            _service = service;
            _env = env;
        }


        [Authorize]
        [HttpGet("{index}")]
        public IActionResult Get(int index)
        {
            return Ok(_service.ListProperty(index));
        }

        [Authorize]
        [HttpGet("LoadImages")]
        public IActionResult LoadImages(int propertyId)
        {
            return Ok(_service.ListImage(propertyId));
        }

        [Authorize]
        [HttpPost("CreateProperty")]
        public IActionResult Post([FromBody] Property property)
        {
            return Ok(_service.Create(property));
        }

        [Authorize]
        [Consumes("multipart/form-data")]
        [HttpPost("SaveImages"), DisableRequestSizeLimit]
        [RequestFormLimits(ValueCountLimit = Int32.MaxValue)]
        public IActionResult Post([FromForm] SaveImagesRequest Data)
        {            
            return Ok(_service.SaveImage(Data, _env.ContentRootPath));
        }


    }
}
