define('tests', ['/ckeditor5/ui/iframe/iframeview.js', '/ckeditor5/ui/model.js'], function (_iframeview, _model) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: ui, iframe */

	'use strict';

	var _iframeview2 = _interopRequireDefault(_iframeview);

	var _model2 = _interopRequireDefault(_model);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('IframeView', () => {
		let model, view;

		beforeEach(() => {
			model = new _model2.default({
				width: 100,
				height: 200
			});

			view = new _iframeview2.default(model);

			view.init();
		});

		describe('constructor', () => {
			it('creates view element from the template', () => {
				expect(view.element.classList.contains('ck-reset-all')).to.be.true;
				expect(view.element.attributes.getNamedItem('sandbox').value).to.equal('allow-same-origin allow-scripts');
			});
		});

		describe('init', () => {
			it('returns promise', () => {
				view = new _iframeview2.default(model);

				expect(view.init()).to.be.an.instanceof(Promise);
			});

			it('returns promise which is resolved when iframe finished loading', () => {
				view = new _iframeview2.default(model);

				const promise = view.init().then(() => {
					expect(view.element.contentDocument.readyState).to.equal('complete');
				});

				// Moving iframe into DOM trigger creation of a document inside iframe.
				document.body.appendChild(view.element);

				return promise;
			});
		});

		describe('loaded event', () => {
			it('is fired when frame finished loading', done => {
				view = new _iframeview2.default(model);

				view.on('loaded', () => {
					done();
				});

				view.init();

				// Moving iframe into DOM trigger creation of a document inside iframe.
				document.body.appendChild(view.element);
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
