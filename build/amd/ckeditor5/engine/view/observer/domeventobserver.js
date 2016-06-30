define(['exports', './observer.js', './domeventdata.js'], function (exports, _observer, _domeventdata) {
	/**
  * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _observer2 = _interopRequireDefault(_observer);

	var _domeventdata2 = _interopRequireDefault(_domeventdata);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * Base class for DOM event observers. This class handles
  * {@link engine.view.observer.Observer#observe adding} listeners to DOM elements,
  * {@link engine.view.observer.Observer#disable disabling} and
  * {@link engine.view.observer.Observer#enable re-enabling} events.
  * Child class needs to define
  * {@link engine.view.observer.DomEventObserver#domEventType DOM event type} and
  * {@link engine.view.observer.DomEventObserver#onDomEvent callback}.
  *
  * For instance:
  *
  *		class ClickObserver extends DomEventObserver {
  *			// It can also be defined as a normal property in the constructor.
  *			get domEventType() {
  *				return 'click';
  *			}
  *
  *			onDomEvent( domEvt ) {
  *				this.fire( 'click' );
  *			}
  *		}
  *
  * @memberOf engine.view.observer
  * @extends engine.view.observer.Observer
  */
	class DomEventObserver extends _observer2.default {
		/**
   * Type of the DOM event the observer should listen on. Array of types can be defined
   * if the obsever should listen to multiple DOM events.
   *
   * @readonly
   * @member {String|Array.<String>} engine.view.observer.DomEventObserver#domEventType
   */

		/**
   * Callback which should be called when the DOM event occurred. Note that the callback will not be called if
   * observer {@link engine.view.observer.DomEventObserver#isEnabled is not enabled}.
   *
   * @see engine.view.observer.DomEventObserver#domEventType
   * @abstract
   * @method engine.view.observer.DomEventObserver#onDomEvent
   */

		/**
   * @inheritDoc
   */
		observe(domElement) {
			const types = typeof this.domEventType == 'string' ? [this.domEventType] : this.domEventType;

			types.forEach(type => {
				domElement.addEventListener(type, domEvent => this.isEnabled && this.onDomEvent(domEvent));
			});
		}

		/**
   * Calls {@link engine.view.Document#fire} if observer
   * {@link engine.view.observer.DomEventObserver#isEnabled is enabled}.
   *
   * @see engine.view.Document#fire
   * @param {String} eventType The event type (name).
   * @param {Event} domEvent The DOM event.
   * @param {Object} [additionalData] The additional data which should extend the
   * {@link engine.view.observer.DomEventData event data} object.
   */
		fire(eventType, domEvent, additionalData) {
			if (this.isEnabled) {
				this.document.fire(eventType, new _domeventdata2.default(this.document, domEvent, additionalData));
			}
		}
	}
	exports.default = DomEventObserver;
});