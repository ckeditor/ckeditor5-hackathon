define('tests', ['/tests/ckeditor5/_utils/virtualtesteditor.js', '/ckeditor5/keystrokehandler.js', '/ckeditor5/utils/keyboard.js'], function (_virtualtesteditor, _keystrokehandler, _keyboard) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: browser-only */

	'use strict';

	var _virtualtesteditor2 = _interopRequireDefault(_virtualtesteditor);

	var _keystrokehandler2 = _interopRequireDefault(_keystrokehandler);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('KeystrokeHandler', () => {
		let editor;

		beforeEach(() => {
			return _virtualtesteditor2.default.create().then(newEditor => {
				editor = newEditor;
				editor.keystrokes = new _keystrokehandler2.default(editor);
			});
		});

		describe('constructor', () => {
			it('triggers #press on #keydown', () => {
				const spy = sinon.spy(editor.keystrokes, 'press');
				const keyEvtData = { keyCode: 1 };

				editor.editing.view.fire('keydown', keyEvtData);

				expect(spy.calledOnce).to.be.true;
				expect(spy.calledWithExactly(keyEvtData));
			});

			it('prevents default when keystroke was handled', () => {
				editor.keystrokes.press = () => true;

				const keyEvtData = { keyCode: 1, preventDefault: sinon.spy() };

				editor.editing.view.fire('keydown', keyEvtData);

				expect(keyEvtData.preventDefault.calledOnce).to.be.true;
			});
		});

		describe('press', () => {
			it('executes a command', () => {
				const spy = sinon.stub(editor, 'execute');

				editor.keystrokes.set('ctrl + A', 'foo');

				const wasHandled = editor.keystrokes.press(getCtrlA());

				expect(spy.calledOnce).to.be.true;
				expect(spy.calledWithExactly('foo')).to.be.true;
				expect(wasHandled).to.be.true;
			});

			it('executes a callback', () => {
				const spy = sinon.spy();
				const keyEvtData = getCtrlA();

				editor.keystrokes.set('ctrl + A', spy);

				const wasHandled = editor.keystrokes.press(keyEvtData);

				expect(spy.calledOnce).to.be.true;
				expect(spy.calledWithExactly(keyEvtData)).to.be.true;
				expect(wasHandled).to.be.true;
			});

			it('returns false when no handler', () => {
				const keyEvtData = getCtrlA();

				const wasHandled = editor.keystrokes.press(keyEvtData);

				expect(wasHandled).to.be.false;
			});
		});

		describe('set', () => {
			it('handles array format', () => {
				const spy = sinon.spy();

				editor.keystrokes.set(['ctrl', 'A'], spy);

				expect(editor.keystrokes.press(getCtrlA())).to.be.true;
			});

			it('overrides existing keystroke', () => {
				const spy1 = sinon.spy();
				const spy2 = sinon.spy();

				editor.keystrokes.set(['ctrl', 'A'], spy1);
				editor.keystrokes.set(['ctrl', 'A'], spy2);

				editor.keystrokes.press(getCtrlA());

				expect(spy1.calledOnce).to.be.false;
				expect(spy2.calledOnce).to.be.true;
			});
		});

		describe('destroy', () => {
			it('detaches #keydown listener', () => {
				const spy = sinon.spy(editor.keystrokes, 'press');

				editor.keystrokes.destroy();

				editor.editing.view.fire('keydown', { keyCode: 1 });

				expect(spy.called).to.be.false;
			});

			it('removes all keystrokes', () => {
				const spy = sinon.spy();
				const keystrokeHandler = editor.keystrokes;

				keystrokeHandler.set('ctrl + A', spy);

				keystrokeHandler.destroy();

				const wasHandled = keystrokeHandler.press(getCtrlA());

				expect(wasHandled).to.be.false;
				expect(spy.called).to.be.false;
			});
		});
	});

	function getCtrlA() {
		return { keyCode: _keyboard.keyCodes.a, ctrlKey: true };
	}
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
