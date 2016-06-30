define('tests', ['/ckeditor5/editor/standardeditor.js', '/tests/ckeditor5/_utils/classictesteditor.js', '/ckeditor5/engine/dataprocessor/htmldataprocessor.js', '/ckeditor5/ui/editorui/boxed/boxededitorui.js', '/ckeditor5/feature.js', '/tests/engine/_utils/model.js', '/tests/ckeditor5/_utils/utils.js'], function (_standardeditor, _classictesteditor, _htmldataprocessor, _boxededitorui, _feature, _model, _utils) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	var _standardeditor2 = _interopRequireDefault(_standardeditor);

	var _classictesteditor2 = _interopRequireDefault(_classictesteditor);

	var _htmldataprocessor2 = _interopRequireDefault(_htmldataprocessor);

	var _boxededitorui2 = _interopRequireDefault(_boxededitorui);

	var _feature2 = _interopRequireDefault(_feature);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	_utils2.default.createSinonSandbox();

	describe('ClassicTestEditor', () => {
		let editorElement;

		beforeEach(() => {
			editorElement = document.createElement('div');
			document.body.appendChild(editorElement);
		});

		describe('constructor', () => {
			it('creates an instance of editor', () => {
				const editor = new _classictesteditor2.default(editorElement, { foo: 1 });

				expect(editor).to.be.instanceof(_standardeditor2.default);

				expect(editor.config.get('foo')).to.equal(1);
				expect(editor).to.have.property('element', editorElement);
			});

			it('creates model and view roots', () => {
				const editor = new _classictesteditor2.default({ foo: 1 });

				expect(editor.document.getRoot()).to.have.property('name', '$root');
				expect(editor.editing.view.getRoot()).to.have.property('name', 'div');
				expect(editor.data.processor).to.be.instanceof(_htmldataprocessor2.default);
			});
		});

		describe('create', () => {
			it('creates an instance of editor', () => {
				return _classictesteditor2.default.create(editorElement, { foo: 1 }).then(editor => {
					expect(editor).to.be.instanceof(_classictesteditor2.default);

					expect(editor.config.get('foo')).to.equal(1);
					expect(editor).to.have.property('element', editorElement);
				});
			});

			it('creates and initilizes the UI', () => {
				return _classictesteditor2.default.create(editorElement, { foo: 1 }).then(editor => {
					expect(editor.ui).to.be.instanceof(_boxededitorui2.default);
				});
			});

			it('loads data from the editor element', () => {
				editorElement.innerHTML = 'foo';

				class FeatureTextInRoot extends _feature2.default {
					init() {
						this.editor.document.schema.allow({ name: '$text', inside: '$root' });
					}
				}

				return _classictesteditor2.default.create(editorElement, { features: [FeatureTextInRoot] }).then(editor => {
					expect((0, _model.getData)(editor.document, { withoutSelection: true })).to.equal('foo');
				});
			});
		});

		describe('destroy', () => {
			it('destroys UI and calls super.destroy()', () => {
				return _classictesteditor2.default.create(editorElement, { foo: 1 }).then(editor => {
					const superSpy = _utils2.default.sinon.spy(_standardeditor2.default.prototype, 'destroy');
					const uiSpy = sinon.spy(editor.ui, 'destroy');

					return editor.destroy().then(() => {
						expect(superSpy.calledOnce).to.be.true;
						expect(uiSpy.calledOnce).to.be.true;
					});
				});
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
