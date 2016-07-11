# Plans

## Backbone Regression Tests

Should pass to some extent. Negotiable.

## NestedTypes Regression Tests

Should pass all tests.

## Performance tests

### Nested Checklist

Ultimate test for aggregation infrastructure.

Should be deep and wide.
10 elements per level, with 5 levels will give us 100K elements in total.

Should measure:

- initialization
- update with no changes
- update with all changed
- single attribute at the top
- single attribute at the bottom

Compare versus NestedTypes 1.3.
2x speedup is moderate success.
5x speedup will be considered as good result.
Higher than that - brilliant, miracle, and surprise. 

### Regression

Should be not worser than NestedTypes 1.3.

### Users and Roles from Observer

10K users table according to the Observer structure
Minimal acceptable goal is sub-second response time.