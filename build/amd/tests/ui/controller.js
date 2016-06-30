define('tests', ['/tests/ckeditor5/_utils/utils.js', '/ckeditor5/ui/view.js', '/ckeditor5/ui/controller.js', '/ckeditor5/ui/controllercollection.js', '/ckeditor5/utils/ckeditorerror.js', '/ckeditor5/ui/model.js', '/ckeditor5/utils/eventinfo.js'], function (_utils, _view, _controller, _controllercollection, _ckeditorerror, _model, _eventinfo) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: ui */

	'use strict';

	var _utils2 = _interopRequireDefault(_utils);

	var _view2 = _interopRequireDefault(_view);

	var _controller2 = _interopRequireDefault(_controller);

	var _controllercollection2 = _interopRequireDefault(_controllercollection);

	var _ckeditorerror2 = _interopRequireDefault(_ckeditorerror);

	var _model2 = _interopRequireDefault(_model);

	var _eventinfo2 = _interopRequireDefault(_eventinfo);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	let ParentController, ParentView;

	_utils2.default.createSinonSandbox();

	describe('Controller', () => {
		describe('constructor', () => {
			it('defines basic properties', () => {
				const controller = new _controller2.default();

				expect(controller.model).to.be.null;
				expect(controller.ready).to.be.false;
				expect(controller.view).to.be.null;
				expect(controller.collections.length).to.be.equal(0);
			});

			it('should accept model and view', () => {
				const model = new _model2.default();
				const view = new _view2.default();
				const controller = new _controller2.default(model, view);

				expect(controller.model).to.be.equal(model);
				expect(controller.view).to.be.equal(view);
			});
		});

		describe('init', () => {
			it('should throw when already initialized', () => {
				const controller = new _controller2.default();

				return controller.init().then(() => {
					controller.init();

					throw new Error('This should not be executed.');
				}).catch(err => {
					expect(err).to.be.instanceof(_ckeditorerror2.default);
					expect(err.message).to.match(/ui-controller-init-re/);
				});
			});

			it('should set #ready flag and fire #ready event', () => {
				const controller = new _controller2.default();
				const spy = sinon.spy(() => {
					expect(controller).to.have.property('ready', true);
				});

				controller.on('ready', spy);

				return controller.init().then(() => {
					expect(spy.calledOnce).to.be.true;
				});
			});

			it('should initialize own view', () => {
				const view = new _view2.default();
				const controller = new _controller2.default(null, view);
				const spy = _utils2.default.sinon.spy(view, 'init');

				return controller.init().then(() => {
					sinon.assert.calledOnce(spy);
				});
			});

			it('should initialize child controllers in own collections', () => {
				const parentController = new _controller2.default();
				const buttonCollection = new _controllercollection2.default('buttons');
				parentController.collections.add(buttonCollection);

				const childController1 = new _controller2.default();
				const childController2 = new _controller2.default();
				const spy1 = _utils2.default.sinon.spy(childController1, 'init');
				const spy2 = _utils2.default.sinon.spy(childController2, 'init');

				buttonCollection.add(childController1);
				buttonCollection.add(childController2);

				return parentController.init().then(() => {
					expect(buttonCollection.get(0)).to.be.equal(childController1);
					expect(buttonCollection.get(1)).to.be.equal(childController2);

					sinon.assert.calledOnce(spy1);
					sinon.assert.calledOnce(spy2);
				});
			});
		});

		describe('add', () => {
			beforeEach(defineParentControllerClass);

			it('should add a controller to specific collection', () => {
				const parentController = new ParentController();
				const child1 = new _controller2.default();
				const child2 = new _controller2.default();
				const collection = parentController.collections.get('x');

				parentController.add('x', child1);
				parentController.add('x', child2);

				expect(collection).to.have.length(2);
				expect(collection.get(0)).to.be.equal(child1);
				expect(collection.get(1)).to.be.equal(child2);
			});

			it('should add a controller at specific index', () => {
				const parentController = new ParentController();
				const child1 = new _controller2.default();
				const child2 = new _controller2.default();
				const collection = parentController.collections.get('x');

				parentController.add('x', child1);
				parentController.add('x', child2, 0);

				expect(collection).to.have.length(2);
				expect(collection.get(0)).to.be.equal(child2);
				expect(collection.get(1)).to.be.equal(child1);
			});
		});

		describe('remove', () => {
			beforeEach(defineParentControllerClass);

			it('should remove a controller from specific collection – by instance', () => {
				const parentController = new ParentController();
				const child1 = new _controller2.default();
				const child2 = new _controller2.default();
				const child3 = new _controller2.default();
				const collection = parentController.collections.get('x');

				parentController.add('x', child1);
				parentController.add('x', child2);
				parentController.add('x', child3);

				const removed = parentController.remove('x', child2);

				expect(collection).to.have.length(2);
				expect(collection.get(0)).to.be.equal(child1);
				expect(collection.get(1)).to.be.equal(child3);
				expect(removed).to.be.equal(child2);
			});

			it('should remove a controller from specific collection – by index', () => {
				const parentController = new ParentController();
				const child1 = new _controller2.default();
				const child2 = new _controller2.default();
				const child3 = new _controller2.default();
				const collection = parentController.collections.get('x');

				parentController.add('x', child1);
				parentController.add('x', child2);
				parentController.add('x', child3);

				const removed = parentController.remove('x', 1);

				expect(collection).to.have.length(2);
				expect(collection.get(0)).to.be.equal(child1);
				expect(collection.get(1)).to.be.equal(child3);
				expect(removed).to.be.equal(child2);
			});
		});

		describe('collections', () => {
			describe('add', () => {
				beforeEach(defineParentViewClass);
				beforeEach(defineParentControllerClass);

				it('should add a child controller which has no view', () => {
					const parentController = new ParentController(null, new ParentView());
					const collection = parentController.collections.get('x');
					const childController = new _controller2.default();

					return parentController.init().then(() => {
						return collection.add(childController);
					}).then(() => {
						expect(collection.get(0)).to.be.equal(childController);
					});
				});

				it('should append child controller\'s view to parent controller\'s view', () => {
					const parentView = new ParentView();
					const parentController = new ParentController(null, parentView);
					const collection = parentController.collections.get('x');
					const childController = new _controller2.default(null, new _view2.default());
					const spy = _utils2.default.sinon.spy();

					parentView.regions.get('x').views.on('add', spy);

					collection.add(childController);

					sinon.assert.notCalled(spy);

					collection.remove(childController);

					return parentController.init().then(() => {
						return collection.add(childController);
					}).then(() => {
						sinon.assert.calledOnce(spy);
						sinon.assert.calledWithExactly(spy, sinon.match.instanceOf(_eventinfo2.default), childController.view, 0);
					});
				});

				it('should append child controller\'s view to parent controller\'s view at given index', () => {
					const parentController = new ParentController(null, new ParentView());
					const collection = parentController.collections.get('x');

					const childView1 = new _view2.default();
					const childController1 = new _controller2.default(null, childView1);
					const childView2 = new _view2.default();
					const childController2 = new _controller2.default(null, childView2);

					return parentController.init().then(() => {
						return collection.add(childController1).then(() => {
							return collection.add(childController2, 0);
						});
					}).then(() => {
						const region = parentController.view.regions.get('x');

						expect(region.views.get(0)).to.be.equal(childView2);
						expect(region.views.get(1)).to.be.equal(childView1);
					});
				});
			});

			describe('remove', () => {
				beforeEach(defineParentViewClass);

				it('should remove child controller\'s view from parent controller\'s view', () => {
					const parentView = new ParentView();
					const parentController = new ParentController(null, parentView);
					const collection = parentController.collections.get('x');
					const childController = new _controller2.default(null, new _view2.default());
					const spy = _utils2.default.sinon.spy();
					parentView.regions.get('x').views.on('remove', spy);

					collection.add(childController);

					sinon.assert.notCalled(spy);

					return parentController.init().then(() => {
						collection.remove(childController);
						sinon.assert.calledOnce(spy);
						sinon.assert.calledWithExactly(spy, sinon.match.instanceOf(_eventinfo2.default), childController.view);
					});
				});
			});
		});

		describe('destroy', () => {
			beforeEach(defineParentViewClass);
			beforeEach(defineParentControllerClass);

			it('should destroy the controller', () => {
				const view = new _view2.default();
				const controller = new _controller2.default(null, view);
				const spy = _utils2.default.sinon.spy(view, 'destroy');

				return controller.init().then(() => {
					return controller.destroy();
				}).then(() => {
					sinon.assert.calledOnce(spy);

					expect(controller.model).to.be.null;
					expect(controller.ready).to.be.null;
					expect(controller.view).to.be.null;
					expect(controller.collections).to.be.null;
				});
			});

			it('should destroy the controller which has no view', () => {
				const controller = new _controller2.default(null, null);

				return controller.init().then(() => {
					return controller.destroy();
				}).then(() => {
					expect(controller.model).to.be.null;
					expect(controller.view).to.be.null;
					expect(controller.collections).to.be.null;
				});
			});

			it('should destroy child controllers in collections with their views', () => {
				const parentController = new ParentController(null, new ParentView());
				const collection = parentController.collections.get('x');
				const childView = new _view2.default();
				const childController = new _controller2.default(null, childView);
				const spy = _utils2.default.sinon.spy(childView, 'destroy');

				collection.add(childController);

				return parentController.init().then(() => {
					return parentController.destroy();
				}).then(() => {
					sinon.assert.calledOnce(spy);
					expect(childController.model).to.be.null;
					expect(childController.view).to.be.null;
					expect(childController.collections).to.be.null;
				});
			});

			it('should destroy child controllers in collections when they have no views', () => {
				const parentController = new ParentController(null, new ParentView());
				const collection = parentController.collections.get('x');
				const childController = new _controller2.default(null, null);

				collection.add(childController);

				return parentController.init().then(() => {
					return parentController.destroy();
				}).then(() => {
					expect(childController.model).to.be.null;
					expect(childController.view).to.be.null;
					expect(childController.collections).to.be.null;
				});
			});

			// See #11
			it('should correctly destroy multiple controller collections', () => {
				const parentController = new _controller2.default();
				const controllerCollectionCollection = parentController.collections; // Yep... it's correct :D.
				const childControllers = [];
				const collections = ['a', 'b', 'c'].map(name => {
					const collection = new _controllercollection2.default(name);
					const childController = new _controller2.default();

					childController.destroy = sinon.spy();

					parentController.collections.add(collection);
					collection.add(childController);
					childControllers.push(childController);

					return collection;
				});

				return parentController.init().then(() => {
					return parentController.destroy();
				}).then(() => {
					expect(controllerCollectionCollection).to.have.lengthOf(0, 'parentController.collections is empty');
					expect(collections.map(collection => collection.length)).to.deep.equal([0, 0, 0], 'all collections are empty');
					expect(childControllers.map(controller => controller.destroy.calledOnce)).to.deep.equal([true, true, true], 'all child controllers were destroyed');
				});
			});

			// See #11
			it('should correctly destroy collections with multiple child controllers', () => {
				const parentController = new _controller2.default();
				const controllerCollectionCollection = parentController.collections; // Yep... it's correct :D.
				const controllerCollection = new _controllercollection2.default('foo');
				const childControllers = [];

				parentController.collections.add(controllerCollection);

				for (let i = 0; i < 3; i++) {
					const childController = new _controller2.default();

					childController.destroy = sinon.spy();

					childControllers.push(childController);
					parentController.add('foo', childController);
				}

				return parentController.init().then(() => {
					return parentController.destroy();
				}).then(() => {
					expect(controllerCollectionCollection).to.have.lengthOf(0, 'parentController.collections is empty');
					expect(controllerCollection).to.have.lengthOf(0, 'child controller collection is empty');
					expect(childControllers.map(controller => controller.destroy.calledOnce)).to.deep.equal([true, true, true], 'all child controllers were destroyed');
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

	function defineParentControllerClass() {
		ParentController = class extends _controller2.default {
			constructor(...args) {
				super(...args);

				this.collections.add(new _controllercollection2.default('x'));
			}
		};
	}
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
