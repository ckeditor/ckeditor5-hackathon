define('tests', ['/ckeditor5/engine/view/observer/domeventdata.js', '/ckeditor5/engine/view/document.js'], function (_domeventdata, _document) {
	/**
  * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: view, browser-only */

	'use strict';

	var _domeventdata2 = _interopRequireDefault(_domeventdata);

	var _document2 = _interopRequireDefault(_document);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('DomEventData', () => {
		let viewDocument, viewBody;

		beforeEach(() => {
			viewDocument = new _document2.default();

			viewBody = viewDocument.domConverter.domToView(document.body, { bind: true });
		});

		describe('constructor', () => {
			it('sets properties', () => {
				const domEvt = { target: document.body };
				const data = new _domeventdata2.default(viewDocument, domEvt, { foo: 1, bar: true });

				expect(data).to.have.property('document', viewDocument);
				expect(data).to.have.property('domEvent', domEvt);
				expect(data).to.have.property('domTarget', document.body);

				expect(data).to.have.property('foo', 1);
				expect(data).to.have.property('bar', true);
			});
		});

		describe('target', () => {
			it('returns bound element', () => {
				const domEvt = { target: document.body };
				const data = new _domeventdata2.default(viewDocument, domEvt);

				expect(data).to.have.property('target', viewBody);
			});
		});

		describe('preventDefault', () => {
			it('executes native preventDefault()', () => {
				const domEvt = { target: document.body, preventDefault: sinon.spy() };
				const data = new _domeventdata2.default(viewDocument, domEvt);

				data.preventDefault();

				expect(domEvt.preventDefault.calledOnce).to.be.true;
			});
		});

		describe('stopPropagation', () => {
			it('executes native stopPropagation()', () => {
				const domEvt = { target: document.body, stopPropagation: sinon.spy() };
				const data = new _domeventdata2.default(viewDocument, domEvt);

				data.stopPropagation();

				expect(domEvt.stopPropagation.calledOnce).to.be.true;
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
