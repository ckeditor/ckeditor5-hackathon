define('tests', ['/tests/ckeditor5/_utils/classictesteditor.js', '/ckeditor5/basic-styles/italic.js', '/ckeditor5/basic-styles/italicengine.js', '/ckeditor5/ui/button/button.js', '/tests/ckeditor5/_utils/utils.js', '/ckeditor5/utils/keyboard.js'], function (_classictesteditor, _italic, _italicengine, _button, _utils, _keyboard) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	var _classictesteditor2 = _interopRequireDefault(_classictesteditor);

	var _italic2 = _interopRequireDefault(_italic);

	var _italicengine2 = _interopRequireDefault(_italicengine);

	var _button2 = _interopRequireDefault(_button);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	_utils2.default.createSinonSandbox();

	describe('Italic', () => {
		let editor, italicController;

		beforeEach(() => {
			const editorElement = document.createElement('div');
			document.body.appendChild(editorElement);

			return _classictesteditor2.default.create(editorElement, {
				features: [_italic2.default]
			}).then(newEditor => {
				editor = newEditor;

				italicController = editor.ui.featureComponents.create('italic');
			});
		});

		afterEach(() => {
			return editor.destroy();
		});

		it('should be loaded', () => {
			expect(editor.plugins.get(_italic2.default)).to.be.instanceOf(_italic2.default);
		});

		it('should load ItalicEngine', () => {
			expect(editor.plugins.get(_italicengine2.default)).to.be.instanceOf(_italicengine2.default);
		});

		it('should register italic feature component', () => {
			expect(italicController).to.be.instanceOf(_button2.default);
		});

		it('should execute italic command on model execute event', () => {
			const executeSpy = _utils2.default.sinon.spy(editor, 'execute');
			const model = italicController.model;

			model.fire('execute');

			sinon.assert.calledOnce(executeSpy);
			sinon.assert.calledWithExactly(executeSpy, 'italic');
		});

		it('should bind model to italic command', () => {
			const model = italicController.model;
			const command = editor.commands.get('italic');

			expect(model.isOn).to.be.false;

			expect(model.isEnabled).to.be.true;

			command.value = true;
			expect(model.isOn).to.be.true;

			command.isEnabled = false;
			expect(model.isEnabled).to.be.false;
		});

		it('should set CTRL+I keystroke', () => {
			const spy = sinon.spy(editor, 'execute');

			const wasHandled = editor.keystrokes.press({ keyCode: _keyboard.keyCodes.i, ctrlKey: true });

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
