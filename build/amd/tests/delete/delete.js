define('tests', ['/tests/ckeditor5/_utils/virtualtesteditor.js', '/ckeditor5/delete/delete.js', '/ckeditor5/engine/view/observer/domeventdata.js', '/ckeditor5/utils/keyboard.js'], function (_virtualtesteditor, _delete, _domeventdata, _keyboard) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	var _virtualtesteditor2 = _interopRequireDefault(_virtualtesteditor);

	var _delete2 = _interopRequireDefault(_delete);

	var _domeventdata2 = _interopRequireDefault(_domeventdata);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('Delete feature', () => {
		let editor, editingView;

		beforeEach(() => {
			return _virtualtesteditor2.default.create({
				features: [_delete2.default]
			}).then(newEditor => {
				editor = newEditor;
				editingView = editor.editing.view;
			});
		});

		it('creates two commands', () => {
			expect(editor.commands.get('delete')).to.have.property('direction', 'BACKWARD');
			expect(editor.commands.get('forwardDelete')).to.have.property('direction', 'FORWARD');
		});

		it('listens to the editing view delete event', () => {
			const spy = editor.execute = sinon.spy();
			const view = editor.editing.view;
			const domEvt = getDomEvent();

			view.fire('delete', new _domeventdata2.default(editingView, domEvt, {
				direction: 'FORWARD',
				unit: 'CHARACTER'
			}));

			expect(spy.calledOnce).to.be.true;
			expect(spy.calledWithExactly('forwardDelete')).to.be.true;

			expect(domEvt.preventDefault.calledOnce).to.be.true;

			view.fire('delete', new _domeventdata2.default(editingView, getDomEvent(), {
				direction: 'BACKWARD',
				unit: 'CHARACTER'
			}));

			expect(spy.calledTwice).to.be.true;
			expect(spy.calledWithExactly('delete')).to.be.true;
		});

		describe('delete event', () => {
			it('is fired on keydown', () => {
				const view = editor.editing.view;
				const spy = sinon.spy();

				view.on('delete', spy);

				view.fire('keydown', new _domeventdata2.default(editingView, getDomEvent(), {
					keyCode: (0, _keyboard.getCode)('delete')
				}));

				expect(spy.calledOnce).to.be.true;

				const data = spy.args[0][1];
				expect(data).to.have.property('direction', 'FORWARD');
				expect(data).to.have.property('unit', 'CHARACTER');
			});

			it('is fired with a proper direction and unit', () => {
				const view = editor.editing.view;
				const spy = sinon.spy();

				view.on('delete', spy);

				view.fire('keydown', new _domeventdata2.default(editingView, getDomEvent(), {
					keyCode: (0, _keyboard.getCode)('backspace'),
					altKey: true
				}));

				expect(spy.calledOnce).to.be.true;

				const data = spy.args[0][1];
				expect(data).to.have.property('direction', 'BACKWARD');
				expect(data).to.have.property('unit', 'WORD');
			});

			it('is not fired on keydown when keyCode does not match backspace or delete', () => {
				const view = editor.editing.view;
				const spy = sinon.spy();

				view.on('delete', spy);

				view.fire('keydown', new _domeventdata2.default(editingView, getDomEvent(), {
					keyCode: 1
				}));

				expect(spy.calledOnce).to.be.false;
			});
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
