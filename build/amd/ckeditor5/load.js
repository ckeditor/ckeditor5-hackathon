define(['exports', 'require'], function (exports, _require2) {
  /**
   * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
   * For licensing, see LICENSE.md.
   */

  'use strict';

  // We import the 'require' module, so Require.JS gives us a localized version of require().
  // Otherwise we would use the global one which resolves paths relatively to the base dir.

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = load;

  var _require3 = _interopRequireDefault(_require2);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Loads a module.
   *
   *		load( 'ckeditor5/editor.js' )
   *			.then( ( EditorModule ) => {
   *				const Editor = EditorModule.default;
   *			} );
   *
   * @param {String} modulePath Path to the module, relative to `ckeditor.js`'s parent directory (the root).
   * @returns {Promise}
   */
  function load(modulePath) {
    modulePath = '../' + modulePath;

    return new Promise((resolve, reject) => {
      (0, _require3.default)([modulePath], module => {
        resolve(module);
      }, err => {
        reject(err);
      });
    });
  }
});