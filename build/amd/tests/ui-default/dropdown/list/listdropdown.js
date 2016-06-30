define('tests', ['/ckeditor5/ui/model.js', '/ckeditor5/ui/dropdown/list/listdropdown.js', '/ckeditor5/ui/list/list.js', '/ckeditor5/ui/list/listview.js'], function (_model, _listdropdown, _list, _listview) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: ui, dropdown */

	'use strict';

	var _model2 = _interopRequireDefault(_model);

	var _listdropdown2 = _interopRequireDefault(_listdropdown);

	var _list2 = _interopRequireDefault(_list);

	var _listview2 = _interopRequireDefault(_listview);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('ListDropdown', () => {
		let model, content, dropdown;

		beforeEach(() => {
			content = new _model2.default();

			model = new _model2.default({
				isEnabled: true,
				isOn: false,
				content: content
			});

			dropdown = new _listdropdown2.default(model);
		});

		describe('constructor', () => {
			it('adds a list to the panel', () => {
				const contentCollection = dropdown.panel.collections.get('content');

				expect(contentCollection).to.have.length(1);

				expect(contentCollection.get(0)).to.be.instanceof(_list2.default);
				expect(contentCollection.get(0).view).to.be.instanceof(_listview2.default);

				expect(contentCollection.get(0).model).to.equal(content);
				expect(contentCollection.get(0).view.model).to.be.undefined;
			});

			it('attaches listener on model.content#execute and changes model#isOn', () => {
				model.isOn = true;

				content.fire('execute');
				expect(model.isOn).to.be.false;

				content.fire('execute');
				expect(model.isOn).to.be.false;
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
