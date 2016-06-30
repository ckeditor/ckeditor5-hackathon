define('tests', ['/ckeditor5/creator-classic/classic.js', '/tests/utils/_utils/utils.js'], function (_classic, _utils) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* global console:false */

	'use strict';

	var _classic2 = _interopRequireDefault(_classic);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	let editor, editable, observer;

	function initEditor() {
		_classic2.default.create(document.querySelector('#editor'), {
			features: ['delete', 'enter', 'typing', 'paragraph', 'undo', 'formats', 'basic-styles/bold', 'basic-styles/italic', 'hackathon/autocomplete'],
			toolbar: ['formats', 'bold', 'italic', 'undo', 'redo'],
			autocomplete: {
				'@': ['@fredck', '@oleq', '@owrobel', '@reinmar', '@r.mikolajuk', '@pjasiun', '@s.kups', '@scofalik'],

				':': [':-)', ':-(', ':D', ':p', ':F'],

				'#': ['#ckeditor5', '#ckeditor5-chat', '#ckeditor5-code', '#dev', '#general', '#standup']
			}
		}).then(newEditor => {
			console.log('Editor was initialized', newEditor);
			console.log('You can now play with it using global `editor` and `editable` variables.');

			window.editor = editor = newEditor;
			window.editable = editable = editor.editing.view.getRoot();

			observer = _utils2.default.createObserver();
			observer.observe('Editable', editable, ['isFocused']);
		}).catch(err => {
			console.error(err.stack);
		});
	}

	function destroyEditor() {
		editor.destroy().then(() => {
			window.editor = editor = null;
			window.editable = editable = null;

			observer.stopListening();
			observer = null;

			console.log('Editor was destroyed');
		});
	}

	document.getElementById('initEditor').addEventListener('click', initEditor);
	document.getElementById('destroyEditor').addEventListener('click', destroyEditor);

	initEditor();
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
