'use strict';

var slice = Array.prototype.slice,
  concat = Array.prototype.concat;

/** @module zotero */

/**
 * The `zotero.utils` module is a collection of common
 * utility functions used throughout the library.
 *
 * @class utils
 * @static
 */

/**
 * Extends an object with 1..n other objects.
 *
 * @method extend
 * @static
 *
 * @param {Object} obj The object to extend.
 * @param {Object} source* The source objects used to extend the object.
 *
 * @return {Object} The extended object
 */
exports.extend = function extend(obj) {
  var i, ii, source, prop;

  for (i = 1, ii = arguments.length; i < ii; i++) {
    source = arguments[i];
    for (prop in source) {
      obj[prop] = source[prop];
    }
  }

  return obj;
};

/**
 * Converts all keys of an object to lower case.
 *
 * @method downcase
 * @static
 *
 * @param {Object} obj
 *
 * @return {Object} A copy of `obj` with all keys
 *   converted to lower case
 */
exports.downcase = function downcase(obj) {
  var h, hs = {};

  for (h in obj) {
    hs[h.toLowerCase()] = obj[h];
  }

  return hs;
};

/**
 * Picks the passed-in properties from an object.
 *
 * @method pick
 * @static
 *
 * @param {Object} obj
 * @param {String|Array<String>} keys* The keys to pick.
 *
 * @return {Object} A copy of `obj` containing only the
 *   given `keys`.
 */
exports.pick = function pick(obj) {
  var i, ii, key, result = {},
    keys = concat.apply([], slice.call(arguments, 1));

  for (i = 0, ii = keys.length; i < ii; ++i) {
    key = keys[i];
    if (key in obj) result[key] = obj[key];
  }

  return result;
};

/**
 * Omits the passed-in properties from an object. This
 * is the complementary method to `#pick`.
 *
 * @method omit
 * @static
 *
 * @param {Object} obj
 * @param {String|Array<String>} keys* The keys to omit.
 *
 * @return {Object} A copy of `obj` containing all but
 *   the given `keys`.
 */
exports.omit = function omit(obj) {
  var exclude = concat.apply([], slice.call(arguments, 1));

  return exports.pick(obj, Object.keys(obj).filter(function (key) {
    return exclude.indexOf(key) < 0;
  }));
};


/**
 * Creates a proxy function that executes the passed-in
 * function exactly once when called the first time.
 * Subsequent calls return the result of the first
 * invocation.
 *
 * @method once
 * @static
 *
 * @param {Function} fn The function to call.
 * @return {Function} The wrapped function.
 */
exports.once = function once(fn) {
  if (typeof fn !== 'function')
    throw new Error('only functions can be wrapped by once!');

  return function f() {
    if (fn.called) return fn.value;

    f.called = true;
    f.value  = fn.apply(this, arguments);

    return f.value;
  };
};

exports.find = function find(obj, predicate, ctx) {
  if (typeof predicate !== 'function')
    throw new Error('find predicate must be a function!');

  if (!Array.isArray(obj))
    throw new Error('array expected');

  for (var i = 0, ii = obj.length; i < ii; ++i)
    if (predicate.call(ctx, obj[i], i, obj))
      return obj[i];
};

exports.findIndex = function findIndex(obj, predicate, ctx) {
  if (typeof predicate !== 'function')
    throw new Error('find predicate must be a function!');

  if (!Array.isArray(obj))
    throw new Error('array expected');

  for (var i = 0, ii = obj.length; i < ii; ++i)
    if (predicate.call(ctx, obj[i], i, obj))
      return i;

  return -1;
};

exports.noop = function noop() {};
