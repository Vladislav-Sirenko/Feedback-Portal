using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace FeedbackPortal.API.Services
{
    public static class QueryableExtensions
    {
        public static IQueryable<TTable> WhereIf<TTable>(
            this IQueryable<TTable> query,
            bool condition,
            Expression<Func<TTable, bool>> filter) => condition
            ? query.Where(filter)
            : query;
    }
}
