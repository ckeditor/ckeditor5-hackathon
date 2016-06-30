define('tests', ['/tests/ckeditor5/_utils/classictesteditor.js', '/ckeditor5/basic-styles/bold.js', '/ckeditor5/basic-styles/boldengine.js', '/ckeditor5/ui/button/button.js', '/tests/ckeditor5/_utils/utils.js', '/ckeditor5/utils/keyboard.js'], function (_classictesteditor, _bold, _boldengine, _button, _utils, _keyboard) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	var _classictesteditor2 = _interopRequireDefault(_classictesteditor);

	var _bold2 = _interopRequireDefault(_bold);

	var _boldengine2 = _interopRequireDefault(_boldengine);

	var _button2 = _interopRequireDefault(_button);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	_utils2.default.createSinonSandbox();

	describe('Bold', () => {
		let editor, boldController;

		beforeEach(() => {
			const editorElement = document.createElement('div');
			document.body.appendChild(editorElement);

			return _classictesteditor2.default.create(editorElement, {
				features: [_bold2.default]
			}).then(newEditor => {
				editor = newEditor;

				boldController = editor.ui.featureComponents.create('bold');
			});
		});

		afterEach(() => {
			return editor.destroy();
		});

		it('should be loaded', () => {
			expect(editor.plugins.get(_bold2.default)).to.be.instanceOf(_bold2.default);
		});

		it('should load BoldEngine', () => {
			expect(editor.plugins.get(_boldengine2.default)).to.be.instanceOf(_boldengine2.default);
		});

		it('should register bold feature component', () => {
			expect(boldController).to.be.instanceOf(_button2.default);
		});

		it('should execute bold command on model execute event', () => {
			const executeSpy = _utils2.default.sinon.spy(editor, 'execute');
			const model = boldController.model;

			model.fire('execute');

			sinon.assert.calledOnce(executeSpy);
			sinon.assert.calledWithExactly(executeSpy, 'bold');
		});

		it('should bind model to bold command', () => {
			const model = boldController.model;
			const command = editor.commands.get('bold');

			expect(model.isOn).to.be.false;

			expect(model.isEnabled).to.be.true;

			command.value = true;
			expect(model.isOn).to.be.true;

			command.isEnabled = false;
			expect(model.isEnabled).to.be.false;
		});

		it('should set CTRL+B keystroke', () => {
			const spy = sinon.spy(editor, 'execute');

			const wasHandled = editor.keystrokes.press({ keyCode: _keyboard.keyCodes.b, ctrlKey: true });

			expect(wasHandled).to.be.true;
			expect(spy.calledOnce).to.be.true;
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
