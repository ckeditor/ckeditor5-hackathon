define(['exports'], function (exports) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	/**
  * General test utils for CKEditor.
  */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	const utils = {
		/**
   * Creates Sinon sandbox in {@link bender#sinon} and plugs `afterEach()` callback which
   * restores all spies and stubs created in this sandbox.
   *
   * See https://github.com/ckeditor/ckeditor5-design/issues/72 and http://sinonjs.org/docs/#sinon-sandbox
   *
   * Usage:
   *
   *		// Directly in the test file:
   *		testUtils.createSinonSandbox();
   *
   *		// Then inside tests you can use bender.sinon:
   *		it( 'does something', () => {
   *			testUtils.sinon.spy( obj, 'method' );
   *		} );
   */
		createSinonSandbox() {
			before(() => {
				utils.sinon = sinon.sandbox.create();
			});

			afterEach(() => {
				utils.sinon.restore();
			});
		}
	};

	exports.default = utils;
});