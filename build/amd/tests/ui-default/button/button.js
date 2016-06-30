define('tests', ['/ckeditor5/ui/button/button.js', '/ckeditor5/ui/view.js', '/ckeditor5/ui/model.js'], function (_button, _view, _model) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: ui, button */

	'use strict';

	var _button2 = _interopRequireDefault(_button);

	var _view2 = _interopRequireDefault(_view);

	var _model2 = _interopRequireDefault(_model);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('Button', () => {
		let model, button, view;

		beforeEach(() => {
			model = new _model2.default();
			view = new _view2.default();
			button = new _button2.default(model, view);
		});

		describe('constructor', () => {
			it('creates view#click -> model#execute binding', () => {
				const spy = sinon.spy();

				model.on('execute', spy);

				view.fire('click');

				expect(spy.calledOnce).to.be.true;
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
