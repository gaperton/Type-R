Collection must implement the same transactional set API
 with two phase commit.
 
Add `reset` method to the record. In case of `reset`, record must
  just replace nested attributes.

So, we implementing minimal API.
