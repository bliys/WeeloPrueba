using Microsoft.Extensions.DependencyInjection;
using System;

namespace WeeloPruebaExpertoFullStack.DA.Helper
{
    public class ServiceProviderFactory : IServiceProviderFactory<IServiceCollection>
    {
        readonly DefaultServiceProviderFactory defaultFactory = new(new ServiceProviderOptions()
        {
            #if DEBUG
            ValidateScopes = true
            #endif
        });

        public IServiceCollection CreateBuilder(IServiceCollection services)
        {
            return defaultFactory.CreateBuilder(services);
        }

        public IServiceProvider CreateServiceProvider(IServiceCollection services)
        {
            var provider = defaultFactory.CreateServiceProvider(services);
            ServiceManager.SetServiceProvider(provider);
            return provider;
        }
    }
}
