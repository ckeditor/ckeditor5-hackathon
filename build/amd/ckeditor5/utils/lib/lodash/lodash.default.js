define(['exports', './array.js', './collection.js', './date.js', './function.js', './lang.js', './math.js', './number.js', './object.js', './seq.js', './string.js', './util.js', './_LazyWrapper.js', './_LodashWrapper.js', './_Symbol.js', './_arrayEach.js', './_arrayPush.js', './_baseForOwn.js', './_baseFunctions.js', './_baseInvoke.js', './_baseIteratee.js', './_createHybridWrapper.js', './identity.js', './isArray.js', './isObject.js', './keys.js', './last.js', './_lazyClone.js', './_lazyReverse.js', './_lazyValue.js', './mixin.js', './_realNames.js', './rest.js', './thru.js', './toInteger.js', './wrapperLodash.js'], function (exports, _array, _collection, _date, _function, _lang, _math, _number, _object, _seq, _string, _util, _LazyWrapper, _LodashWrapper, _Symbol, _arrayEach, _arrayPush, _baseForOwn, _baseFunctions, _baseInvoke, _baseIteratee, _createHybridWrapper, _identity, _isArray, _isObject, _keys, _last, _lazyClone, _lazyReverse, _lazyValue, _mixin2, _realNames, _rest, _thru, _toInteger, _wrapperLodash) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _array2 = _interopRequireDefault(_array);

  var _collection2 = _interopRequireDefault(_collection);

  var _date2 = _interopRequireDefault(_date);

  var _function2 = _interopRequireDefault(_function);

  var _lang2 = _interopRequireDefault(_lang);

  var _math2 = _interopRequireDefault(_math);

  var _number2 = _interopRequireDefault(_number);

  var _object2 = _interopRequireDefault(_object);

  var _seq2 = _interopRequireDefault(_seq);

  var _string2 = _interopRequireDefault(_string);

  var _util2 = _interopRequireDefault(_util);

  var _LazyWrapper2 = _interopRequireDefault(_LazyWrapper);

  var _LodashWrapper2 = _interopRequireDefault(_LodashWrapper);

  var _Symbol2 = _interopRequireDefault(_Symbol);

  var _arrayEach2 = _interopRequireDefault(_arrayEach);

  var _arrayPush2 = _interopRequireDefault(_arrayPush);

  var _baseForOwn2 = _interopRequireDefault(_baseForOwn);

  var _baseFunctions2 = _interopRequireDefault(_baseFunctions);

  var _baseInvoke2 = _interopRequireDefault(_baseInvoke);

  var _baseIteratee2 = _interopRequireDefault(_baseIteratee);

  var _createHybridWrapper2 = _interopRequireDefault(_createHybridWrapper);

  var _identity2 = _interopRequireDefault(_identity);

  var _isArray2 = _interopRequireDefault(_isArray);

  var _isObject2 = _interopRequireDefault(_isObject);

  var _keys2 = _interopRequireDefault(_keys);

  var _last2 = _interopRequireDefault(_last);

  var _lazyClone2 = _interopRequireDefault(_lazyClone);

  var _lazyReverse2 = _interopRequireDefault(_lazyReverse);

  var _lazyValue2 = _interopRequireDefault(_lazyValue);

  var _mixin3 = _interopRequireDefault(_mixin2);

  var _realNames2 = _interopRequireDefault(_realNames);

  var _rest2 = _interopRequireDefault(_rest);

  var _thru2 = _interopRequireDefault(_thru);

  var _toInteger2 = _interopRequireDefault(_toInteger);

  var _wrapperLodash2 = _interopRequireDefault(_wrapperLodash);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /** Used as the semantic version number. */
  var VERSION = '4.12.0';

  /** Used to compose bitmasks for wrapper metadata. */
  /**
   * @license
   * lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="es" --development --output src/lib/lodash`
   * Copyright jQuery Foundation and other contributors <https://jquery.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   */
  var BIND_KEY_FLAG = 2;

  /** Used to indicate the type of lazy iteratees. */
  var LAZY_FILTER_FLAG = 1,
      LAZY_WHILE_FLAG = 3;

  /** Used as references for the maximum length and index of an array. */
  var MAX_ARRAY_LENGTH = 4294967295;

  /** Used for built-in method references. */
  var arrayProto = Array.prototype,
      objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /** Built-in value references. */
  var iteratorSymbol = typeof (iteratorSymbol = _Symbol2.default && _Symbol2.default.iterator) == 'symbol' ? iteratorSymbol : undefined;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMax = Math.max,
      nativeMin = Math.min;

  // wrap `_.mixin` so it works when provided only one argument
  var mixin = function (func) {
    return function (object, source, options) {
      if (options == null) {
        var isObj = (0, _isObject2.default)(source),
            props = isObj && (0, _keys2.default)(source),
            methodNames = props && props.length && (0, _baseFunctions2.default)(source, props);

        if (!(methodNames ? methodNames.length : isObj)) {
          options = source;
          source = object;
          object = this;
        }
      }
      return func(object, source, options);
    };
  }(_mixin3.default);

  // Add methods that return wrapped values in chain sequences.
  _wrapperLodash2.default.after = _function2.default.after;
  _wrapperLodash2.default.ary = _function2.default.ary;
  _wrapperLodash2.default.assign = _object2.default.assign;
  _wrapperLodash2.default.assignIn = _object2.default.assignIn;
  _wrapperLodash2.default.assignInWith = _object2.default.assignInWith;
  _wrapperLodash2.default.assignWith = _object2.default.assignWith;
  _wrapperLodash2.default.at = _collection2.default.at;
  _wrapperLodash2.default.before = _function2.default.before;
  _wrapperLodash2.default.bind = _function2.default.bind;
  _wrapperLodash2.default.bindAll = _util2.default.bindAll;
  _wrapperLodash2.default.bindKey = _function2.default.bindKey;
  _wrapperLodash2.default.castArray = _lang2.default.castArray;
  _wrapperLodash2.default.chain = _seq2.default.chain;
  _wrapperLodash2.default.chunk = _array2.default.chunk;
  _wrapperLodash2.default.compact = _array2.default.compact;
  _wrapperLodash2.default.concat = _array2.default.concat;
  _wrapperLodash2.default.cond = _util2.default.cond;
  _wrapperLodash2.default.conforms = _util2.default.conforms;
  _wrapperLodash2.default.constant = _util2.default.constant;
  _wrapperLodash2.default.countBy = _collection2.default.countBy;
  _wrapperLodash2.default.create = _object2.default.create;
  _wrapperLodash2.default.curry = _function2.default.curry;
  _wrapperLodash2.default.curryRight = _function2.default.curryRight;
  _wrapperLodash2.default.debounce = _function2.default.debounce;
  _wrapperLodash2.default.defaults = _object2.default.defaults;
  _wrapperLodash2.default.defaultsDeep = _object2.default.defaultsDeep;
  _wrapperLodash2.default.defer = _function2.default.defer;
  _wrapperLodash2.default.delay = _function2.default.delay;
  _wrapperLodash2.default.difference = _array2.default.difference;
  _wrapperLodash2.default.differenceBy = _array2.default.differenceBy;
  _wrapperLodash2.default.differenceWith = _array2.default.differenceWith;
  _wrapperLodash2.default.drop = _array2.default.drop;
  _wrapperLodash2.default.dropRight = _array2.default.dropRight;
  _wrapperLodash2.default.dropRightWhile = _array2.default.dropRightWhile;
  _wrapperLodash2.default.dropWhile = _array2.default.dropWhile;
  _wrapperLodash2.default.fill = _array2.default.fill;
  _wrapperLodash2.default.filter = _collection2.default.filter;
  _wrapperLodash2.default.flatMap = _collection2.default.flatMap;
  _wrapperLodash2.default.flatMapDeep = _collection2.default.flatMapDeep;
  _wrapperLodash2.default.flatMapDepth = _collection2.default.flatMapDepth;
  _wrapperLodash2.default.flatten = _array2.default.flatten;
  _wrapperLodash2.default.flattenDeep = _array2.default.flattenDeep;
  _wrapperLodash2.default.flattenDepth = _array2.default.flattenDepth;
  _wrapperLodash2.default.flip = _function2.default.flip;
  _wrapperLodash2.default.flow = _util2.default.flow;
  _wrapperLodash2.default.flowRight = _util2.default.flowRight;
  _wrapperLodash2.default.fromPairs = _array2.default.fromPairs;
  _wrapperLodash2.default.functions = _object2.default.functions;
  _wrapperLodash2.default.functionsIn = _object2.default.functionsIn;
  _wrapperLodash2.default.groupBy = _collection2.default.groupBy;
  _wrapperLodash2.default.initial = _array2.default.initial;
  _wrapperLodash2.default.intersection = _array2.default.intersection;
  _wrapperLodash2.default.intersectionBy = _array2.default.intersectionBy;
  _wrapperLodash2.default.intersectionWith = _array2.default.intersectionWith;
  _wrapperLodash2.default.invert = _object2.default.invert;
  _wrapperLodash2.default.invertBy = _object2.default.invertBy;
  _wrapperLodash2.default.invokeMap = _collection2.default.invokeMap;
  _wrapperLodash2.default.iteratee = _util2.default.iteratee;
  _wrapperLodash2.default.keyBy = _collection2.default.keyBy;
  _wrapperLodash2.default.keys = _keys2.default;
  _wrapperLodash2.default.keysIn = _object2.default.keysIn;
  _wrapperLodash2.default.map = _collection2.default.map;
  _wrapperLodash2.default.mapKeys = _object2.default.mapKeys;
  _wrapperLodash2.default.mapValues = _object2.default.mapValues;
  _wrapperLodash2.default.matches = _util2.default.matches;
  _wrapperLodash2.default.matchesProperty = _util2.default.matchesProperty;
  _wrapperLodash2.default.memoize = _function2.default.memoize;
  _wrapperLodash2.default.merge = _object2.default.merge;
  _wrapperLodash2.default.mergeWith = _object2.default.mergeWith;
  _wrapperLodash2.default.method = _util2.default.method;
  _wrapperLodash2.default.methodOf = _util2.default.methodOf;
  _wrapperLodash2.default.mixin = mixin;
  _wrapperLodash2.default.negate = _function2.default.negate;
  _wrapperLodash2.default.nthArg = _util2.default.nthArg;
  _wrapperLodash2.default.omit = _object2.default.omit;
  _wrapperLodash2.default.omitBy = _object2.default.omitBy;
  _wrapperLodash2.default.once = _function2.default.once;
  _wrapperLodash2.default.orderBy = _collection2.default.orderBy;
  _wrapperLodash2.default.over = _util2.default.over;
  _wrapperLodash2.default.overArgs = _function2.default.overArgs;
  _wrapperLodash2.default.overEvery = _util2.default.overEvery;
  _wrapperLodash2.default.overSome = _util2.default.overSome;
  _wrapperLodash2.default.partial = _function2.default.partial;
  _wrapperLodash2.default.partialRight = _function2.default.partialRight;
  _wrapperLodash2.default.partition = _collection2.default.partition;
  _wrapperLodash2.default.pick = _object2.default.pick;
  _wrapperLodash2.default.pickBy = _object2.default.pickBy;
  _wrapperLodash2.default.property = _util2.default.property;
  _wrapperLodash2.default.propertyOf = _util2.default.propertyOf;
  _wrapperLodash2.default.pull = _array2.default.pull;
  _wrapperLodash2.default.pullAll = _array2.default.pullAll;
  _wrapperLodash2.default.pullAllBy = _array2.default.pullAllBy;
  _wrapperLodash2.default.pullAllWith = _array2.default.pullAllWith;
  _wrapperLodash2.default.pullAt = _array2.default.pullAt;
  _wrapperLodash2.default.range = _util2.default.range;
  _wrapperLodash2.default.rangeRight = _util2.default.rangeRight;
  _wrapperLodash2.default.rearg = _function2.default.rearg;
  _wrapperLodash2.default.reject = _collection2.default.reject;
  _wrapperLodash2.default.remove = _array2.default.remove;
  _wrapperLodash2.default.rest = _rest2.default;
  _wrapperLodash2.default.reverse = _array2.default.reverse;
  _wrapperLodash2.default.sampleSize = _collection2.default.sampleSize;
  _wrapperLodash2.default.set = _object2.default.set;
  _wrapperLodash2.default.setWith = _object2.default.setWith;
  _wrapperLodash2.default.shuffle = _collection2.default.shuffle;
  _wrapperLodash2.default.slice = _array2.default.slice;
  _wrapperLodash2.default.sortBy = _collection2.default.sortBy;
  _wrapperLodash2.default.sortedUniq = _array2.default.sortedUniq;
  _wrapperLodash2.default.sortedUniqBy = _array2.default.sortedUniqBy;
  _wrapperLodash2.default.split = _string2.default.split;
  _wrapperLodash2.default.spread = _function2.default.spread;
  _wrapperLodash2.default.tail = _array2.default.tail;
  _wrapperLodash2.default.take = _array2.default.take;
  _wrapperLodash2.default.takeRight = _array2.default.takeRight;
  _wrapperLodash2.default.takeRightWhile = _array2.default.takeRightWhile;
  _wrapperLodash2.default.takeWhile = _array2.default.takeWhile;
  _wrapperLodash2.default.tap = _seq2.default.tap;
  _wrapperLodash2.default.throttle = _function2.default.throttle;
  _wrapperLodash2.default.thru = _thru2.default;
  _wrapperLodash2.default.toArray = _lang2.default.toArray;
  _wrapperLodash2.default.toPairs = _object2.default.toPairs;
  _wrapperLodash2.default.toPairsIn = _object2.default.toPairsIn;
  _wrapperLodash2.default.toPath = _util2.default.toPath;
  _wrapperLodash2.default.toPlainObject = _lang2.default.toPlainObject;
  _wrapperLodash2.default.transform = _object2.default.transform;
  _wrapperLodash2.default.unary = _function2.default.unary;
  _wrapperLodash2.default.union = _array2.default.union;
  _wrapperLodash2.default.unionBy = _array2.default.unionBy;
  _wrapperLodash2.default.unionWith = _array2.default.unionWith;
  _wrapperLodash2.default.uniq = _array2.default.uniq;
  _wrapperLodash2.default.uniqBy = _array2.default.uniqBy;
  _wrapperLodash2.default.uniqWith = _array2.default.uniqWith;
  _wrapperLodash2.default.unset = _object2.default.unset;
  _wrapperLodash2.default.unzip = _array2.default.unzip;
  _wrapperLodash2.default.unzipWith = _array2.default.unzipWith;
  _wrapperLodash2.default.update = _object2.default.update;
  _wrapperLodash2.default.updateWith = _object2.default.updateWith;
  _wrapperLodash2.default.values = _object2.default.values;
  _wrapperLodash2.default.valuesIn = _object2.default.valuesIn;
  _wrapperLodash2.default.without = _array2.default.without;
  _wrapperLodash2.default.words = _string2.default.words;
  _wrapperLodash2.default.wrap = _function2.default.wrap;
  _wrapperLodash2.default.xor = _array2.default.xor;
  _wrapperLodash2.default.xorBy = _array2.default.xorBy;
  _wrapperLodash2.default.xorWith = _array2.default.xorWith;
  _wrapperLodash2.default.zip = _array2.default.zip;
  _wrapperLodash2.default.zipObject = _array2.default.zipObject;
  _wrapperLodash2.default.zipObjectDeep = _array2.default.zipObjectDeep;
  _wrapperLodash2.default.zipWith = _array2.default.zipWith;

  // Add aliases.
  _wrapperLodash2.default.entries = _object2.default.toPairs;
  _wrapperLodash2.default.entriesIn = _object2.default.toPairsIn;
  _wrapperLodash2.default.extend = _object2.default.assignIn;
  _wrapperLodash2.default.extendWith = _object2.default.assignInWith;

  // Add methods to `lodash.prototype`.
  mixin(_wrapperLodash2.default, _wrapperLodash2.default);

  // Add methods that return unwrapped values in chain sequences.
  _wrapperLodash2.default.add = _math2.default.add;
  _wrapperLodash2.default.attempt = _util2.default.attempt;
  _wrapperLodash2.default.camelCase = _string2.default.camelCase;
  _wrapperLodash2.default.capitalize = _string2.default.capitalize;
  _wrapperLodash2.default.ceil = _math2.default.ceil;
  _wrapperLodash2.default.clamp = _number2.default.clamp;
  _wrapperLodash2.default.clone = _lang2.default.clone;
  _wrapperLodash2.default.cloneDeep = _lang2.default.cloneDeep;
  _wrapperLodash2.default.cloneDeepWith = _lang2.default.cloneDeepWith;
  _wrapperLodash2.default.cloneWith = _lang2.default.cloneWith;
  _wrapperLodash2.default.deburr = _string2.default.deburr;
  _wrapperLodash2.default.divide = _math2.default.divide;
  _wrapperLodash2.default.endsWith = _string2.default.endsWith;
  _wrapperLodash2.default.eq = _lang2.default.eq;
  _wrapperLodash2.default.escape = _string2.default.escape;
  _wrapperLodash2.default.escapeRegExp = _string2.default.escapeRegExp;
  _wrapperLodash2.default.every = _collection2.default.every;
  _wrapperLodash2.default.find = _collection2.default.find;
  _wrapperLodash2.default.findIndex = _array2.default.findIndex;
  _wrapperLodash2.default.findKey = _object2.default.findKey;
  _wrapperLodash2.default.findLast = _collection2.default.findLast;
  _wrapperLodash2.default.findLastIndex = _array2.default.findLastIndex;
  _wrapperLodash2.default.findLastKey = _object2.default.findLastKey;
  _wrapperLodash2.default.floor = _math2.default.floor;
  _wrapperLodash2.default.forEach = _collection2.default.forEach;
  _wrapperLodash2.default.forEachRight = _collection2.default.forEachRight;
  _wrapperLodash2.default.forIn = _object2.default.forIn;
  _wrapperLodash2.default.forInRight = _object2.default.forInRight;
  _wrapperLodash2.default.forOwn = _object2.default.forOwn;
  _wrapperLodash2.default.forOwnRight = _object2.default.forOwnRight;
  _wrapperLodash2.default.get = _object2.default.get;
  _wrapperLodash2.default.gt = _lang2.default.gt;
  _wrapperLodash2.default.gte = _lang2.default.gte;
  _wrapperLodash2.default.has = _object2.default.has;
  _wrapperLodash2.default.hasIn = _object2.default.hasIn;
  _wrapperLodash2.default.head = _array2.default.head;
  _wrapperLodash2.default.identity = _identity2.default;
  _wrapperLodash2.default.includes = _collection2.default.includes;
  _wrapperLodash2.default.indexOf = _array2.default.indexOf;
  _wrapperLodash2.default.inRange = _number2.default.inRange;
  _wrapperLodash2.default.invoke = _object2.default.invoke;
  _wrapperLodash2.default.isArguments = _lang2.default.isArguments;
  _wrapperLodash2.default.isArray = _isArray2.default;
  _wrapperLodash2.default.isArrayBuffer = _lang2.default.isArrayBuffer;
  _wrapperLodash2.default.isArrayLike = _lang2.default.isArrayLike;
  _wrapperLodash2.default.isArrayLikeObject = _lang2.default.isArrayLikeObject;
  _wrapperLodash2.default.isBoolean = _lang2.default.isBoolean;
  _wrapperLodash2.default.isBuffer = _lang2.default.isBuffer;
  _wrapperLodash2.default.isDate = _lang2.default.isDate;
  _wrapperLodash2.default.isElement = _lang2.default.isElement;
  _wrapperLodash2.default.isEmpty = _lang2.default.isEmpty;
  _wrapperLodash2.default.isEqual = _lang2.default.isEqual;
  _wrapperLodash2.default.isEqualWith = _lang2.default.isEqualWith;
  _wrapperLodash2.default.isError = _lang2.default.isError;
  _wrapperLodash2.default.isFinite = _lang2.default.isFinite;
  _wrapperLodash2.default.isFunction = _lang2.default.isFunction;
  _wrapperLodash2.default.isInteger = _lang2.default.isInteger;
  _wrapperLodash2.default.isLength = _lang2.default.isLength;
  _wrapperLodash2.default.isMap = _lang2.default.isMap;
  _wrapperLodash2.default.isMatch = _lang2.default.isMatch;
  _wrapperLodash2.default.isMatchWith = _lang2.default.isMatchWith;
  _wrapperLodash2.default.isNaN = _lang2.default.isNaN;
  _wrapperLodash2.default.isNative = _lang2.default.isNative;
  _wrapperLodash2.default.isNil = _lang2.default.isNil;
  _wrapperLodash2.default.isNull = _lang2.default.isNull;
  _wrapperLodash2.default.isNumber = _lang2.default.isNumber;
  _wrapperLodash2.default.isObject = _isObject2.default;
  _wrapperLodash2.default.isObjectLike = _lang2.default.isObjectLike;
  _wrapperLodash2.default.isPlainObject = _lang2.default.isPlainObject;
  _wrapperLodash2.default.isRegExp = _lang2.default.isRegExp;
  _wrapperLodash2.default.isSafeInteger = _lang2.default.isSafeInteger;
  _wrapperLodash2.default.isSet = _lang2.default.isSet;
  _wrapperLodash2.default.isString = _lang2.default.isString;
  _wrapperLodash2.default.isSymbol = _lang2.default.isSymbol;
  _wrapperLodash2.default.isTypedArray = _lang2.default.isTypedArray;
  _wrapperLodash2.default.isUndefined = _lang2.default.isUndefined;
  _wrapperLodash2.default.isWeakMap = _lang2.default.isWeakMap;
  _wrapperLodash2.default.isWeakSet = _lang2.default.isWeakSet;
  _wrapperLodash2.default.join = _array2.default.join;
  _wrapperLodash2.default.kebabCase = _string2.default.kebabCase;
  _wrapperLodash2.default.last = _last2.default;
  _wrapperLodash2.default.lastIndexOf = _array2.default.lastIndexOf;
  _wrapperLodash2.default.lowerCase = _string2.default.lowerCase;
  _wrapperLodash2.default.lowerFirst = _string2.default.lowerFirst;
  _wrapperLodash2.default.lt = _lang2.default.lt;
  _wrapperLodash2.default.lte = _lang2.default.lte;
  _wrapperLodash2.default.max = _math2.default.max;
  _wrapperLodash2.default.maxBy = _math2.default.maxBy;
  _wrapperLodash2.default.mean = _math2.default.mean;
  _wrapperLodash2.default.meanBy = _math2.default.meanBy;
  _wrapperLodash2.default.min = _math2.default.min;
  _wrapperLodash2.default.minBy = _math2.default.minBy;
  _wrapperLodash2.default.multiply = _math2.default.multiply;
  _wrapperLodash2.default.nth = _array2.default.nth;
  _wrapperLodash2.default.noop = _util2.default.noop;
  _wrapperLodash2.default.now = _date2.default.now;
  _wrapperLodash2.default.pad = _string2.default.pad;
  _wrapperLodash2.default.padEnd = _string2.default.padEnd;
  _wrapperLodash2.default.padStart = _string2.default.padStart;
  _wrapperLodash2.default.parseInt = _string2.default.parseInt;
  _wrapperLodash2.default.random = _number2.default.random;
  _wrapperLodash2.default.reduce = _collection2.default.reduce;
  _wrapperLodash2.default.reduceRight = _collection2.default.reduceRight;
  _wrapperLodash2.default.repeat = _string2.default.repeat;
  _wrapperLodash2.default.replace = _string2.default.replace;
  _wrapperLodash2.default.result = _object2.default.result;
  _wrapperLodash2.default.round = _math2.default.round;
  _wrapperLodash2.default.sample = _collection2.default.sample;
  _wrapperLodash2.default.size = _collection2.default.size;
  _wrapperLodash2.default.snakeCase = _string2.default.snakeCase;
  _wrapperLodash2.default.some = _collection2.default.some;
  _wrapperLodash2.default.sortedIndex = _array2.default.sortedIndex;
  _wrapperLodash2.default.sortedIndexBy = _array2.default.sortedIndexBy;
  _wrapperLodash2.default.sortedIndexOf = _array2.default.sortedIndexOf;
  _wrapperLodash2.default.sortedLastIndex = _array2.default.sortedLastIndex;
  _wrapperLodash2.default.sortedLastIndexBy = _array2.default.sortedLastIndexBy;
  _wrapperLodash2.default.sortedLastIndexOf = _array2.default.sortedLastIndexOf;
  _wrapperLodash2.default.startCase = _string2.default.startCase;
  _wrapperLodash2.default.startsWith = _string2.default.startsWith;
  _wrapperLodash2.default.subtract = _math2.default.subtract;
  _wrapperLodash2.default.sum = _math2.default.sum;
  _wrapperLodash2.default.sumBy = _math2.default.sumBy;
  _wrapperLodash2.default.template = _string2.default.template;
  _wrapperLodash2.default.times = _util2.default.times;
  _wrapperLodash2.default.toFinite = _lang2.default.toFinite;
  _wrapperLodash2.default.toInteger = _toInteger2.default;
  _wrapperLodash2.default.toLength = _lang2.default.toLength;
  _wrapperLodash2.default.toLower = _string2.default.toLower;
  _wrapperLodash2.default.toNumber = _lang2.default.toNumber;
  _wrapperLodash2.default.toSafeInteger = _lang2.default.toSafeInteger;
  _wrapperLodash2.default.toString = _lang2.default.toString;
  _wrapperLodash2.default.toUpper = _string2.default.toUpper;
  _wrapperLodash2.default.trim = _string2.default.trim;
  _wrapperLodash2.default.trimEnd = _string2.default.trimEnd;
  _wrapperLodash2.default.trimStart = _string2.default.trimStart;
  _wrapperLodash2.default.truncate = _string2.default.truncate;
  _wrapperLodash2.default.unescape = _string2.default.unescape;
  _wrapperLodash2.default.uniqueId = _util2.default.uniqueId;
  _wrapperLodash2.default.upperCase = _string2.default.upperCase;
  _wrapperLodash2.default.upperFirst = _string2.default.upperFirst;

  // Add aliases.
  _wrapperLodash2.default.each = _collection2.default.forEach;
  _wrapperLodash2.default.eachRight = _collection2.default.forEachRight;
  _wrapperLodash2.default.first = _array2.default.head;

  mixin(_wrapperLodash2.default, function () {
    var source = {};
    (0, _baseForOwn2.default)(_wrapperLodash2.default, function (func, methodName) {
      if (!hasOwnProperty.call(_wrapperLodash2.default.prototype, methodName)) {
        source[methodName] = func;
      }
    });
    return source;
  }(), { 'chain': false });

  /**
   * The semantic version number.
   *
   * @static
   * @memberOf _
   * @type {string}
   */
  _wrapperLodash2.default.VERSION = VERSION;
  (_wrapperLodash2.default.templateSettings = _string2.default.templateSettings).imports._ = _wrapperLodash2.default;

  // Assign default placeholders.
  (0, _arrayEach2.default)(['bind', 'bindKey', 'curry', 'curryRight', 'partial', 'partialRight'], function (methodName) {
    _wrapperLodash2.default[methodName].placeholder = _wrapperLodash2.default;
  });

  // Add `LazyWrapper` methods for `_.drop` and `_.take` variants.
  (0, _arrayEach2.default)(['drop', 'take'], function (methodName, index) {
    _LazyWrapper2.default.prototype[methodName] = function (n) {
      var filtered = this.__filtered__;
      if (filtered && !index) {
        return new _LazyWrapper2.default(this);
      }
      n = n === undefined ? 1 : nativeMax((0, _toInteger2.default)(n), 0);

      var result = this.clone();
      if (filtered) {
        result.__takeCount__ = nativeMin(n, result.__takeCount__);
      } else {
        result.__views__.push({
          'size': nativeMin(n, MAX_ARRAY_LENGTH),
          'type': methodName + (result.__dir__ < 0 ? 'Right' : '')
        });
      }
      return result;
    };

    _LazyWrapper2.default.prototype[methodName + 'Right'] = function (n) {
      return this.reverse()[methodName](n).reverse();
    };
  });

  // Add `LazyWrapper` methods that accept an `iteratee` value.
  (0, _arrayEach2.default)(['filter', 'map', 'takeWhile'], function (methodName, index) {
    var type = index + 1,
        isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;

    _LazyWrapper2.default.prototype[methodName] = function (iteratee) {
      var result = this.clone();
      result.__iteratees__.push({
        'iteratee': (0, _baseIteratee2.default)(iteratee, 3),
        'type': type
      });
      result.__filtered__ = result.__filtered__ || isFilter;
      return result;
    };
  });

  // Add `LazyWrapper` methods for `_.head` and `_.last`.
  (0, _arrayEach2.default)(['head', 'last'], function (methodName, index) {
    var takeName = 'take' + (index ? 'Right' : '');

    _LazyWrapper2.default.prototype[methodName] = function () {
      return this[takeName](1).value()[0];
    };
  });

  // Add `LazyWrapper` methods for `_.initial` and `_.tail`.
  (0, _arrayEach2.default)(['initial', 'tail'], function (methodName, index) {
    var dropName = 'drop' + (index ? '' : 'Right');

    _LazyWrapper2.default.prototype[methodName] = function () {
      return this.__filtered__ ? new _LazyWrapper2.default(this) : this[dropName](1);
    };
  });

  _LazyWrapper2.default.prototype.compact = function () {
    return this.filter(_identity2.default);
  };

  _LazyWrapper2.default.prototype.find = function (predicate) {
    return this.filter(predicate).head();
  };

  _LazyWrapper2.default.prototype.findLast = function (predicate) {
    return this.reverse().find(predicate);
  };

  _LazyWrapper2.default.prototype.invokeMap = (0, _rest2.default)(function (path, args) {
    if (typeof path == 'function') {
      return new _LazyWrapper2.default(this);
    }
    return this.map(function (value) {
      return (0, _baseInvoke2.default)(value, path, args);
    });
  });

  _LazyWrapper2.default.prototype.reject = function (predicate) {
    predicate = (0, _baseIteratee2.default)(predicate, 3);
    return this.filter(function (value) {
      return !predicate(value);
    });
  };

  _LazyWrapper2.default.prototype.slice = function (start, end) {
    start = (0, _toInteger2.default)(start);

    var result = this;
    if (result.__filtered__ && (start > 0 || end < 0)) {
      return new _LazyWrapper2.default(result);
    }
    if (start < 0) {
      result = result.takeRight(-start);
    } else if (start) {
      result = result.drop(start);
    }
    if (end !== undefined) {
      end = (0, _toInteger2.default)(end);
      result = end < 0 ? result.dropRight(-end) : result.take(end - start);
    }
    return result;
  };

  _LazyWrapper2.default.prototype.takeRightWhile = function (predicate) {
    return this.reverse().takeWhile(predicate).reverse();
  };

  _LazyWrapper2.default.prototype.toArray = function () {
    return this.take(MAX_ARRAY_LENGTH);
  };

  // Add `LazyWrapper` methods to `lodash.prototype`.
  (0, _baseForOwn2.default)(_LazyWrapper2.default.prototype, function (func, methodName) {
    var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName),
        isTaker = /^(?:head|last)$/.test(methodName),
        lodashFunc = _wrapperLodash2.default[isTaker ? 'take' + (methodName == 'last' ? 'Right' : '') : methodName],
        retUnwrapped = isTaker || /^find/.test(methodName);

    if (!lodashFunc) {
      return;
    }
    _wrapperLodash2.default.prototype[methodName] = function () {
      var value = this.__wrapped__,
          args = isTaker ? [1] : arguments,
          isLazy = value instanceof _LazyWrapper2.default,
          iteratee = args[0],
          useLazy = isLazy || (0, _isArray2.default)(value);

      var interceptor = function (value) {
        var result = lodashFunc.apply(_wrapperLodash2.default, (0, _arrayPush2.default)([value], args));
        return isTaker && chainAll ? result[0] : result;
      };

      if (useLazy && checkIteratee && typeof iteratee == 'function' && iteratee.length != 1) {
        // Avoid lazy use if the iteratee has a "length" value other than `1`.
        isLazy = useLazy = false;
      }
      var chainAll = this.__chain__,
          isHybrid = !!this.__actions__.length,
          isUnwrapped = retUnwrapped && !chainAll,
          onlyLazy = isLazy && !isHybrid;

      if (!retUnwrapped && useLazy) {
        value = onlyLazy ? value : new _LazyWrapper2.default(this);
        var result = func.apply(value, args);
        result.__actions__.push({ 'func': _thru2.default, 'args': [interceptor], 'thisArg': undefined });
        return new _LodashWrapper2.default(result, chainAll);
      }
      if (isUnwrapped && onlyLazy) {
        return func.apply(this, args);
      }
      result = this.thru(interceptor);
      return isUnwrapped ? isTaker ? result.value()[0] : result.value() : result;
    };
  });

  // Add `Array` methods to `lodash.prototype`.
  (0, _arrayEach2.default)(['pop', 'push', 'shift', 'sort', 'splice', 'unshift'], function (methodName) {
    var func = arrayProto[methodName],
        chainName = /^(?:push|sort|unshift)$/.test(methodName) ? 'tap' : 'thru',
        retUnwrapped = /^(?:pop|shift)$/.test(methodName);

    _wrapperLodash2.default.prototype[methodName] = function () {
      var args = arguments;
      if (retUnwrapped && !this.__chain__) {
        var value = this.value();
        return func.apply((0, _isArray2.default)(value) ? value : [], args);
      }
      return this[chainName](function (value) {
        return func.apply((0, _isArray2.default)(value) ? value : [], args);
      });
    };
  });

  // Map minified method names to their real names.
  (0, _baseForOwn2.default)(_LazyWrapper2.default.prototype, function (func, methodName) {
    var lodashFunc = _wrapperLodash2.default[methodName];
    if (lodashFunc) {
      var key = lodashFunc.name + '',
          names = _realNames2.default[key] || (_realNames2.default[key] = []);

      names.push({ 'name': methodName, 'func': lodashFunc });
    }
  });

  _realNames2.default[(0, _createHybridWrapper2.default)(undefined, BIND_KEY_FLAG).name] = [{
    'name': 'wrapper',
    'func': undefined
  }];

  // Add methods to `LazyWrapper`.
  _LazyWrapper2.default.prototype.clone = _lazyClone2.default;
  _LazyWrapper2.default.prototype.reverse = _lazyReverse2.default;
  _LazyWrapper2.default.prototype.value = _lazyValue2.default;

  // Add chain sequence methods to the `lodash` wrapper.
  _wrapperLodash2.default.prototype.at = _seq2.default.at;
  _wrapperLodash2.default.prototype.chain = _seq2.default.wrapperChain;
  _wrapperLodash2.default.prototype.commit = _seq2.default.commit;
  _wrapperLodash2.default.prototype.next = _seq2.default.next;
  _wrapperLodash2.default.prototype.plant = _seq2.default.plant;
  _wrapperLodash2.default.prototype.reverse = _seq2.default.reverse;
  _wrapperLodash2.default.prototype.toJSON = _wrapperLodash2.default.prototype.valueOf = _wrapperLodash2.default.prototype.value = _seq2.default.value;

  if (iteratorSymbol) {
    _wrapperLodash2.default.prototype[iteratorSymbol] = _seq2.default.toIterator;
  }

  exports.default = _wrapperLodash2.default;
});