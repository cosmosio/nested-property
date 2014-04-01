Nested property
=============

Read or write an array or object's nested property via a string like 'my.nested.property'

Installation
============

```bash
npm install nested-property
```

How to use
==========

Require nested-property:

```bash
var nestedProperty = require("nested-property");
```

You can get a nested property from an object:

```js
var object = {
  a: {
    b: {
      c: {
        d: 5
      }
    }
  }
};

nestedProperty.get(object, "a"); // returns object.a
nestedProperty.get(object, "a.b.c"); // returns object.a.b.c
nestedProperty.get(object, "a.b.c.d"); // returns 5
nestedProperty.get(object, "a.d.c"); // returns undefined
nestedProperty.get(object); // returns object
nestedProperty.get(null); // returns null
```

It also works through arrays:

```js
var array = [{
  a: {
    b: [0, 1]
  }
  }];

nestedProperty.get(array, "0"); // returns array[0]
nestedProperty.get(array, "0.a.b"); // returns array[0].a.b
nestedProperty.get(array, "0.a.b.0"); // returns 0
nestedProperty.get(array, "1.a.b.c"); // returns undefined
```

You can set a nested property on an object:

```js
var object = {
  a: {
    b: {
      c: {
        d: 5
      }
    }
  }
};

nestedProperty.set(object, "a", 1); // object.a == 1
nestedProperty.set(object, "a.b.c", 1337); // object.a.b.c == 1337
nestedProperty.set(object, "e.f.g", 1); // object.e.f.g == 1, it creates the missing objects!
nestedProperty.set(object); // returns object
nestedProperty.set(null); // returns null
```

You can also set a nested property through arrays:

```js
var array = [
 {
   a: [0, 1]
 }
];

nestedProperty.set(array, "0.a.0", 10); // array[0].a[0] == 10
nestedProperty.set(array, "0.b.c", 1337); // array[0].b.c == 1337
```

Caveat!

```js
var object = {};
nestedProperty.set(object, "0.1.2", "new object");

// will not create arrays, but objects such as:
{
  "0": {
    "1": {
      "2": "new object"
    }
  }  
}
```

LICENSE
=======

MIT
