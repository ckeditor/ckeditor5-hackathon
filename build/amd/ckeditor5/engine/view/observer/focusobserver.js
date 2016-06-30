define(['exports', './domeventobserver.js'], function (exports, _domeventobserver) {
  /**
   * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
   * For licensing, see LICENSE.md.
   */

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _domeventobserver2 = _interopRequireDefault(_domeventobserver);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * {@link engine.view.Document#focus Focus} and {@link engine.view.Document#blur blur} events observer.
   * Focus observer handle also {@link engine.view.RootEditableElement#isFocused isFocused} property of the
   * {@link engine.view.RootEditableElement root elements}.
   *
   * Note that this observer is attached by the {@link engine.EditingController} and is available by default.
   *
   * @memberOf engine.view.observer
   * @extends engine.view.observer.DomEventObserver
   */
  class FocusObserver extends _domeventobserver2.default {
    constructor(document) {
      super(document);

      this.domEventType = ['focus', 'blur'];

      // Update `isFocus` property of root elements and `document#focusedEditable`.
      document.on('focus', (evt, data) => {
        document.focusedEditable = data.target;
      });

      document.on('blur', (evt, data) => {
        if (document.focusedEditable == data.target) {
          document.focusedEditable = null;
        }
      });
    }

    onDomEvent(domEvent) {
      this.fire(domEvent.type, domEvent);
    }
  }

  exports.default = FocusObserver;
});