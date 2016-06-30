define(['exports', '../../utils/tomap.js'], function (exports, _tomap) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _tomap2 = _interopRequireDefault(_tomap);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * Data structure for text with attributes. Note that `Text` is not a {@link engine.model.Node}. This class is used
  * as an aggregator for multiple characters that have same attributes. Example usage:
  *
  *        let myElem = new Element( 'li', [], new Text( 'text with attributes', { foo: true, bar: true } ) );
  *
  * @memberOf engine.model
  */
	class Text {
		/**
   * Creates a text with attributes.
   *
   * @param {String} text Described text.
   * @param {Iterable|Object} [attrs] Iterable collection of attributes.
   */
		constructor(text, attrs) {
			/**
    * Text.
    *
    * @readonly
    * @member {String} engine.model.Text#text
    */
			this.text = text || '';

			/**
    * List of attributes bound with the text.
    *
    * @protected
    * @member {Map} engine.model.Text#_attrs
    */
			this._attrs = (0, _tomap2.default)(attrs);
		}

		/**
   * Checks if the text has an attribute for given key.
   *
   * @param {String} key Key of attribute to check.
   * @returns {Boolean} `true` if attribute with given key is set on text, `false` otherwise.
   */
		hasAttribute(key) {
			return this._attrs.has(key);
		}

		/**
   * Gets an attribute value for given key or undefined if that attribute is not set on text.
   *
   * @param {String} key Key of attribute to look for.
   * @returns {*} Attribute value or null.
   */
		getAttribute(key) {
			return this._attrs.get(key);
		}

		/**
   * Returns iterator that iterates over this text attributes.
   *
   * @returns {Iterable.<*>}
   */
		getAttributes() {
			return this._attrs[Symbol.iterator]();
		}

		/**
   * Sets attribute on text. If attribute with the same key already is set, it overwrites its value.
   *
   * @param {String} key Key of attribute to set.
   * @param {*} value Attribute value.
   */
		setAttribute(key, value) {
			this._attrs.set(key, value);
		}

		/**
   * Removes all attributes from text and sets given attributes.
   *
   * @param {Iterable|Object} attrs Iterable object containing attributes to be set. See {@link engine.model.Text#getAttributes}.
   */
		setAttributesTo(attrs) {
			this._attrs = (0, _tomap2.default)(attrs);
		}

		/**
   * Removes an attribute with given key from text.
   *
   * @param {String} key Key of attribute to remove.
   * @returns {Boolean} `true` if the attribute was set on text, `false` otherwise.
   */
		removeAttribute(key) {
			return this._attrs.delete(key);
		}

		/**
   * Removes all attributes from text.
   */
		clearAttributes() {
			this._attrs.clear();
		}

		/**
   * Custom toJSON method to solve child-parent circular dependencies.
   *
   * @returns {Object} Clone of this object with the parent property replaced with its name.
   */
		toJSON() {
			let json = {
				text: this.text
			};

			if (this._attrs.size) {
				json.attributes = [...this._attrs];
			}

			return json;
		}
	}
	exports.default = Text;
});