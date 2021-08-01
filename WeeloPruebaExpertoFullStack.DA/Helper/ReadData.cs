using System;
using System.Collections;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using System.Data.Common;

namespace WeeloPruebaExpertoFullStack.DA.Helper
{
    public class ReadData
    {
        public static T Materialize<T>(IDataRecord record) where T : new()
        {
            T t = new();
            object dbValue = null;
            foreach (var prop in typeof(T).GetProperties())
            {
                if (prop.PropertyType.Namespace == typeof(T).Namespace)
                    continue;

                if (prop.PropertyType != typeof(string) && typeof(IEnumerable).IsAssignableFrom(prop.PropertyType))
                    continue;

                if (Attribute.IsDefined(prop, typeof(NotMappedAttribute)))
                    continue;

                for (int i = 0; i < record.FieldCount; i++)
                {
                    if (record.GetName(i).Equals(prop.Name, StringComparison.InvariantCultureIgnoreCase))
                    {
                        dbValue = record[prop.Name];
                        break;
                    }
                }

                if (dbValue is DBNull || dbValue is null) continue;
                if (prop.PropertyType.IsConstructedGenericType &&
                   prop.PropertyType.GetGenericTypeDefinition() == typeof(Nullable<>))
                {
                    var baseType = prop.PropertyType.GetGenericArguments()[0];
                    var baseValue = Convert.ChangeType(dbValue, baseType);
                    var value = Activator.CreateInstance(prop.PropertyType, baseValue);
                    prop.SetValue(t, value);
                    dbValue = null;
                }
                else
                {
                    var value = Convert.ChangeType(dbValue, prop.PropertyType);
                    prop.SetValue(t, value);
                    dbValue = null;
                }
            }
            return t;
        }

    }
    public static class DataRecordExtentions
    {
        private static readonly ConcurrentDictionary<Type, object> _materializers = new ConcurrentDictionary<Type, object>();
        public static IList<T> Translate<T>(this DbDataReader reader) where T : new()
        {
            var materializer = (Func<IDataRecord, T>)_materializers.GetOrAdd(typeof(T), (Func<IDataRecord, T>)ReadData.Materialize<T>);
            return Translate(reader, materializer, out var hasNextResults);
        }

        public static IList<T> Translate<T>(this DbDataReader reader, Func<IDataRecord, T> objectMaterializer)
        {
            return Translate(reader, objectMaterializer, out var hasNextResults);
        }

        public static IList<T> Translate<T>(this DbDataReader reader, Func<IDataRecord, T> objectMaterializer, out bool hasNextResults)
        {
            var results = new List<T>();
            while (reader.Read())
            {
                var record = (IDataRecord)reader;
                var obj = objectMaterializer(record);
                results.Add(obj);
            }
            hasNextResults = reader.NextResult();
            return results;
        }
    }
}
