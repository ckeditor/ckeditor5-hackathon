define(['exports', '../utils/lib/lodash/extend.js', '../utils/mix.js', '../utils/observablemixin.js'], function (exports, _extend, _mix, _observablemixin) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extend2 = _interopRequireDefault(_extend);

	var _mix2 = _interopRequireDefault(_mix);

	var _observablemixin2 = _interopRequireDefault(_observablemixin);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * The base MVC model class.
  *
  * @memberOf ui
  * @mixes utils.ObservaleMixin
  */
	class Model {
		/**
   * Creates a new Model instance.
   *
   * @param {Object} [attributes] The model state attributes to be defined during the instance creation.
   * @param {Object} [properties] The (out of state) properties to be appended to the instance during creation.
   */
		constructor(attributes, properties) {
			// Extend this instance with the additional (out of state) properties.
			if (properties) {
				(0, _extend2.default)(this, properties);
			}

			// Initialize the attributes.
			if (attributes) {
				this.set(attributes);
			}
		}
	}

	exports.default = Model;
	(0, _mix2.default)(Model, _observablemixin2.default);
});