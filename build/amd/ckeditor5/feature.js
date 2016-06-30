define(['exports', './plugin.js'], function (exports, _plugin) {
  /**
   * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
   * For licensing, see LICENSE.md.
   */

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _plugin2 = _interopRequireDefault(_plugin);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * The base class for CKEditor feature classes. Features are main way to enhance CKEditor abilities with tools,
   * utilities, services and components.
   *
   * The main responsibilities for Feature are:
   * * setting required dependencies (see {@link ckeditor5.Plugin#requires},
   * * configuring, instantiating and registering commands to editor,
   * * registering converters to editor (if the feature operates on Tree Model),
   * * setting and registering UI components (if the feature uses it).
   *
   * @memberOf ckeditor5
   */
  class Feature extends _plugin2.default {}
  exports.default = Feature;
});