define('tests', ['/tests/ckeditor5/_utils/classictesteditor.js', '/ckeditor5/formats/formats.js', '/ckeditor5/formats/formatsengine.js', '/ckeditor5/ui/dropdown/list/listdropdown.js', '/tests/ckeditor5/_utils/utils.js'], function (_classictesteditor, _formats, _formatsengine, _listdropdown, _utils) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	var _classictesteditor2 = _interopRequireDefault(_classictesteditor);

	var _formats2 = _interopRequireDefault(_formats);

	var _formatsengine2 = _interopRequireDefault(_formatsengine);

	var _listdropdown2 = _interopRequireDefault(_listdropdown);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	_utils2.default.createSinonSandbox();

	describe('Formats', () => {
		let editor, controller;

		beforeEach(() => {
			const editorElement = document.createElement('div');
			document.body.appendChild(editorElement);

			return _classictesteditor2.default.create(editorElement, {
				features: [_formats2.default],
				toolbar: ['formats']
			}).then(newEditor => {
				editor = newEditor;
				controller = editor.ui.featureComponents.create('formats');
			});
		});

		afterEach(() => {
			return editor.destroy();
		});

		it('should be loaded', () => {
			expect(editor.plugins.get(_formats2.default)).to.be.instanceOf(_formats2.default);
		});

		it('should load FormatsEngine', () => {
			expect(editor.plugins.get(_formatsengine2.default)).to.be.instanceOf(_formatsengine2.default);
		});

		it('should register formats feature component', () => {
			const controller = editor.ui.featureComponents.create('formats');

			expect(controller).to.be.instanceOf(_listdropdown2.default);
		});

		it('should execute format command on model execute event', () => {
			const executeSpy = _utils2.default.sinon.spy(editor, 'execute');
			const controller = editor.ui.featureComponents.create('formats');
			const model = controller.model.content;

			model.fire('execute', { id: 'paragraph', label: 'Paragraph' });

			sinon.assert.calledOnce(executeSpy);
			sinon.assert.calledWithExactly(executeSpy, 'format', 'paragraph');
		});

		describe('model to commanad binding', () => {
			let model, command;

			beforeEach(() => {
				model = controller.model;
				command = editor.commands.get('format');
			});

			it('isEnabled', () => {
				expect(model.isEnabled).to.be.true;
				command.isEnabled = false;
				expect(model.isEnabled).to.be.false;
			});

			it('label', () => {
				expect(model.label).to.equal('Paragraph');
				command.value = command.formats[1];
				expect(model.label).to.equal('Heading 1');
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
