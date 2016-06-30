define(['exports', './spy.js'], function (exports, _spy) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _spy2 = _interopRequireDefault(_spy);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * The event object passed to event callbacks. It is used to provide information about the event as well as a tool to
  * manipulate it.
  *
  * @memberOf utils
  */
	class EventInfo {
		constructor(source, name) {
			/**
    * The object that fired the event.
    *
    * @member utils.EventInfo#source
    */
			this.source = source;

			/**
    * The event name.
    *
    * @member utils.EventInfo#name
    */
			this.name = name;

			// The following methods are defined in the constructor because they must be re-created per instance.

			/**
    * Stops the event emitter to call further callbacks for this event interaction.
    *
    * @method utils.EventInfo#stop
    */
			this.stop = (0, _spy2.default)();

			/**
    * Removes the current callback from future interactions of this event.
    *
    * @method utils.EventInfo#off
    */
			this.off = (0, _spy2.default)();
		}
	}
	exports.default = EventInfo;
});