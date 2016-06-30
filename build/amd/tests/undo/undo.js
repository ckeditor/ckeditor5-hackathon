define('tests', ['/tests/ckeditor5/_utils/classictesteditor.js', '/ckeditor5/undo/undo.js', '/ckeditor5/undo/undoengine.js', '/ckeditor5/ui/button/button.js', '/tests/ckeditor5/_utils/utils.js', '/ckeditor5/utils/keyboard.js'], function (_classictesteditor, _undo, _undoengine, _button, _utils, _keyboard) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	var _classictesteditor2 = _interopRequireDefault(_classictesteditor);

	var _undo2 = _interopRequireDefault(_undo);

	var _undoengine2 = _interopRequireDefault(_undoengine);

	var _button2 = _interopRequireDefault(_button);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	_utils2.default.createSinonSandbox();

	describe('Undo', () => {
		let editor;

		beforeEach(() => {
			const editorElement = document.createElement('div');

			return _classictesteditor2.default.create(editorElement, {
				features: ['undo']
			}).then(newEditor => {
				editor = newEditor;
			});
		});

		it('should be loaded', () => {
			expect(editor.plugins.get(_undo2.default)).to.be.instanceOf(_undo2.default);
		});

		it('should load UndoEngine', () => {
			expect(editor.plugins.get(_undoengine2.default)).to.be.instanceOf(_undoengine2.default);
		});

		testButton('undo');
		testButton('redo');

		it('should set CTRL+Z keystroke', () => {
			const spy = sinon.stub(editor, 'execute');

			const wasHandled = editor.keystrokes.press({ keyCode: _keyboard.keyCodes.z, ctrlKey: true });

			expect(wasHandled).to.be.true;
			expect(spy.calledWithExactly('undo')).to.be.true;
		});

		it('should set CTRL+Y keystroke', () => {
			const spy = sinon.stub(editor, 'execute');

			const wasHandled = editor.keystrokes.press({ keyCode: _keyboard.keyCodes.y, ctrlKey: true });

			expect(wasHandled).to.be.true;
			expect(spy.calledWithExactly('redo')).to.be.true;
		});

		it('should set CTRL+SHIFT+Z keystroke', () => {
			const spy = sinon.stub(editor, 'execute');

			const wasHandled = editor.keystrokes.press({ keyCode: _keyboard.keyCodes.z, ctrlKey: true, shiftKey: true });

			expect(wasHandled).to.be.true;
			expect(spy.calledWithExactly('redo')).to.be.true;
		});

		function testButton(featureName) {
			describe(`${ featureName } button`, () => {
				let buttonController;

				beforeEach(() => {
					buttonController = editor.ui.featureComponents.create(featureName);
				});

				it('should register feature component', () => {
					expect(buttonController).to.be.instanceOf(_button2.default);
				});

				it(`should execute ${ featureName } command on model execute event`, () => {
					const executeSpy = _utils2.default.sinon.stub(editor, 'execute');
					const model = buttonController.model;

					model.fire('execute');

					sinon.assert.calledOnce(executeSpy);
					sinon.assert.calledWithExactly(executeSpy, featureName);
				});

				it(`should bind model to ${ featureName } command`, () => {
					const model = buttonController.model;
					const command = editor.commands.get(featureName);

					expect(model.isOn).to.be.false;

					const initState = command.isEnabled;
					expect(model.isEnabled).to.equal(initState);

					command.isEnabled = !initState;
					expect(model.isEnabled).to.equal(!initState);
				});
			});
		}
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
