define('tests', ['/tests/ckeditor5/_utils/utils.js', '/ckeditor5/ui/controllercollection.js', '/ckeditor5/ui/controller.js', '/ckeditor5/ui/view.js'], function (_utils, _controllercollection, _controller, _view) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: ui */

	'use strict';

	var _utils2 = _interopRequireDefault(_utils);

	var _controllercollection2 = _interopRequireDefault(_controllercollection);

	var _controller2 = _interopRequireDefault(_controller);

	var _view2 = _interopRequireDefault(_view);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	_utils2.default.createSinonSandbox();

	let ParentView;

	describe('ControllerCollection', () => {
		beforeEach(defineParentViewClass);

		describe('constructor', () => {
			it('should throw when no name is passed', () => {
				expect(() => {
					new _controllercollection2.default();
				}).to.throw(/^ui-controllercollection-no-name/);
			});
		});

		describe('add', () => {
			it('should add a child controller and return promise', () => {
				const parentController = new _controller2.default();
				const childController = new _controller2.default();
				const collection = new _controllercollection2.default('x');

				parentController.collections.add(collection);

				const returned = collection.add(childController);

				expect(returned).to.be.an.instanceof(Promise);
				expect(collection.get(0)).to.be.equal(childController);
			});

			it('should add a child controller at given position', () => {
				const parentController = new _controller2.default();
				const childController1 = new _controller2.default();
				const childController2 = new _controller2.default();
				const collection = new _controllercollection2.default('x');

				parentController.collections.add(collection);

				collection.add(childController1);
				collection.add(childController2, 0);

				expect(collection.get(0)).to.be.equal(childController2);
				expect(collection.get(1)).to.be.equal(childController1);
			});

			it('should initialize child controller if parent is ready', () => {
				const parentController = new _controller2.default(null, new ParentView());
				const childController = new _controller2.default(null, new _view2.default());
				const spy = _utils2.default.sinon.spy(childController, 'init');
				const collection = new _controllercollection2.default('x');

				parentController.collections.add(collection);
				collection.add(childController);
				collection.remove(childController);

				sinon.assert.notCalled(spy);

				return parentController.init().then(() => {
					return collection.add(childController);
				}).then(() => {
					sinon.assert.calledOnce(spy);
				});
			});

			it('should not initialize child controller twice', () => {
				const parentController = new _controller2.default(null, new ParentView());
				const childController = new _controller2.default(null, new _view2.default());
				const spy = _utils2.default.sinon.spy(childController, 'init');
				const collection = new _controllercollection2.default('x');

				parentController.collections.add(collection);

				return parentController.init().then(() => {
					return childController.init();
				}).then(() => {
					return collection.add(childController);
				}).then(() => {
					sinon.assert.calledOnce(spy);
				});
			});
		});
	});

	function defineParentViewClass() {
		ParentView = class extends _view2.default {
			constructor() {
				super();

				this.element = document.createElement('span');
				this.register('x', true);
			}
		};
	}
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
