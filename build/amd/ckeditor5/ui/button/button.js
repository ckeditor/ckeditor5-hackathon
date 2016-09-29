define(['exports', '../controller.js'], function (exports, _controller) {
  /**
   * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
   * For licensing, see LICENSE.md.
   */

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _controller2 = _interopRequireDefault(_controller);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * The basic button controller class.
   *
   * @memberOf ui.button
   * @extends ui.Controller
   */
  class Button extends _controller2.default {
    constructor(model, view) {
      super(model, view);

      view.on('click', () => model.fire('execute'));
    }
  }

  exports.default = Button;
});