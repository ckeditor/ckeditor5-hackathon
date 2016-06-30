define(['exports', './add.js', './ceil.js', './divide.js', './floor.js', './max.js', './maxBy.js', './mean.js', './meanBy.js', './min.js', './minBy.js', './multiply.js', './round.js', './subtract.js', './sum.js', './sumBy.js'], function (exports, _add, _ceil, _divide, _floor, _max, _maxBy, _mean, _meanBy, _min, _minBy, _multiply, _round, _subtract, _sum, _sumBy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _add2 = _interopRequireDefault(_add);

  var _ceil2 = _interopRequireDefault(_ceil);

  var _divide2 = _interopRequireDefault(_divide);

  var _floor2 = _interopRequireDefault(_floor);

  var _max2 = _interopRequireDefault(_max);

  var _maxBy2 = _interopRequireDefault(_maxBy);

  var _mean2 = _interopRequireDefault(_mean);

  var _meanBy2 = _interopRequireDefault(_meanBy);

  var _min2 = _interopRequireDefault(_min);

  var _minBy2 = _interopRequireDefault(_minBy);

  var _multiply2 = _interopRequireDefault(_multiply);

  var _round2 = _interopRequireDefault(_round);

  var _subtract2 = _interopRequireDefault(_subtract);

  var _sum2 = _interopRequireDefault(_sum);

  var _sumBy2 = _interopRequireDefault(_sumBy);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = {
    add: _add2.default, ceil: _ceil2.default, divide: _divide2.default, floor: _floor2.default, max: _max2.default,
    maxBy: _maxBy2.default, mean: _mean2.default, meanBy: _meanBy2.default, min: _min2.default, minBy: _minBy2.default,
    multiply: _multiply2.default, round: _round2.default, subtract: _subtract2.default, sum: _sum2.default, sumBy: _sumBy2.default
  };
});