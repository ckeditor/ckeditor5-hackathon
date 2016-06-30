define('tests', ['/tests/ckeditor5/_utils/virtualtesteditor.js', '/ckeditor5/enter/enter.js', '/ckeditor5/enter/entercommand.js', '/ckeditor5/engine/view/observer/domeventdata.js'], function (_virtualtesteditor, _enter, _entercommand, _domeventdata) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	var _virtualtesteditor2 = _interopRequireDefault(_virtualtesteditor);

	var _enter2 = _interopRequireDefault(_enter);

	var _entercommand2 = _interopRequireDefault(_entercommand);

	var _domeventdata2 = _interopRequireDefault(_domeventdata);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('Enter feature', () => {
		let editor, editingView;

		beforeEach(() => {
			return _virtualtesteditor2.default.create({
				features: [_enter2.default]
			}).then(newEditor => {
				editor = newEditor;
				editingView = editor.editing.view;
			});
		});

		it('creates the commands', () => {
			expect(editor.commands.get('enter')).to.be.instanceof(_entercommand2.default);
		});

		it('listens to the editing view enter event', () => {
			const spy = editor.execute = sinon.spy();
			const view = editor.editing.view;
			const domEvt = getDomEvent();

			view.fire('enter', new _domeventdata2.default(editingView, domEvt));

			expect(spy.calledOnce).to.be.true;
			expect(spy.calledWithExactly('enter')).to.be.true;

			expect(domEvt.preventDefault.calledOnce).to.be.true;
		});

		function getDomEvent() {
			return {
				preventDefault: sinon.spy()
			};
		}
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
