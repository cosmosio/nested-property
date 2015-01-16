/**
* @license nested-property https://github.com/cosmosio/nested-property
*
* The MIT License (MIT)
*
* Copyright (c) 2014-2015 Olivier Scherrer <pode.fr@gmail.com>
*/
"use strict";

var assert = require("assert");

module.exports = {
  set: setNestedProperty,
  get: getNestedProperty,
  has: function () {
      var options = arguments[2];
      if (options && options.own) {
          return hasOwnNestedProperty.apply(null, arguments);
      } else {
          return hasNestedProperty.apply(null, arguments);
      }
  },
  hasOwn: hasOwnNestedProperty
};

/**
 * Get the property of an object nested in one or more objects
 * given an object such as a.b.c.d = 5, getNestedProperty(a, "b.c.d") will return 5.
 * @param {Object} object the object to get the property from
 * @param {String} property the path to the property as a string
 * @returns the object or the the property value if found
 */
function getNestedProperty(object, property) {
    if (object && typeof object == "object") {
        if (typeof property == "string" && property !== "") {
            var split = property.split(".");
            return split.reduce(function (obj, prop) {
                return obj && obj[prop];
            }, object);
        } else if (typeof property == "number") {
            return object[property];
        } else {
            return object;
        }
    } else {
        return object;
    }
}

/**
 * Tell if a nested object has a given property (or array a given index)
 * given an object such as a.b.c.d = 5, hasNestedProperty(a, "b.c.d") will return true.
 * It also returns true if the property is in the prototype chain.
 * @param {Object} object the object to get the property from
 * @param {String} property the path to the property as a string
 * @returns true if has (property in object), false otherwise
 */
function hasNestedProperty(object, property) {
    return accessProperty(object, property, function (obj, prop, idx, array) {
        if (idx == array.length - 1) {
            return !!(obj !== null && typeof obj == "object" && prop in obj);
        }
        return obj && obj[prop];
    });
}

/**
 * Tell if a nested object has a given own property (or array a given index)
 * given an object such as a.b.c.d = 5, hasNestedProperty(a, "b.c.d") will return true.
 * It return false if the property is in the prototype chain.
 * @param {Object} object the object to get the property from
 * @param {String} property the path to the property as a string
 * @returns true if has (property in object), false otherwise
 */
function hasOwnNestedProperty(object, property) {
    return accessProperty(object, property, function (obj, prop, idx, array) {
        if (idx == array.length - 1) {
            return !!(obj && obj.hasOwnProperty(prop));
        }
        return obj && obj[prop];
    });
}

function accessProperty(object, property, callback) {
    if (object && typeof object == "object") {
        if (typeof property == "string" && property !== "") {
            var split = property.split(".");
            return split.reduce(callback, object);
        } else if (typeof property == "number") {
            return property in object;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

/**
 * Set the property of an object nested in one or more objects
 * If the property doesn't exist, it gets created.
 * @param {Object} object
 * @param {String} property
 * @param value the value to set
 * @returns object if no assignment was made or the value if the assignment was made
 */
function setNestedProperty(object, property, value) {
    if (object && typeof object == "object") {
        if (typeof property == "string" && property !== "") {
            var split = property.split(".");
            return split.reduce(function (obj, prop, idx) {
                obj[prop] = obj[prop] || {};
                if (split.length == (idx + 1)) {
                    obj[prop] = value;
                }
                return obj[prop];
            }, object);
        } else if (typeof property == "number") {
            object[property] = value;
            return object[property];
        } else {
            return object;
        }
    } else {
        return object;
    }
}
