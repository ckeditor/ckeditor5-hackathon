define(['exports', './utils/emittermixin.js', './utils/keyboard.js'], function (exports, _emittermixin, _keyboard) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _emittermixin2 = _interopRequireDefault(_emittermixin);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * Keystroke handler. Its instance is available in {@link ckeditor5.Editor#keystrokes} so features
  * can register their keystrokes.
  *
  * E.g. an undo feature would do this:
  *
  *		editor.keystrokes.set( 'ctrl + Z', 'undo' );
  *		editor.keystrokes.set( 'ctrl + shift + Z', 'redo' );
  *		editor.keystrokes.set( 'ctrl + Y', 'redo' );
  *
  * @memberOf ckeditor5
  */
	class KeystrokeHandler {
		/**
   * Creates an instance of the keystroke handler.
   *
   * @param {engine.treeView.TreeView} editingView
   */
		constructor(editor) {
			/**
    * The editor instance.
    *
    * @readonly
    * @member {ckeditor5.Editor} ckeditor5.KeystrokeHandler#editor
    */
			this.editor = editor;

			/**
    * Listener used to listen to events for easier keystroke handler destruction.
    *
    * @private
    * @member {utils.Emitter} ckeditor5.KeystrokeHandler#_listener
    */
			this._listener = Object.create(_emittermixin2.default);

			/**
    * Map of the defined keystrokes. Keystroke codes are the keys.
    *
    * @private
    * @member {Map} ckeditor5.KeystrokeHandler#_keystrokes
    */
			this._keystrokes = new Map();

			this._listener.listenTo(editor.editing.view, 'keydown', (evt, data) => {
				const handled = this.press(data);

				if (handled) {
					data.preventDefault();
				}
			});
		}

		/**
   * Registers a handler for the specified keystroke.
   *
   * The handler can be specified as a command name or a callback.
   *
   * @param {String|Array.<String|Number>} keystroke Keystroke defined in a format accepted by
   * the {@link utils.keyboard.parseKeystroke} function.
   * @param {String|Function} callback If a string is passed, then the keystroke will
   * {@link ckeditor5.Editor#execute execute a command}.
   * If a function, then it will be called with the
   * {@link engine.view.observer.keyObserver.KeyEventData key event data} object.
   */
		set(keystroke, callback) {
			this._keystrokes.set((0, _keyboard.parseKeystroke)(keystroke), callback);
		}

		/**
   * Triggers a keystroke handler for a specified key combination, if such a keystroke was {@link #set defined}.
   *
   * @param {engine.view.observer.keyObserver.KeyEventData} keyEventData Key event data.
   * @returns {Boolean} Whether the keystroke was handled.
   */
		press(keyEventData) {
			const keyCode = (0, _keyboard.getCode)(keyEventData);
			const callback = this._keystrokes.get(keyCode);

			if (!callback) {
				return false;
			}

			if (typeof callback == 'string') {
				this.editor.execute(callback);
			} else {
				callback(keyEventData);
			}

			return true;
		}

		/**
   * Destroys the keystroke handler.
   */
		destroy() {
			this._keystrokes = new Map();
			this._listener.stopListening();
		}
	}
	exports.default = KeystrokeHandler;
});