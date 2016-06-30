define(['exports', './lib/lodash/isPlainObject.js', './objecttomap.js'], function (exports, _isPlainObject, _objecttomap) {
  /**
   * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
   * For licensing, see LICENSE.md.
   */

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = toMap;

  var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

  var _objecttomap2 = _interopRequireDefault(_objecttomap);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Transforms object or iterable to map. Iterable needs to be in the format acceptable by the `Map` constructor.
   *
   *		map = toMap( { 'foo': 1, 'bar': 2 } );
   *		map = toMap( [ [ 'foo', 1 ], [ 'bar', 2 ] ] );
   *		map = toMap( anotherMap );
   *
   * @memberOf utils
   * @param {Object|Iterable} data Object or iterable to transform.
   * @returns {Map} Map created from data.
   */
  function toMap(data) {
    if ((0, _isPlainObject2.default)(data)) {
      return (0, _objecttomap2.default)(data);
    } else {
      return new Map(data);
    }
  }
});