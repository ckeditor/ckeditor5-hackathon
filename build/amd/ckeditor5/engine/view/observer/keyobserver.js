define(['exports', './domeventobserver.js', '../../../utils/keyboard.js'], function (exports, _domeventobserver, _keyboard) {
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
   * {@link engine.view.Document#keydown Key down} event observer.
   *
   * Note that this observer is attached by the {@link engine.EditingController} and is available by default.
   *
   * @memberOf engine.view.observer
   * @extends engine.view.observer.DomEventObserver
   */
  class KeyObserver extends _domeventobserver2.default {
    constructor(document) {
      super(document);

      this.domEventType = 'keydown';
    }

    onDomEvent(domEvt) {
      this.fire('keydown', domEvt, {
        keyCode: domEvt.keyCode,

        altKey: domEvt.altKey,
        ctrlKey: domEvt.ctrlKey || domEvt.metaKey,
        shiftKey: domEvt.shiftKey,

        get keystroke() {
          return (0, _keyboard.getCode)(this);
        }
      });
    }
  }

  exports.default = KeyObserver;
});