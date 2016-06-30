define('tests', ['/ckeditor5/engine/view/document.js', '/ckeditor5/engine/view/observer/domeventobserver.js'], function (_document, _domeventobserver) {
	/**
  * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* global console:false */

	'use strict';

	var _document2 = _interopRequireDefault(_document);

	var _domeventobserver2 = _interopRequireDefault(_domeventobserver);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	const viewDocument = new _document2.default();
	let observer1, observer2;

	class ClickObserver1 extends _domeventobserver2.default {
		constructor(viewDocument) {
			super(viewDocument);

			this.id = 1;
			this.domEventType = 'click';
			observer1 = this;
		}

		onDomEvent(domEvt) {
			this.fire('click', this.id, domEvt.target.id);
		}
	}

	class ClickObserver2 extends _domeventobserver2.default {
		constructor(viewDocument) {
			super(viewDocument);

			this.id = 2;
			this.domEventType = 'click';
			observer2 = this;
		}

		onDomEvent(domEvt) {
			this.fire('click', this.id, domEvt.target.id);
		}
	}

	viewDocument.on('click', (evt, eventId, elementId) => console.log('click', eventId, elementId));
	document.getElementById('enable1').addEventListener('click', () => observer1.enable());
	document.getElementById('disable1').addEventListener('click', () => observer1.disable());

	// Random order.
	viewDocument.addObserver(ClickObserver1);

	viewDocument.createRoot(document.getElementById('clickerA'), 'clickerA');

	viewDocument.addObserver(ClickObserver2);

	viewDocument.createRoot(document.getElementById('clickerB'), 'clickerB');
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
