define(['exports'], function (exports) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
		'img onerror': '<p><img onerror="%xss%" src="produce404" /></p>',
		'video onerror': '<p><video onerror="%xss%">foo</video></p>',
		'video onerror + src': '<p><video onerror="%xss%" src="produce404">foo</video></p>',
		'video with source onerror': '<p><video><source onerror="%xss%" /></video></p>',
		'video with source onerror 2': '<p><video><source onerror="%xss%" src="produce404" /></video></p>',
		'script': '<script>%xss%<\/script>'
	};
});