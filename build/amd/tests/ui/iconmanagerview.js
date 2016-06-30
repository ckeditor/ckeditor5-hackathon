define('tests', ['/tests/ckeditor5/_utils/utils.js', '/ckeditor5/ui/iconmanagerview.js', '/ckeditor5/ui/model.js'], function (_utils, _iconmanagerview, _model) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: ui, iconmanager */

	'use strict';

	var _utils2 = _interopRequireDefault(_utils);

	var _iconmanagerview2 = _interopRequireDefault(_iconmanagerview);

	var _model2 = _interopRequireDefault(_model);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	_utils2.default.createSinonSandbox();

	describe('IconManagerView', () => {
		let view;

		beforeEach(() => {
			view = new _iconmanagerview2.default(new _model2.default({
				sprite: 'foo'
			}));
		});

		describe('constructor', () => {
			it('creates element from template', () => {
				expect(view.element.tagName).to.be.equal('svg');
				expect(view.element.getAttribute('class')).to.be.equal('ck-icon-manager-sprite');
			});
		});

		describe('init', () => {
			it('initializes the sprite', () => {
				view.init();

				expect(view.element.innerHTML).to.be.equal('foo');
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
