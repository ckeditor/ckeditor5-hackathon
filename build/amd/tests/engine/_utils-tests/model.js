define('tests', ['/tests/engine/_utils/model.js', '/ckeditor5/engine/model/document.js', '/ckeditor5/engine/model/documentfragment.js', '/ckeditor5/engine/model/element.js', '/ckeditor5/engine/model/text.js', '/ckeditor5/engine/model/range.js', '/ckeditor5/engine/model/position.js'], function (_model, _document, _documentfragment, _element, _text, _range, _position) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	var _document2 = _interopRequireDefault(_document);

	var _documentfragment2 = _interopRequireDefault(_documentfragment);

	var _element2 = _interopRequireDefault(_element);

	var _text2 = _interopRequireDefault(_text);

	var _range2 = _interopRequireDefault(_range);

	var _position2 = _interopRequireDefault(_position);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('model test utils', () => {
		let document, root, selection, sandbox;

		beforeEach(() => {
			document = new _document2.default();
			root = document.createRoot('main', '$root');
			selection = document.selection;
			sandbox = sinon.sandbox.create();
			selection.removeAllRanges();
		});

		afterEach(() => {
			sandbox.restore();
		});

		describe('getData', () => {
			it('should use stringify method', () => {
				const stringifySpy = sandbox.spy(_model.getData, '_stringify');
				root.appendChildren(new _element2.default('b', null, ['btext']));

				expect((0, _model.getData)(document, { withoutSelection: true })).to.equal('<b>btext</b>');
				sinon.assert.calledOnce(stringifySpy);
				sinon.assert.calledWithExactly(stringifySpy, root);
			});

			it('should use stringify method with selection', () => {
				const stringifySpy = sandbox.spy(_model.getData, '_stringify');
				root.appendChildren(new _element2.default('b', null, ['btext']));
				document.selection.addRange(_range2.default.createFromParentsAndOffsets(root, 0, root, 1));

				expect((0, _model.getData)(document)).to.equal('<selection><b>btext</b></selection>');
				sinon.assert.calledOnce(stringifySpy);
				sinon.assert.calledWithExactly(stringifySpy, root, document.selection);
			});
		});

		describe('setData', () => {
			it('should use parse method', () => {
				const parseSpy = sandbox.spy(_model.setData, '_parse');
				const options = {};
				const data = '<b>btext</b>text';

				(0, _model.setData)(document, data, options);

				expect((0, _model.getData)(document, { withoutSelection: true })).to.equal(data);
				sinon.assert.calledOnce(parseSpy);
				const args = parseSpy.firstCall.args;
				expect(args[0]).to.equal(data);
			});

			it('should use parse method with selection', () => {
				const parseSpy = sandbox.spy(_model.setData, '_parse');
				const options = {};
				const data = '<selection><b>btext</b></selection>';

				(0, _model.setData)(document, data, options);

				expect((0, _model.getData)(document)).to.equal(data);
				sinon.assert.calledOnce(parseSpy);
				const args = parseSpy.firstCall.args;
				expect(args[0]).to.equal(data);
			});
		});

		describe('stringify', () => {
			it('should stringify text', () => {
				const text = new _text2.default('text', { underline: true, bold: true });
				expect((0, _model.stringify)(text)).to.equal('<$text bold=true underline=true>text</$text>');
			});

			it('should stringify element', () => {
				const element = new _element2.default('a', null, [new _element2.default('b', null, 'btext'), 'atext']);
				expect((0, _model.stringify)(element)).to.equal('<a><b>btext</b>atext</a>');
			});

			it('should stringify document fragment', () => {
				const fragment = new _documentfragment2.default([new _element2.default('b', null, 'btext'), 'atext']);
				expect((0, _model.stringify)(fragment)).to.equal('<b>btext</b>atext');
			});

			it('writes elements and texts', () => {
				root.appendChildren([new _element2.default('a', null, 'atext'), new _element2.default('b', null, [new _element2.default('c1'), 'ctext', new _element2.default('c2')]), new _element2.default('d')]);

				expect((0, _model.stringify)(root)).to.equal('<a>atext</a><b><c1></c1>ctext<c2></c2></b><d></d>');
			});

			it('writes element attributes', () => {
				root.appendChildren(new _element2.default('a', { foo: true, bar: 1, car: false }, [new _element2.default('b', { fooBar: 'x y', barFoo: { x: 1, y: 2 } })]));

				// Note: attributes are written in a very simplistic way, because they are not to be parsed. They are just
				// to be compared in the tests with some patterns.
				expect((0, _model.stringify)(root)).to.equal('<a bar=1 car=false foo=true><b barFoo={"x":1,"y":2} fooBar="x y"></b></a>');
			});

			it('writes text attributes', () => {
				root.appendChildren([new _text2.default('foo', { bold: true }), 'bar', new _text2.default('bom', { bold: true, italic: true }), new _element2.default('a', null, [new _text2.default('pom', { underline: true, bold: true })])]);

				expect((0, _model.stringify)(root)).to.equal('<$text bold=true>foo</$text>' + 'bar' + '<$text bold=true italic=true>bom</$text>' + '<a><$text bold=true underline=true>pom</$text></a>');
			});

			describe('selection', () => {
				let elA, elB;

				beforeEach(() => {
					elA = new _element2.default('a');
					elB = new _element2.default('b');

					root.appendChildren([elA, 'foo', new _text2.default('bar', { bold: true }), elB]);
				});

				it('writes selection in an empty root', () => {
					const root = document.createRoot('empty', '$root');
					selection.collapse(root);

					expect((0, _model.stringify)(root, selection)).to.equal('<selection />');
				});

				it('writes selection collapsed in an element', () => {
					selection.collapse(root);

					expect((0, _model.stringify)(root, selection)).to.equal('<selection /><a></a>foo<$text bold=true>bar</$text><b></b>');
				});

				it('writes selection collapsed in a text', () => {
					selection.collapse(root, 3);

					expect((0, _model.stringify)(root, selection)).to.equal('<a></a>fo<selection />o<$text bold=true>bar</$text><b></b>');
				});

				it('writes selection collapsed at the text left boundary', () => {
					selection.collapse(elA, 'AFTER');

					expect((0, _model.stringify)(root, selection)).to.equal('<a></a><selection />foo<$text bold=true>bar</$text><b></b>');
				});

				it('writes selection collapsed at the text right boundary', () => {
					selection.collapse(elB, 'BEFORE');

					expect((0, _model.stringify)(root, selection)).to.equal('<a></a>foo<$text bold=true>bar</$text><selection bold=true /><b></b>');
				});

				it('writes selection collapsed at the end of the root', () => {
					selection.collapse(root, 'END');

					// Needed due to https://github.com/ckeditor/ckeditor5-engine/issues/320.
					selection.clearAttributes();

					expect((0, _model.stringify)(root, selection)).to.equal('<a></a>foo<$text bold=true>bar</$text><b></b><selection />');
				});

				it('writes selection attributes', () => {
					selection.collapse(root);
					selection.setAttributesTo({ italic: true, bold: true });

					expect((0, _model.stringify)(root, selection)).to.equal('<selection bold=true italic=true /><a></a>foo<$text bold=true>bar</$text><b></b>');
				});

				it('writes selection collapsed selection in a text with attributes', () => {
					selection.collapse(root, 5);

					expect((0, _model.stringify)(root, selection)).to.equal('<a></a>foo<$text bold=true>b<selection bold=true />ar</$text><b></b>');
				});

				it('writes flat selection containing couple of nodes', () => {
					selection.addRange(_range2.default.createFromParentsAndOffsets(root, 0, root, 4));

					expect((0, _model.stringify)(root, selection)).to.equal('<selection><a></a>foo</selection><$text bold=true>bar</$text><b></b>');
				});

				it('writes flat selection within text', () => {
					selection.addRange(_range2.default.createFromParentsAndOffsets(root, 2, root, 3));

					expect((0, _model.stringify)(root, selection)).to.equal('<a></a>f<selection>o</selection>o<$text bold=true>bar</$text><b></b>');
				});

				it('writes multi-level selection', () => {
					selection.addRange(_range2.default.createFromParentsAndOffsets(elA, 0, elB, 0));

					expect((0, _model.stringify)(root, selection)).to.equal('<a><selection></a>foo<$text bold=true>bar</$text><b></selection></b>');
				});

				it('writes backward selection', () => {
					selection.addRange(_range2.default.createFromParentsAndOffsets(elA, 0, elB, 0), true);

					expect((0, _model.stringify)(root, selection)).to.equal('<a><selection backward></a>foo<$text bold=true>bar</$text><b></selection></b>');
				});

				it('uses range and coverts it to selection', () => {
					const range = _range2.default.createFromParentsAndOffsets(elA, 0, elB, 0);

					expect((0, _model.stringify)(root, range)).to.equal('<a><selection></a>foo<$text bold=true>bar</$text><b></selection></b>');
				});

				it('uses position and converts it to collapsed selection', () => {
					const position = new _position2.default(root, [0]);

					expect((0, _model.stringify)(root, position)).to.equal('<selection /><a></a>foo<$text bold=true>bar</$text><b></b>');
				});
			});
		});

		describe('parse', () => {
			test('creates elements', {
				data: '<a></a><b><c></c></b>'
			});

			test('creates text nodes', {
				data: 'foo<a>bar</a>bom'
			});

			test('sets elements attributes', {
				data: '<a foo=1 bar=true car="x y"><b x="y"></b></a>',
				output: '<a bar=true car="x y" foo=1><b x="y"></b></a>',
				check(root) {
					expect(root.getChild(0).getAttribute('car')).to.equal('x y');
				}
			});

			test('sets complex attributes', {
				data: '<a foo={"a":1,"b":"c"}></a>',
				check(root) {
					expect(root.getChild(0).getAttribute('foo')).to.have.property('a', 1);
				}
			});

			test('sets text attributes', {
				data: '<$text bold=true italic=true>foo</$text><$text bold=true>bar</$text>bom',
				check(root) {
					expect(root.getChildCount()).to.equal(9);
					expect(root.getChild(0)).to.have.property('character', 'f');
					expect(root.getChild(0).getAttribute('italic')).to.equal(true);
				}
			});

			it('throws when unexpected closing tag', () => {
				expect(() => {
					(0, _model.parse)('<a><b></a></b>');
				}).to.throw(Error, 'Parse error - unexpected closing tag.');
			});

			it('throws when unexpected attribute', () => {
				expect(() => {
					(0, _model.parse)('<a ?></a>');
				}).to.throw(Error, 'Parse error - unexpected token: ?.');
			});

			it('throws when incorrect tag', () => {
				expect(() => {
					(0, _model.parse)('<a');
				}).to.throw(Error, 'Parse error - unexpected token: <a.');
			});

			it('throws when missing closing tag', () => {
				expect(() => {
					(0, _model.parse)('<a><b></b>');
				}).to.throw(Error, 'Parse error - missing closing tags: a.');
			});

			it('throws when missing opening tag for text', () => {
				expect(() => {
					(0, _model.parse)('</$text>');
				}).to.throw(Error, 'Parse error - unexpected closing tag.');
			});

			it('throws when missing closing tag for text', () => {
				expect(() => {
					(0, _model.parse)('<$text>');
				}).to.throw(Error, 'Parse error - missing closing tags: $text.');
			});

			describe('selection', () => {
				test('sets collapsed selection in an element', {
					data: '<a><selection /></a>',
					check(root, selection) {
						expect(selection.getFirstPosition().parent).to.have.property('name', 'a');
					}
				});

				test('sets collapsed selection between elements', {
					data: '<a></a><selection /><b></b>'
				});

				test('sets collapsed selection before a text', {
					data: '<a></a><selection />foo'
				});

				test('sets collapsed selection after a text', {
					data: 'foo<selection />'
				});

				test('sets collapsed selection within a text', {
					data: 'foo<selection />bar',
					check(root) {
						expect(root.getChildCount()).to.equal(6);
					}
				});

				test('sets selection attributes', {
					data: 'foo<selection bold=true italic=true />bar',
					check(root, selection) {
						expect(selection.getAttribute('italic')).to.be.true;
					}
				});

				test('sets collapsed selection between text and text with attributes', {
					data: 'foo<selection /><$text bold=true>bar</$text>',
					check(root, selection) {
						expect(root.getChildCount()).to.equal(6);
						expect(selection.getAttribute('bold')).to.be.undefined;
					}
				});

				test('sets selection containing an element', {
					data: 'x<selection><a></a></selection>'
				});

				test('sets selection with attribute containing an element', {
					data: 'x<selection bold=true><a></a></selection>'
				});

				test('sets a backward selection containing an element', {
					data: 'x<selection backward bold=true><a></a></selection>'
				});

				test('sets selection within a text', {
					data: 'x<selection bold=true>y</selection>z'
				});

				test('sets selection within a text with different attributes', {
					data: '<$text bold=true>fo<selection bold=true>o</$text>ba</selection>r'
				});

				it('throws when missing selection start', () => {
					expect(() => {
						(0, _model.parse)('foo</selection>');
					}).to.throw(Error, 'Parse error - missing selection start.');
				});

				it('throws when missing selection end', () => {
					expect(() => {
						(0, _model.parse)('<selection>foo');
					}).to.throw(Error, 'Parse error - missing selection end.');
				});
			});

			function test(title, options) {
				it(title, () => {
					const output = options.output || options.data;
					const data = (0, _model.parse)(options.data);
					let model, selection;

					if (data.selection && data.model) {
						model = data.model;
						selection = data.selection;
					} else {
						model = data;
					}

					expect((0, _model.stringify)(model, selection)).to.equal(output);

					if (options.check) {
						options.check(model, selection);
					}
				});
			}
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
