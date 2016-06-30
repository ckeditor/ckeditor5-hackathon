define('tests', ['/ckeditor5/hackathon/limit/toolbarlesseditor.js', '/ckeditor5/hackathon/limit/limit.js'], function (_toolbarlesseditor, _limit) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* global console:false */
	/* global alert:false */

	'use strict';

	var _toolbarlesseditor2 = _interopRequireDefault(_toolbarlesseditor);

	var _limit2 = _interopRequireDefault(_limit);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	const counter = document.getElementById('counter');
	const button = document.querySelector('#editor-area form button');

	_toolbarlesseditor2.default.create(document.querySelector('#editor'), {
		features: ['delete', 'enter', 'typing', 'paragraph', _limit2.default],
		limit: 25
	}).then(editor => {
		const limitPlugin = editor.plugins.get(_limit2.default);

		window.editor = editor;

		button.addEventListener('click', () => alert(editor.getData()));

		limitPlugin.on('change:count', () => {
			const count = 25 - limitPlugin.count;
			counter.innerText = count;

			if (count >= 0) {
				counter.style.color = '#8899a6';
				button.style.opacity = '1';
			} else {
				counter.style.color = '#d40d12';
				button.style.opacity = '.2';
			}
		});
	}).catch(err => {
		console.error(err.stack);
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
