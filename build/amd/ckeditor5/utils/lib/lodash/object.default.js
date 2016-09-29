define(['exports', './assign.js', './assignIn.js', './assignInWith.js', './assignWith.js', './create.js', './defaults.js', './defaultsDeep.js', './entries.js', './entriesIn.js', './extend.js', './extendWith.js', './findKey.js', './findLastKey.js', './forIn.js', './forInRight.js', './forOwn.js', './forOwnRight.js', './functions.js', './functionsIn.js', './get.js', './has.js', './hasIn.js', './invert.js', './invertBy.js', './invoke.js', './keys.js', './keysIn.js', './mapKeys.js', './mapValues.js', './merge.js', './mergeWith.js', './omit.js', './omitBy.js', './pick.js', './pickBy.js', './result.js', './set.js', './setWith.js', './toPairs.js', './toPairsIn.js', './transform.js', './unset.js', './update.js', './updateWith.js', './values.js', './valuesIn.js'], function (exports, _assign, _assignIn, _assignInWith, _assignWith, _create, _defaults, _defaultsDeep, _entries, _entriesIn, _extend, _extendWith, _findKey, _findLastKey, _forIn, _forInRight, _forOwn, _forOwnRight, _functions, _functionsIn, _get, _has, _hasIn, _invert, _invertBy, _invoke, _keys, _keysIn, _mapKeys, _mapValues, _merge, _mergeWith, _omit, _omitBy, _pick, _pickBy, _result, _set, _setWith, _toPairs, _toPairsIn, _transform, _unset, _update, _updateWith, _values, _valuesIn) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _assign2 = _interopRequireDefault(_assign);

  var _assignIn2 = _interopRequireDefault(_assignIn);

  var _assignInWith2 = _interopRequireDefault(_assignInWith);

  var _assignWith2 = _interopRequireDefault(_assignWith);

  var _create2 = _interopRequireDefault(_create);

  var _defaults2 = _interopRequireDefault(_defaults);

  var _defaultsDeep2 = _interopRequireDefault(_defaultsDeep);

  var _entries2 = _interopRequireDefault(_entries);

  var _entriesIn2 = _interopRequireDefault(_entriesIn);

  var _extend2 = _interopRequireDefault(_extend);

  var _extendWith2 = _interopRequireDefault(_extendWith);

  var _findKey2 = _interopRequireDefault(_findKey);

  var _findLastKey2 = _interopRequireDefault(_findLastKey);

  var _forIn2 = _interopRequireDefault(_forIn);

  var _forInRight2 = _interopRequireDefault(_forInRight);

  var _forOwn2 = _interopRequireDefault(_forOwn);

  var _forOwnRight2 = _interopRequireDefault(_forOwnRight);

  var _functions2 = _interopRequireDefault(_functions);

  var _functionsIn2 = _interopRequireDefault(_functionsIn);

  var _get2 = _interopRequireDefault(_get);

  var _has2 = _interopRequireDefault(_has);

  var _hasIn2 = _interopRequireDefault(_hasIn);

  var _invert2 = _interopRequireDefault(_invert);

  var _invertBy2 = _interopRequireDefault(_invertBy);

  var _invoke2 = _interopRequireDefault(_invoke);

  var _keys2 = _interopRequireDefault(_keys);

  var _keysIn2 = _interopRequireDefault(_keysIn);

  var _mapKeys2 = _interopRequireDefault(_mapKeys);

  var _mapValues2 = _interopRequireDefault(_mapValues);

  var _merge2 = _interopRequireDefault(_merge);

  var _mergeWith2 = _interopRequireDefault(_mergeWith);

  var _omit2 = _interopRequireDefault(_omit);

  var _omitBy2 = _interopRequireDefault(_omitBy);

  var _pick2 = _interopRequireDefault(_pick);

  var _pickBy2 = _interopRequireDefault(_pickBy);

  var _result2 = _interopRequireDefault(_result);

  var _set2 = _interopRequireDefault(_set);

  var _setWith2 = _interopRequireDefault(_setWith);

  var _toPairs2 = _interopRequireDefault(_toPairs);

  var _toPairsIn2 = _interopRequireDefault(_toPairsIn);

  var _transform2 = _interopRequireDefault(_transform);

  var _unset2 = _interopRequireDefault(_unset);

  var _update2 = _interopRequireDefault(_update);

  var _updateWith2 = _interopRequireDefault(_updateWith);

  var _values2 = _interopRequireDefault(_values);

  var _valuesIn2 = _interopRequireDefault(_valuesIn);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = {
    assign: _assign2.default, assignIn: _assignIn2.default, assignInWith: _assignInWith2.default, assignWith: _assignWith2.default, create: _create2.default,
    defaults: _defaults2.default, defaultsDeep: _defaultsDeep2.default, entries: _entries2.default, entriesIn: _entriesIn2.default, extend: _extend2.default,
    extendWith: _extendWith2.default, findKey: _findKey2.default, findLastKey: _findLastKey2.default, forIn: _forIn2.default, forInRight: _forInRight2.default,
    forOwn: _forOwn2.default, forOwnRight: _forOwnRight2.default, functions: _functions2.default, functionsIn: _functionsIn2.default, get: _get2.default,
    has: _has2.default, hasIn: _hasIn2.default, invert: _invert2.default, invertBy: _invertBy2.default, invoke: _invoke2.default,
    keys: _keys2.default, keysIn: _keysIn2.default, mapKeys: _mapKeys2.default, mapValues: _mapValues2.default, merge: _merge2.default,
    mergeWith: _mergeWith2.default, omit: _omit2.default, omitBy: _omitBy2.default, pick: _pick2.default, pickBy: _pickBy2.default,
    result: _result2.default, set: _set2.default, setWith: _setWith2.default, toPairs: _toPairs2.default, toPairsIn: _toPairsIn2.default,
    transform: _transform2.default, unset: _unset2.default, update: _update2.default, updateWith: _updateWith2.default, values: _values2.default,
    valuesIn: _valuesIn2.default
  };
});