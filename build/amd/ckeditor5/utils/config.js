define(['exports', './observablemixin.js', './lib/lodash/isObject.js', './lib/lodash/isPlainObject.js', './mix.js'], function (exports, _observablemixin, _isObject, _isPlainObject, _mix) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _observablemixin2 = _interopRequireDefault(_observablemixin);

	var _isObject2 = _interopRequireDefault(_isObject);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _mix2 = _interopRequireDefault(_mix);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * Handles a configuration dictionary.
  *
  * @memberOf utils
  * @mixes utils.ObservableMixin
  */
	class Config {
		/**
   * Creates an instance of the {@link Config} class.
   *
   * @param {Object} [configurations] The initial configurations to be set.
   */
		constructor(configurations) {
			if (configurations) {
				this.set(configurations);
			}
		}

		/**
   * Set configuration values.
   *
   * It accepts both a name/value pair or an object, which properties and values will be used to set
   * configurations.
   *
   * It also accepts setting a "deep configuration" by using dots in the name. For example, `'resize.width'` sets
   * the value for the `width` configuration in the `resize` subset.
   *
   *		config.set( 'width', 500 );
   *		config.set( 'toolbar.collapsed', true );
   *
   *		// Equivalent to:
   *		config.set( {
   *			width: 500
   *			toolbar: {
   *				collapsed: true
   *			}
   *		} );
   *
   * Passing an object as the value will amend the configuration, not replace it.
   *
   *		config.set( 'toolbar', {
   *			collapsed: true,
   *		} );
   *
   *		config.set( 'toolbar', {
   *			color: 'red',
   *		} );
   *
   *		config.toolbar.collapsed; // true
   *		config.toolbar.color; // 'red'
   *
   * @param {String|Object} name The configuration name or an object from which take properties as
   * configuration entries. Configuration names are case-insensitive.
   * @param {*} [value=null] The configuration value. Used if a name is passed to nameOrConfigurations.
   */
		set(name, value) {
			// Just pass the call to the original set() in case of an object. It'll deal with recursing through the
			// object and calling set( name, value ) again for each property.
			if ((0, _isObject2.default)(name)) {
				_observablemixin2.default.set.apply(this, arguments);

				return;
			}

			// The target for this configuration is, for now, this object.
			let target = this;

			// The configuration name should be split into parts if it has dots. E.g: `resize.width`.
			const parts = name.toLowerCase().split('.');

			// Take the name of the configuration out of the parts. E.g. `resize.width` -> `width`
			name = parts.pop();

			// Retrieves the final target for this configuration recursively.
			for (let i = 0; i < parts.length; i++) {
				// The target will always be an instance of Config.
				if (!(target[parts[i]] instanceof Config)) {
					target.set(parts[i], new Config());
				}

				target = target[parts[i]];
			}

			// Values set as pure objects will be treated as Config subsets.
			if ((0, _isPlainObject2.default)(value)) {
				// If the target is an instance of Config (a deep config subset).
				if (target[name] instanceof Config) {
					// Amend the target with the value, instead of replacing it.
					target[name].set(value);

					return;
				}

				value = new Config(value);
			}

			// Values will never be undefined.
			if (typeof value == 'undefined') {
				value = null;
			}

			// Call the original set() on the target.
			_observablemixin2.default.set.call(target, name, value);
		}

		/**
   * Gets the value for a configuration entry.
   *
   *		config.get( 'name' );
   *
   * Deep configurations can be retrieved by separating each part with a dot.
   *
   *		config.get( 'toolbar.collapsed' );
   *
   * @param {String} name The configuration name. Configuration names are case-insensitive.
   * @returns {*} The configuration value or `undefined` if the configuration entry was not found.
   */
		get(name) {
			// The target for this configuration is, for now, this object.
			let source = this;

			// The configuration name should be split into parts if it has dots. E.g. `resize.width` -> [`resize`, `width`]
			const parts = name.toLowerCase().split('.');

			// Take the name of the configuration from the parts. E.g. `resize.width` -> `width`
			name = parts.pop();

			// Retrieves the source for this configuration recursively.
			for (let i = 0; i < parts.length; i++) {
				// The target will always be an instance of Config.
				if (!(source[parts[i]] instanceof Config)) {
					source = null;
					break;
				}

				source = source[parts[i]];
			}

			// Try to retrieve it from the source object.
			if (source && typeof source[name] != 'undefined') {
				return source[name];
			}

			// If not found, take it from the definition.
			if (this.definition) {
				return this.definition[name];
			}
		}

		/**
   * Defines the name and default value for configurations. It accepts the same parameters as the
   * {@link Config#set set()} method.
   *
   * On first call, the {@link Config#definition definition} property is created to hold all defined
   * configurations.
   *
   * This method is supposed to be called by plugin developers to setup plugin's configurations. It would be
   * rarely used for other needs.
   *
   * @param {String|Object} name The configuration name or an object from which take properties as
   * configuration entries.
   * @param {*} [value] The configuration value. Used if a name is passed to nameOrConfigurations. If undefined,
   * the configuration is set to `null`.
   */
		define(name, value) {
			if (!this.definition) {
				/**
     * TODO
     *
     * @type {Config}
     */
				this.definition = new Config();
			}

			this.definition.set(name, value);
		}
	}

	exports.default = Config;
	(0, _mix2.default)(Config, _observablemixin2.default);
});