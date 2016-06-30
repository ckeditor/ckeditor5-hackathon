define(['exports'], function (exports) {
  /**
   * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
   * For licensing, see LICENSE.md.
   */

  'use strict';

  /**
   * Copies enumerable properties and symbols from the objects given as 2nd+ parameters to the
   * prototype of first object (a constructor).
   *
   *		class Editor {
   *			...
   *		}
   *
   *		const SomeMixin = {
   *			a() {
   *				return 'a';
   *			}
   *		};
   *
   *		mix( Editor, SomeMixin, ... );
   *
   *		new Editor().a(); // -> 'a'
   *
   * Note: Properties which already exist in the base class will not be overriden.
   *
   * @memberOf utils
   * @param {Function} [baseClass] Class which prototype will be extended.
   * @param {Object} [...mixins] Objects from which to get properties.
   */

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = mix;
  function mix(baseClass, ...mixins) {
    mixins.forEach(mixin => {
      Object.getOwnPropertyNames(mixin).concat(Object.getOwnPropertySymbols(mixin)).forEach(key => {
        if (key in baseClass.prototype) {
          return;
        }

        const sourceDescriptor = Object.getOwnPropertyDescriptor(mixin, key);
        sourceDescriptor.enumerable = false;

        Object.defineProperty(baseClass.prototype, key, sourceDescriptor);
      });
    });
  }
});