define(['exports', '../engine/view/observer/observer.js', '../engine/view/observer/domeventdata.js', '../utils/keyboard.js'], function (exports, _observer, _domeventdata, _keyboard) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
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
  * Delete observer introduces the {@link engine.view.Document#delete} event.
  *
  * @memberOf delete
  * @extends engine.view.observer.Observer
  */
	class EnterObserver extends _observer2.default {
		constructor(document) {
			super(document);

			document.on('keydown', (evt, data) => {
				const deleteData = {};

				if (data.keyCode == _keyboard.keyCodes.delete) {
					deleteData.direction = 'FORWARD';
				} else if (data.keyCode == _keyboard.keyCodes.backspace) {
					deleteData.direction = 'BACKWARD';
				} else {
					return;
				}

				deleteData.unit = data.altKey ? 'WORD' : 'CHARACTER';

				document.fire('delete', new _domeventdata2.default(document, data.domEvent, deleteData));
			});
		}

		/**
   * @inheritDoc
   */
		observe() {}
	}

	exports.default = EnterObserver;
});