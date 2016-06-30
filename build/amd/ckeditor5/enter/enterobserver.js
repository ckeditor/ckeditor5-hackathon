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
   * Enter observer introduce the {@link engine.view.Document#enter} event.
   *
   * @memberOf enter
   * @extends engine.view.observer.Observer
   */
  class EnterObserver extends _observer2.default {
    constructor(document) {
      super(document);

      document.on('keydown', (evt, data) => {
        if (this.isEnabled && data.keyCode == _keyboard.keyCodes.enter) {
          document.fire('enter', new _domeventdata2.default(document, data.domEvent));
        }
      });
    }

    /**
     * @inheritDoc
     */
    observe() {}
  }

  exports.default = EnterObserver;
});