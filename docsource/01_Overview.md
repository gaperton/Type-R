React-MVx is built around the idea of _universal state management_ featuring 
the same technique to manage the local component state, application page state,
and the global application state.

Basic building blocks of the application architecture are:

- React-MVx Component (extended React.Component) for the view layer.
- Records and Collection (provided by Type-R data framework) for managing all kinds of an application state.
- Links for two-way data binding.
- Stores (which is the subclass of the Record and can be dynamically created) for resolving record's id-references.

React-MVx Component uses the Record class to manage its local state. Record can consists of other records 
and collections, describing the data structure of arbitrary complexity. All records are serializable by default, has deeply observable changes, and supports the declarative validation.

The behavior of record's attributes and component state/props elements is controlled with declarative _type annotations_. 

React-MVx extends React namespace and should be used instead of `react`.
All class Component definitions must be preceeded with the `@define` decorator.

```javascript
import React, { define } from 'react-mvx'

@define class HelloApp extends React.Component {
    static state = {
        count : 0
    };

    render(){
        const { state } = this;
        return (
            <h1 onClick={ () => state.count++ }>
                Hi there! { state.count }
            </h1>;
        );
    }
}
```