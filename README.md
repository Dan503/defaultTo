# defaultTo
Easily set defaults to an object at multiple depths

`````
npm install default-to --save
`````

This npm plugin is used to rapidly apply defaults to javascript objects.

##JS Usage

This is how you would use it in a javascript file

`````js
var defaultTo = require('default-to');

var example = { one: 1 };

var defaultToExample = defaultTo(example, {
    one: 'one',
    two: 'two',
    three: 'three'
});

//defaultToExample now equals { one: 1, two: 'two', three: 'three'}
`````

The function can also assign defaults to nested objects

`````js
var defaultTo = require('default-to');

var example = {
    one: {
        number: 10,
    }
};

var defaultToExample = defaultTo(example, {
    one: {
        number: 1,
        string: 'one'
    },
    two: {
        number: 2,
        string: 'two'
    }
});
`````

In this case `defaultToExample` would now equal this:

`````js
{
    one: {
        number: 10,
        string: 'one'
    },
    two: {
        number: 2,
        string: 'two'
    }
}
`````

You can also just use it on flat variables

`````js
var example = defaultTo(variable, 'default value');
`````

in the above code snippet, if `variable` is defined,  `example` would equal `variable` else it will equal `'default value'`. It is the equivelant of writing this:

````js
var example = typeof variable !== 'undefined' ? variable : 'default value';
````

##Pug and Jade usage

This npm package also comes with Pug and Jade versions of the function. To use the function in your pug/jade templates add this to the top of your base pug/jade file:

`````jade
include ../../node_modules/default-to/defaultTo
`````

Make sure the path is correct, it will be different depending on your folder structure. It is a relative path from the file it is being included in. Also, note that there is no file extension in the example.

After including that line, you can use it in the same ways that I have used it above except you need to make sure you nest the js inside a js block. This is especially usefull for mixins

``````jade
mixin module(spec)
    -
        spec = defaultTo(spec, {
            classes: {
                outer: 'outer',
                inner: 'inner'
            },
        })
    .module(class=spec.classes.outer)
        .module__inner(class=spec.classes.inner)
``````

##More functionality

These features are only available in the js version and they assume you are able to use ES6 syntax.

###applyDefaults

This is a small variation on the defaultTo function that overides the origional variable without having to reference it first.

`````js
import { applyDefaults } from 'default-to';

var example = { one: 1 };

applyDefaults(example, {
    one: 'one',
    two: 'two',
    three: 'three'
});

//example now equals { one: 1, two: 'two', three: 'three'}
`````

**WARNING!!!** in order to use this version of defaultTo, `example` **must** already be defined as something.

In the standard defaultTo function you can get away with the variable being undefined when parsing it into the function but `applyDefaults` needs to at least have an empty object to be parsed into the function for it to work.

You can get around this by using it like this inside a function when es6 syntax is available to you.

`````````js
function funcName(variable = {}){
    applyDefaults(variable, {
        one: 'one',
        two: 'two',
        three: 'three'
    });
}
`````````

###replaceValues

This is kind of like the inverse of applyDefaults. It is used in the same sort of way as `applyDefaults` but it doesn't bother checking if the value has a predefined default or not. It will just force replace the values instead.

`````js
import { replaceValues } from 'default-to';

var example = {
    one: 'one',
    two: 'two',
    three: 'three'
};

replaceValues(example, {
    one: 1,
});

//example now equals { one: 1, two: 'two', three: 'three'}
`````