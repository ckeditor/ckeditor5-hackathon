define(['exports', './_isKeyable.js'], function (exports, _isKeyable) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _isKeyable2 = _interopRequireDefault(_isKeyable);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Gets the data for `map`.
   *
   * @private
   * @param {Object} map The map to query.
   * @param {string} key The reference key.
   * @returns {*} Returns the map data.
   */
  function getMapData(map, key) {
    var data = map.__data__;
    return (0, _isKeyable2.default)(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
  }

  exports.default = getMapData;
});