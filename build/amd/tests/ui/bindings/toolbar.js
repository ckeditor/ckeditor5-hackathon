define('tests', ['/ckeditor5/editor/editor.js', '/ckeditor5/ui/model.js', '/ckeditor5/ui/view.js', '/ckeditor5/ui/controller.js', '/ckeditor5/ui/bindings/toolbar.js'], function (_editor, _model, _view, _controller, _toolbar) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: ui, toolbar */

	'use strict';

	var _editor2 = _interopRequireDefault(_editor);

	var _model2 = _interopRequireDefault(_model);

	var _view2 = _interopRequireDefault(_view);

	var _controller2 = _interopRequireDefault(_controller);

	var _toolbar2 = _interopRequireDefault(_toolbar);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('Toolbar', () => {
		let toolbar, view, model, editor;

		beforeEach(() => {
			editor = new _editor2.default();
			model = new _model2.default();
			view = new _view2.default(model);
			toolbar = new _toolbar2.default(model, view, editor);
		});

		describe('constructor', () => {
			it('sets all the properties', () => {
				expect(toolbar).to.have.property('editor', editor);
			});
		});

		describe('addButtons', () => {
			it('creates buttons for each button name', () => {
				const createSpy = sinon.spy(() => new _controller2.default());

				editor.ui = {
					featureComponents: {
						create: createSpy
					}
				};

				toolbar.addButtons(['foo', 'bar']);

				expect(createSpy.callCount).to.equal(2);
				expect(createSpy.firstCall.calledWith('foo')).to.be.true;
				expect(createSpy.secondCall.calledWith('bar')).to.be.true;
			});

			it('adds created components to the collection of buttons', () => {
				const component = new _controller2.default();
				const createSpy = sinon.spy(() => component);

				editor.ui = {
					featureComponents: {
						create: createSpy
					}
				};

				toolbar.addButtons(['foo']);

				expect(toolbar.collections.get('buttons').get(0)).to.equal(component);
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
