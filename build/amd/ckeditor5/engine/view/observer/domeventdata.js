define(['exports', '../../../utils/lib/lodash/extend.js'], function (exports, _extend) {
	/**
  * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extend2 = _interopRequireDefault(_extend);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * Information about a DOM event in context of the {@link engine.view.Document}.
  * It wraps the native event, which usually should not be used as the wrapper contains
  * additional data (like key code for keyboard events).
  *
  * @memberOf engine.view.observer
  */
	class DomEventData {
		/**
   * @param {engine.view.Document} document The instance of the tree view Document.
   * @param {Event} domEvent The DOM event.
   * @param {Object} [additionalData] Additional properties that the instance should contain.
   */
		constructor(document, domEvent, additionalData) {
			/**
    * The instance of the document.
    *
    * @readonly
    * @member {engine.view.Document} engine.view.observer.DomEvent#view
    */
			this.document = document;

			/**
    * The DOM event.
    *
    * @readonly
    * @member {Event} engine.view.observer.DomEvent#domEvent
    */
			this.domEvent = domEvent;

			/**
    * The DOM target.
    *
    * @readonly
    * @member {HTMLElement} engine.view.observer.DomEvent#target
    */
			this.domTarget = domEvent.target;

			(0, _extend2.default)(this, additionalData);
		}

		/**
   * The tree view element representing the target.
   *
   * @readonly
   * @type engine.view.Element
   */
		get target() {
			return this.document.domConverter.getCorrespondingViewElement(this.domTarget);
		}

		/**
   * Prevents the native's event default action.
   */
		preventDefault() {
			this.domEvent.preventDefault();
		}

		/**
   * Stops native event propagation.
   */
		stopPropagation() {
			this.domEvent.stopPropagation();
		}
	}
	exports.default = DomEventData;
});