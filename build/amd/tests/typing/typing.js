define('tests', ['/tests/ckeditor5/_utils/virtualtesteditor.js', '/ckeditor5/typing/typing.js', '/ckeditor5/paragraph/paragraph.js', '/ckeditor5/engine/model/range.js', '/ckeditor5/engine/view/text.js', '/ckeditor5/engine/view/element.js', '/ckeditor5/utils/emittermixin.js', '/ckeditor5/utils/keyboard.js', '/tests/engine/_utils/model.js', '/tests/engine/_utils/view.js'], function (_virtualtesteditor, _typing, _paragraph, _range, _text, _element, _emittermixin, _keyboard, _model, _view) {
	/*
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	var _virtualtesteditor2 = _interopRequireDefault(_virtualtesteditor);

	var _typing2 = _interopRequireDefault(_typing);

	var _paragraph2 = _interopRequireDefault(_paragraph);

	var _range2 = _interopRequireDefault(_range);

	var _text2 = _interopRequireDefault(_text);

	var _element2 = _interopRequireDefault(_element);

	var _emittermixin2 = _interopRequireDefault(_emittermixin);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('Typing feature', () => {
		let editor, model, modelRoot, view, viewRoot, listenter;

		before(() => {
			listenter = Object.create(_emittermixin2.default);

			return _virtualtesteditor2.default.create({
				features: [_typing2.default, _paragraph2.default]
			}).then(newEditor => {
				editor = newEditor;
				model = editor.editing.model;
				modelRoot = model.getRoot();
				view = editor.editing.view;
				viewRoot = view.getRoot();
			});
		});

		beforeEach(() => {
			editor.setData('<p>foobar</p>');

			model.enqueueChanges(() => {
				model.selection.setRanges([_range2.default.createFromParentsAndOffsets(modelRoot.getChild(0), 3, modelRoot.getChild(0), 3)]);
			});
		});

		afterEach(() => {
			listenter.stopListening();
		});

		it('has a buffer configured to default value of config.typing.undoStep', () => {
			expect(editor.plugins.get(_typing2.default)._buffer).to.have.property('limit', 20);
		});

		it('has a buffer configured to config.typing.undoStep', () => {
			return _virtualtesteditor2.default.create({
				features: [_typing2.default],
				typing: {
					undoStep: 5
				}
			}).then(editor => {
				expect(editor.plugins.get(_typing2.default)._buffer).to.have.property('limit', 5);
			});
		});

		describe('mutations handling', () => {
			it('should handle text mutation', () => {
				view.fire('mutations', [{
					type: 'text',
					oldText: 'foobar',
					newText: 'fooxbar',
					node: viewRoot.getChild(0).getChild(0)
				}]);

				expect((0, _model.getData)(model)).to.equal('<paragraph>foox<selection />bar</paragraph>');
				expect((0, _view.getData)(view)).to.equal('<p>foox{}bar</p>');
			});

			it('should handle text mutation change', () => {
				view.fire('mutations', [{
					type: 'text',
					oldText: 'foobar',
					newText: 'foodar',
					node: viewRoot.getChild(0).getChild(0)
				}]);

				expect((0, _model.getData)(model)).to.equal('<paragraph>food<selection />ar</paragraph>');
				expect((0, _view.getData)(view)).to.equal('<p>food{}ar</p>');
			});

			it('should handle text node insertion', () => {
				editor.setData('<p></p>');

				view.fire('mutations', [{
					type: 'children',
					oldChildren: [],
					newChildren: [new _text2.default('x')],
					node: viewRoot.getChild(0)
				}]);

				expect((0, _model.getData)(model)).to.equal('<paragraph>x<selection /></paragraph>');
				expect((0, _view.getData)(view)).to.equal('<p>x{}</p>');
			});

			it('should do nothing when two nodes where inserted', () => {
				editor.setData('<p></p>');

				view.fire('mutations', [{
					type: 'children',
					oldChildren: [],
					newChildren: [new _text2.default('x'), new _element2.default('img')],
					node: viewRoot.getChild(0)
				}]);

				expect((0, _model.getData)(model)).to.equal('<paragraph></paragraph>');
				expect((0, _view.getData)(view)).to.equal('<p></p>');
			});

			it('should do nothing when node was removed', () => {
				view.fire('mutations', [{
					type: 'children',
					oldChildren: [viewRoot.getChild(0).getChild(0)],
					newChildren: [],
					node: viewRoot.getChild(0)
				}]);

				expect((0, _model.getData)(model)).to.equal('<paragraph>foo<selection />bar</paragraph>');
				expect((0, _view.getData)(view)).to.equal('<p>foo{}bar</p>');
			});

			it('should do nothing when element was inserted', () => {
				editor.setData('<p></p>');

				view.fire('mutations', [{
					type: 'children',
					oldChildren: [],
					newChildren: [new _element2.default('img')],
					node: viewRoot.getChild(0)
				}]);

				expect((0, _model.getData)(model)).to.equal('<paragraph></paragraph>');
				expect((0, _view.getData)(view)).to.equal('<p></p>');
			});
		});

		describe('keystroke handling', () => {
			it('should remove contents', () => {
				model.enqueueChanges(() => {
					model.selection.setRanges([_range2.default.createFromParentsAndOffsets(modelRoot.getChild(0), 2, modelRoot.getChild(0), 4)]);
				});

				listenter.listenTo(view, 'keydown', () => {
					expect((0, _model.getData)(model)).to.equal('<paragraph>fo<selection />ar</paragraph>');

					view.fire('mutations', [{
						type: 'text',
						oldText: 'foar',
						newText: 'foyar',
						node: viewRoot.getChild(0).getChild(0)
					}]);
				}, null, 1000000);

				view.fire('keydown', { keyCode: (0, _keyboard.getCode)('y') });

				expect((0, _model.getData)(model)).to.equal('<paragraph>foy<selection />ar</paragraph>');
				expect((0, _view.getData)(view)).to.equal('<p>foy{}ar</p>');
			});

			it('should do nothing on arrow key', () => {
				model.enqueueChanges(() => {
					model.selection.setRanges([_range2.default.createFromParentsAndOffsets(modelRoot.getChild(0), 2, modelRoot.getChild(0), 4)]);
				});

				view.fire('keydown', { keyCode: (0, _keyboard.getCode)('arrowright') });

				expect((0, _model.getData)(model)).to.equal('<paragraph>fo<selection>ob</selection>ar</paragraph>');
			});

			it('should do nothing on ctrl combinations', () => {
				model.enqueueChanges(() => {
					model.selection.setRanges([_range2.default.createFromParentsAndOffsets(modelRoot.getChild(0), 2, modelRoot.getChild(0), 4)]);
				});

				view.fire('keydown', { ctrlKey: true, keyCode: (0, _keyboard.getCode)('c') });

				expect((0, _model.getData)(model)).to.equal('<paragraph>fo<selection>ob</selection>ar</paragraph>');
			});

			it('should do nothing on non printable keys', () => {
				model.enqueueChanges(() => {
					model.selection.setRanges([_range2.default.createFromParentsAndOffsets(modelRoot.getChild(0), 2, modelRoot.getChild(0), 4)]);
				});

				view.fire('keydown', { keyCode: 16 }); // Shift
				view.fire('keydown', { keyCode: 35 }); // Home
				view.fire('keydown', { keyCode: 112 }); // F1

				expect((0, _model.getData)(model)).to.equal('<paragraph>fo<selection>ob</selection>ar</paragraph>');
			});

			it('should do nothing if selection is collapsed', () => {
				view.fire('keydown', { ctrlKey: true, keyCode: (0, _keyboard.getCode)('c') });

				expect((0, _model.getData)(model)).to.equal('<paragraph>foo<selection />bar</paragraph>');
			});
		});

		describe('destroy', () => {
			it('should destroy change buffer', () => {
				const typing = new _typing2.default(new _virtualtesteditor2.default());
				typing.init();

				const destroy = typing._buffer.destroy = sinon.spy();

				typing.destroy();

				expect(destroy.calledOnce).to.be.true;
				expect(typing._buffer).to.be.null;
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
