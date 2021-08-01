using System;
using System.Diagnostics;
using Microsoft.Extensions.DependencyInjection;

namespace WeeloPruebaExpertoFullStack.DA
{

    [DebuggerStepThrough]
    public static class ServiceManager
    {
        static IServiceProvider serviceProvider;

        public static IServiceProvider SetServiceProvider(IServiceProvider serviceProvider) => ServiceManager.serviceProvider = serviceProvider;

        public static object GetInstance(Type type)
        {
            return serviceProvider.GetRequiredService(type);
        }

        public static T GetInstance<T>()
        {
            return (T)GetInstance(typeof(T));

        }
    }
}
