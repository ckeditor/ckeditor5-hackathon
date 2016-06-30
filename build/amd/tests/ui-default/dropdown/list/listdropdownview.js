define('tests', ['/ckeditor5/ui/dropdown/list/listdropdownview.js', '/ckeditor5/ui/model.js'], function (_listdropdownview, _model) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: ui, dropdown */

	'use strict';

	var _listdropdownview2 = _interopRequireDefault(_listdropdownview);

	var _model2 = _interopRequireDefault(_model);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('ListDropdownView', () => {
		let model, view;

		beforeEach(() => {
			model = new _model2.default({
				isOn: false
			});

			view = new _listdropdownview2.default(model);
			view.init();

			document.body.appendChild(view.element);
		});

		describe('constructor', () => {
			it('listens to model#isOn and reacts to DOM events (valid target)', () => {
				// Open the dropdown.
				model.isOn = true;
				expect(Object.keys(view._listeningTo)).to.have.length(2);

				// Fire event from outside of the dropdown.
				document.body.dispatchEvent(new Event('click', {
					bubbles: true
				}));

				// Closed the dropdown.
				expect(model.isOn).to.be.false;
				expect(Object.keys(view._listeningTo)).to.have.length(1);

				// Fire event from outside of the dropdown.
				document.body.dispatchEvent(new Event('click', {
					bubbles: true
				}));

				// Dropdown is still closed.
				expect(model.isOn).to.be.false;
				expect(Object.keys(view._listeningTo)).to.have.length(1);
			});

			it('listens to model#isOn and reacts to DOM events (invalid target)', () => {
				// Open the dropdown.
				model.isOn = true;
				expect(Object.keys(view._listeningTo)).to.have.length(2);

				// Event from view.element should be discarded.
				view.element.dispatchEvent(new Event('click', {
					bubbles: true
				}));

				// Dropdown is still open.
				expect(model.isOn).to.be.true;
				expect(Object.keys(view._listeningTo)).to.have.length(2);

				// Event from within view.element should be discarded.
				const child = document.createElement('div');
				view.element.appendChild(child);

				child.dispatchEvent(new Event('click', {
					bubbles: true
				}));

				// Dropdown is still open.
				expect(model.isOn).to.be.true;
				expect(Object.keys(view._listeningTo)).to.have.length(2);
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
