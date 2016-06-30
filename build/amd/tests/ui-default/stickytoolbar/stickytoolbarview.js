define('tests', ['/tests/ckeditor5/_utils/utils.js', '/ckeditor5/ui/stickytoolbar/stickytoolbarview.js', '/ckeditor5/ui/toolbar/toolbarview.js', '/ckeditor5/ui/model.js'], function (_utils, _stickytoolbarview, _toolbarview, _model) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: ui, toolbar */

	'use strict';

	var _utils2 = _interopRequireDefault(_utils);

	var _stickytoolbarview2 = _interopRequireDefault(_stickytoolbarview);

	var _toolbarview2 = _interopRequireDefault(_toolbarview);

	var _model2 = _interopRequireDefault(_model);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	_utils2.default.createSinonSandbox();

	describe('StickyToolbarView', () => {
		let model, view;

		beforeEach(() => {
			model = new _model2.default();
			view = new _stickytoolbarview2.default(model);

			// In real life, it would be set by the Toollbar Controller (like editor binding).
			model.set('isActive', false);

			document.body.appendChild(view.element);

			return view.init();
		});

		describe('constructor', () => {
			it('inherits from ToolbarView', () => {
				expect(view).to.be.instanceof(_toolbarview2.default);
			});

			it('sets model.isSticky false', () => {
				expect(model.isSticky).to.be.false;
			});
		});

		describe('view.element bindings', () => {
			it('work when model.isSticky changes', () => {
				expect(view.element.classList.contains('ck-toolbar_sticky')).to.be.false;

				model.isSticky = true;

				expect(view.element.classList.contains('ck-toolbar_sticky')).to.be.true;
			});
		});

		describe('init', () => {
			it('creates view._elementPlaceholder', () => {
				expect(view._elementPlaceholder.classList.contains('ck-toolbar__placeholder')).to.be.true;
				expect(view.element.previousSibling).to.equal(view._elementPlaceholder);
			});

			it('listens to window#scroll event and calls view._checkIfShouldBeSticky', () => {
				const spy = _utils2.default.sinon.spy(view, '_checkIfShouldBeSticky');

				window.dispatchEvent(new Event('scroll'));

				expect(spy.calledOnce).to.be.true;
			});

			it('listens to model.isActive calls view._checkIfShouldBeSticky or view.detach', () => {
				const checkSpy = _utils2.default.sinon.spy(view, '_checkIfShouldBeSticky');
				const detachSpy = _utils2.default.sinon.spy(view, '_detach');

				expect(checkSpy.notCalled).to.be.true;
				expect(detachSpy.notCalled).to.be.true;

				model.isActive = true;

				expect(checkSpy.calledOnce).to.be.true;
				expect(detachSpy.calledOnce).to.be.true;

				model.isActive = false;

				expect(checkSpy.calledOnce).to.be.true;
				expect(detachSpy.calledTwice).to.be.true;
			});
		});

		describe('destroy', () => {
			it('calls destroy on parent class', () => {
				const spy = _utils2.default.sinon.spy(_toolbarview2.default.prototype, 'destroy');

				view.destroy();

				expect(spy.calledOnce).to.be.true;
			});

			it('removes view._elementPlaceholder from DOM', () => {
				view.destroy();
				expect(view._elementPlaceholder.parentNode).to.be.null;
			});
		});

		describe('_checkIfShouldBeSticky', () => {
			it('sticks the toolbar if beyond the top of the viewport (toolbar is active)', () => {
				model.isActive = true;

				_utils2.default.sinon.stub(HTMLElement.prototype, 'getBoundingClientRect', () => {
					return {
						top: -10
					};
				});

				const stickSpy = _utils2.default.sinon.spy(view, '_stick');
				const detachSpy = _utils2.default.sinon.spy(view, '_detach');

				view._checkIfShouldBeSticky();

				expect(stickSpy.calledOnce).to.be.true;
				expect(detachSpy.notCalled).to.be.true;
			});

			it('detaches the toolbar if beyond the top of the viewport (toolbar is inactive)', () => {
				model.isActive = false;

				_utils2.default.sinon.stub(HTMLElement.prototype, 'getBoundingClientRect', () => {
					return {
						top: -10
					};
				});

				const stickSpy = _utils2.default.sinon.spy(view, '_stick');
				const detachSpy = _utils2.default.sinon.spy(view, '_detach');

				view._checkIfShouldBeSticky();

				expect(stickSpy.notCalled).to.be.true;
				expect(detachSpy.calledOnce).to.be.true;
			});

			it('detaches the toolbar if in the viewport (toolbar is active)', () => {
				model.isActive = true;

				_utils2.default.sinon.stub(HTMLElement.prototype, 'getBoundingClientRect', () => {
					return {
						top: 10
					};
				});

				const stickSpy = _utils2.default.sinon.spy(view, '_stick');
				const detachSpy = _utils2.default.sinon.spy(view, '_detach');

				view._checkIfShouldBeSticky();

				expect(stickSpy.notCalled).to.be.true;
				expect(detachSpy.calledOnce).to.be.true;
			});
		});

		describe('_stick', () => {
			it('updates view._elementPlaceholder styles', () => {
				view._stick({ top: 10, width: 20, height: 30 });

				expect(view._elementPlaceholder.style.display).to.equal('block');
				expect(view._elementPlaceholder.style.height).to.equal('30px');
			});

			it('updates view.element styles', () => {
				view._stick({ top: 10, width: 20, height: 30 });

				expect(view.element.style.width).to.equal('22px');
				// It's tricky to mock window.scrollX.
				expect(view.element.style.marginLeft).to.not.equal('');
			});

			it('updates model.isSticky attribute', () => {
				expect(model.isSticky).to.be.false;

				view._stick({ top: 10, width: 20, height: 30 });

				expect(model.isSticky).to.be.true;
			});
		});

		describe('_detach', () => {
			it('updates view._elementPlaceholder styles', () => {
				view._detach();

				expect(view._elementPlaceholder.style.display).to.equal('none');
			});

			it('updates view.element styles', () => {
				view._detach();

				expect(view.element.style.width).to.equal('auto');
				expect(view.element.style.marginLeft).to.equal('auto');
			});

			it('updates model.isSticky attribute', () => {
				model.isSticky = true;

				view._detach();

				expect(model.isSticky).to.be.false;
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
