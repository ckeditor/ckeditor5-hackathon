define('tests', ['/tests/engine/_utils/view.js', '/ckeditor5/engine/view/documentfragment.js', '/ckeditor5/engine/view/position.js', '/ckeditor5/engine/view/element.js', '/ckeditor5/engine/view/attributeelement.js', '/ckeditor5/engine/view/containerelement.js', '/ckeditor5/engine/view/text.js', '/ckeditor5/engine/view/selection.js', '/ckeditor5/engine/view/range.js', '/ckeditor5/engine/view/document.js'], function (_view, _documentfragment, _position, _element, _attributeelement, _containerelement, _text, _selection, _range, _document) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	/* bender-tags: browser-only */

	var _documentfragment2 = _interopRequireDefault(_documentfragment);

	var _position2 = _interopRequireDefault(_position);

	var _element2 = _interopRequireDefault(_element);

	var _attributeelement2 = _interopRequireDefault(_attributeelement);

	var _containerelement2 = _interopRequireDefault(_containerelement);

	var _text2 = _interopRequireDefault(_text);

	var _selection2 = _interopRequireDefault(_selection);

	var _range2 = _interopRequireDefault(_range);

	var _document2 = _interopRequireDefault(_document);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('view test utils', () => {
		describe('getData, setData', () => {
			let sandbox;

			beforeEach(() => {
				sandbox = sinon.sandbox.create();
			});

			afterEach(() => {
				sandbox.restore();
			});

			describe('getData', () => {
				it('should use stringify method', () => {
					const element = document.createElement('div');
					const stringifySpy = sandbox.spy(_view.getData, '_stringify');
					const viewDocument = new _document2.default();
					const options = { showType: false, showPriority: false, withoutSelection: true };
					const root = viewDocument.createRoot(element);
					root.appendChildren(new _element2.default('p'));

					expect((0, _view.getData)(viewDocument, options)).to.equal('<p></p>');
					sinon.assert.calledOnce(stringifySpy);
					expect(stringifySpy.firstCall.args[0]).to.equal(root);
					expect(stringifySpy.firstCall.args[1]).to.equal(null);
					const stringifyOptions = stringifySpy.firstCall.args[2];
					expect(stringifyOptions).to.have.property('showType').that.equals(false);
					expect(stringifyOptions).to.have.property('showPriority').that.equals(false);
					expect(stringifyOptions).to.have.property('ignoreRoot').that.equals(true);
				});

				it('should use stringify method with selection', () => {
					const element = document.createElement('div');
					const stringifySpy = sandbox.spy(_view.getData, '_stringify');
					const viewDocument = new _document2.default();
					const options = { showType: false, showPriority: false };
					const root = viewDocument.createRoot(element);
					root.appendChildren(new _element2.default('p'));

					viewDocument.selection.addRange(_range2.default.createFromParentsAndOffsets(root, 0, root, 1));

					expect((0, _view.getData)(viewDocument, options)).to.equal('[<p></p>]');
					sinon.assert.calledOnce(stringifySpy);
					expect(stringifySpy.firstCall.args[0]).to.equal(root);
					expect(stringifySpy.firstCall.args[1]).to.equal(viewDocument.selection);
					const stringifyOptions = stringifySpy.firstCall.args[2];
					expect(stringifyOptions).to.have.property('showType').that.equals(false);
					expect(stringifyOptions).to.have.property('showPriority').that.equals(false);
					expect(stringifyOptions).to.have.property('ignoreRoot').that.equals(true);
				});
			});

			describe('setData', () => {
				it('should use parse method', () => {
					const viewDocument = new _document2.default();
					const data = 'foobar<b>baz</b>';
					const parseSpy = sandbox.spy(_view.setData, '_parse');

					viewDocument.createRoot(document.createElement('div'));
					(0, _view.setData)(viewDocument, data);

					expect((0, _view.getData)(viewDocument)).to.equal('foobar<b>baz</b>');
					sinon.assert.calledOnce(parseSpy);
					const args = parseSpy.firstCall.args;
					expect(args[0]).to.equal(data);
					expect(args[1]).to.be.an('object');
					expect(args[1].rootElement).to.equal(viewDocument.getRoot());
				});

				it('should use parse method with selection', () => {
					const viewDocument = new _document2.default();
					const data = '[<b>baz</b>]';
					const parseSpy = sandbox.spy(_view.setData, '_parse');

					viewDocument.createRoot(document.createElement('div'));
					(0, _view.setData)(viewDocument, data);

					expect((0, _view.getData)(viewDocument)).to.equal('[<b>baz</b>]');
					const args = parseSpy.firstCall.args;
					expect(args[0]).to.equal(data);
					expect(args[1]).to.be.an('object');
					expect(args[1].rootElement).to.equal(viewDocument.getRoot());
				});
			});
		});

		describe('stringify', () => {
			it('should write text', () => {
				const text = new _text2.default('foobar');
				expect((0, _view.stringify)(text)).to.equal('foobar');
			});

			it('should write elements and texts', () => {
				const text = new _text2.default('foobar');
				const b = new _element2.default('b', null, text);
				const p = new _element2.default('p', null, b);

				expect((0, _view.stringify)(p)).to.equal('<p><b>foobar</b></p>');
			});

			it('should write elements with attributes (attributes in alphabetical order)', () => {
				const text = new _text2.default('foobar');
				const b = new _element2.default('b', {
					foo: 'bar'
				}, text);
				const p = new _element2.default('p', {
					baz: 'qux',
					bar: 'taz',
					class: 'short wide'
				}, b);

				expect((0, _view.stringify)(p)).to.equal('<p bar="taz" baz="qux" class="short wide"><b foo="bar">foobar</b></p>');
			});

			it('should write selection ranges inside elements', () => {
				const text1 = new _text2.default('foobar');
				const text2 = new _text2.default('bazqux');
				const b1 = new _element2.default('b', null, text1);
				const b2 = new _element2.default('b', null, text2);
				const p = new _element2.default('p', null, [b1, b2]);
				const range = _range2.default.createFromParentsAndOffsets(p, 1, p, 2);
				const selection = new _selection2.default();
				selection.addRange(range);
				expect((0, _view.stringify)(p, selection)).to.equal('<p><b>foobar</b>[<b>bazqux</b>]</p>');
			});

			it('should write collapsed selection ranges inside elements', () => {
				const text = new _text2.default('foobar');
				const p = new _element2.default('p', null, text);
				const range = _range2.default.createFromParentsAndOffsets(p, 0, p, 0);
				const selection = new _selection2.default();
				selection.addRange(range);
				expect((0, _view.stringify)(p, selection)).to.equal('<p>[]foobar</p>');
			});

			it('should write selection ranges inside text', () => {
				const text1 = new _text2.default('foobar');
				const text2 = new _text2.default('bazqux');
				const b1 = new _element2.default('b', null, text1);
				const b2 = new _element2.default('b', null, text2);
				const p = new _element2.default('p', null, [b1, b2]);
				const range = _range2.default.createFromParentsAndOffsets(text1, 1, text1, 5);
				const selection = new _selection2.default();
				selection.addRange(range);
				expect((0, _view.stringify)(p, selection)).to.equal('<p><b>f{ooba}r</b><b>bazqux</b></p>');
			});

			it('should write collapsed selection ranges inside texts', () => {
				const text = new _text2.default('foobar');
				const p = new _element2.default('p', null, text);
				const range = _range2.default.createFromParentsAndOffsets(text, 0, text, 0);
				const selection = new _selection2.default();
				selection.addRange(range);
				expect((0, _view.stringify)(p, selection)).to.equal('<p>{}foobar</p>');
			});

			it('should write ranges that start inside text end ends between elements', () => {
				const text1 = new _text2.default('foobar');
				const text2 = new _text2.default('bazqux');
				const b1 = new _element2.default('b', null, text1);
				const b2 = new _element2.default('b', null, text2);
				const p = new _element2.default('p', null, [b1, b2]);
				const range = _range2.default.createFromParentsAndOffsets(p, 0, text2, 5);
				const selection = new _selection2.default();
				selection.addRange(range);
				expect((0, _view.stringify)(p, selection)).to.equal('<p>[<b>foobar</b><b>bazqu}x</b></p>');
			});

			it('should write elements types as namespaces when needed', () => {
				const text = new _text2.default('foobar');
				const b = new _attributeelement2.default('b', null, text);
				const p = new _containerelement2.default('p', null, b);

				expect((0, _view.stringify)(p, null, { showType: true })).to.equal('<container:p><attribute:b>foobar</attribute:b></container:p>');
			});

			it('should not write element type when type is not specified', () => {
				const p = new _element2.default('p');
				expect((0, _view.stringify)(p, null, { showType: true })).to.equal('<p></p>');
			});

			it('should write elements priorities when needed', () => {
				const text = new _text2.default('foobar');
				const b = new _attributeelement2.default('b', null, text);
				const p = new _containerelement2.default('p', null, b);

				expect((0, _view.stringify)(p, null, { showPriority: true })).to.equal('<p><b:10>foobar</b:10></p>');
			});

			it('should parse DocumentFragment as root', () => {
				const text1 = new _text2.default('foobar');
				const text2 = new _text2.default('bazqux');
				const b1 = new _element2.default('b', null, text1);
				const b2 = new _element2.default('b', null, text2);
				const fragment = new _documentfragment2.default([b1, b2]);
				expect((0, _view.stringify)(fragment, null)).to.equal('<b>foobar</b><b>bazqux</b>');
			});

			it('should not write ranges outside elements - end position outside element', () => {
				const text = new _text2.default('foobar');
				const b = new _element2.default('b', null, text);
				const p = new _element2.default('p', null, b);
				const range = _range2.default.createFromParentsAndOffsets(p, 0, p, 5);

				expect((0, _view.stringify)(p, range)).to.equal('<p>[<b>foobar</b></p>');
			});

			it('should not write ranges outside elements - start position outside element', () => {
				const text = new _text2.default('foobar');
				const b = new _element2.default('b', null, text);
				const p = new _element2.default('p', null, b);
				const range = _range2.default.createFromParentsAndOffsets(p, -1, p, 1);

				expect((0, _view.stringify)(p, range)).to.equal('<p><b>foobar</b>]</p>');
			});

			it('should not write ranges outside elements - end position outside text', () => {
				const text = new _text2.default('foobar');
				const b = new _element2.default('b', null, text);
				const p = new _element2.default('p', null, b);
				const range = _range2.default.createFromParentsAndOffsets(text, 0, text, 7);

				expect((0, _view.stringify)(p, range)).to.equal('<p><b>{foobar</b></p>');
			});

			it('should not write ranges outside elements - start position outside text', () => {
				const text = new _text2.default('foobar');
				const b = new _element2.default('b', null, text);
				const p = new _element2.default('p', null, b);
				const range = _range2.default.createFromParentsAndOffsets(text, -1, text, 2);

				expect((0, _view.stringify)(p, range)).to.equal('<p><b>fo}obar</b></p>');
			});

			it('should write multiple ranges from selection #1', () => {
				const text1 = new _text2.default('foobar');
				const text2 = new _text2.default('bazqux');
				const b1 = new _element2.default('b', null, text1);
				const b2 = new _element2.default('b', null, text2);
				const p = new _element2.default('p', null, [b1, b2]);
				const range1 = _range2.default.createFromParentsAndOffsets(p, 0, p, 1);
				const range2 = _range2.default.createFromParentsAndOffsets(p, 1, p, 1);
				const selection = new _selection2.default();
				selection.setRanges([range2, range1]);

				expect((0, _view.stringify)(p, selection)).to.equal('<p>[<b>foobar</b>][]<b>bazqux</b></p>');
			});

			it('should write multiple ranges from selection #2', () => {
				const text1 = new _text2.default('foobar');
				const text2 = new _text2.default('bazqux');
				const b = new _element2.default('b', null, text1);
				const p = new _element2.default('p', null, [b, text2]);
				const range1 = _range2.default.createFromParentsAndOffsets(p, 0, p, 1);
				const range2 = _range2.default.createFromParentsAndOffsets(text2, 0, text2, 3);
				const range3 = _range2.default.createFromParentsAndOffsets(text2, 3, text2, 4);
				const range4 = _range2.default.createFromParentsAndOffsets(p, 1, p, 1);
				const selection = new _selection2.default();
				selection.setRanges([range1, range2, range3, range4]);

				expect((0, _view.stringify)(p, selection)).to.equal('<p>[<b>foobar</b>][]{baz}{q}ux</p>');
			});

			it('should use Position instance instead of Selection', () => {
				const text = new _text2.default('foobar');
				const position = new _position2.default(text, 3);
				const string = (0, _view.stringify)(text, position);
				expect(string).to.equal('foo{}bar');
			});

			it('should use Range instance instead of Selection', () => {
				const text = new _text2.default('foobar');
				const range = _range2.default.createFromParentsAndOffsets(text, 3, text, 4);
				const string = (0, _view.stringify)(text, range);
				expect(string).to.equal('foo{b}ar');
			});
		});

		describe('parse', () => {
			it('should parse text', () => {
				const text = (0, _view.parse)('foobar');
				expect(text).to.be.instanceOf(_text2.default);
				expect(text.data).to.equal('foobar');
			});

			it('should parse elements and texts', () => {
				const view = (0, _view.parse)('<b>foobar</b>');
				const element = new _element2.default('b');

				expect(view).to.be.instanceof(_element2.default);
				expect(view.isSimilar(element)).to.be.true;
				expect(view.getChildCount()).to.equal(1);
				const text = view.getChild(0);
				expect(text).to.be.instanceof(_text2.default);
				expect(text.data).to.equal('foobar');
			});

			it('should parse element attributes', () => {
				const view = (0, _view.parse)('<b name="foo" title="bar" class="foo bar" style="color:red;"></b>');
				const element = new _element2.default('b', { name: 'foo', title: 'bar', class: 'foo bar', style: 'color:red;' });

				expect(view).to.be.instanceof(_element2.default);
				expect(view.isSimilar(element)).to.be.true;
				expect(view.getChildCount()).to.equal(0);
			});

			it('should parse element type', () => {
				const view1 = (0, _view.parse)('<attribute:b></attribute:b>');
				const attribute = new _attributeelement2.default('b');
				const view2 = (0, _view.parse)('<container:p></container:p>');
				const container = new _containerelement2.default('p');

				expect(view1).to.be.instanceof(_attributeelement2.default);
				expect(view1.isSimilar(attribute)).to.be.true;
				expect(view2).to.be.instanceof(_containerelement2.default);
				expect(view2.isSimilar(container)).to.be.true;
			});

			it('should parse element priority', () => {
				const parsed1 = (0, _view.parse)('<b:12></b:12>');
				const attribute1 = new _attributeelement2.default('b');
				attribute1.priority = 12;
				const parsed2 = (0, _view.parse)('<attribute:b:44></attribute:b:44>');
				const attribute2 = new _attributeelement2.default('b');
				attribute2.priority = 44;

				parsed1.isSimilar(attribute1);
				expect(parsed1.isSimilar(attribute1)).to.be.true;
				expect(parsed2.isSimilar(attribute2)).to.be.true;
			});

			it('should create DocumentFragment when multiple elements on root', () => {
				const view = (0, _view.parse)('<b></b><i></i>');
				expect(view).to.be.instanceOf(_documentfragment2.default);
				expect(view.getChildCount()).to.equal(2);
				expect(view.getChild(0).isSimilar(new _element2.default('b'))).to.be.true;
				expect(view.getChild(1).isSimilar(new _element2.default('i'))).to.be.true;
			});

			it('should paste nested elements and texts', () => {
				const parsed = (0, _view.parse)('<container:p>foo<b:12>bar<i:25>qux</i:25></b:12></container:p>');
				expect(parsed.isSimilar(new _containerelement2.default('p'))).to.be.true;
				expect(parsed.getChildCount()).to.equal(2);
				expect(parsed.getChild(0)).to.be.instanceof(_text2.default).and.have.property('data').that.equal('foo');
				const b = parsed.getChild(1);
				expect(b).to.be.instanceof(_attributeelement2.default);
				expect(b.priority).to.equal(12);
				expect(b.getChildCount()).to.equal(2);
				expect(b.getChild(0)).to.be.instanceof(_text2.default).and.have.property('data').that.equal('bar');
				const i = b.getChild(1);
				expect(i).to.be.instanceof(_attributeelement2.default);
				expect(i.priority).to.equal(25);
				expect(i.getChild(0)).to.be.instanceof(_text2.default).and.have.property('data').that.equal('qux');
			});

			it('should parse selection range inside text', () => {
				const { view, selection } = (0, _view.parse)('f{oo}b{}ar');
				expect(view).to.be.instanceof(_text2.default);
				expect(view.data).to.equal('foobar');
				expect(selection.rangeCount).to.equal(2);
				const ranges = [...selection.getRanges()];

				expect(ranges[0].isEqual(_range2.default.createFromParentsAndOffsets(view, 1, view, 3))).to.be.true;
				expect(ranges[1].isEqual(_range2.default.createFromParentsAndOffsets(view, 4, view, 4))).to.be.true;
			});

			it('should parse selection range between elements', () => {
				const { view, selection } = (0, _view.parse)('<p>[<b>foobar]</b>[]</p>');
				expect(view).to.be.instanceof(_element2.default);
				expect(view.getChildCount()).to.equal(1);
				const b = view.getChild(0);
				expect(b).to.be.instanceof(_element2.default);
				expect(b.name).to.equal('b');
				expect(b.getChildCount()).to.equal(1);
				const text = b.getChild(0);
				expect(text).to.be.instanceof(_text2.default);
				expect(text.data).to.equal('foobar');
				expect(selection.rangeCount).to.equal(2);
				const ranges = [...selection.getRanges()];
				expect(ranges[0].isEqual(_range2.default.createFromParentsAndOffsets(view, 0, b, 1))).to.be.true;
				expect(ranges[1].isEqual(_range2.default.createFromParentsAndOffsets(view, 1, view, 1))).to.be.true;
			});

			it('should parse ranges #1', () => {
				const { view, selection } = (0, _view.parse)('<container:p>foo{bar]</container:p>');
				expect(view.isSimilar(new _containerelement2.default('p'))).to.be.true;
				expect(view.getChildCount()).to.equal(1);
				const text = view.getChild(0);
				expect(text).to.be.instanceof(_text2.default);
				expect(text.data).to.equal('foobar');
				expect(selection.rangeCount).to.equal(1);
				expect(selection.getFirstRange().isEqual(_range2.default.createFromParentsAndOffsets(text, 3, view, 1))).to.be.true;
			});

			it('should parse ranges #2', () => {
				const { view, selection } = (0, _view.parse)('<attribute:b>[foob}ar<i>{baz</i>]</attribute:b>');
				expect(view.isSimilar(new _attributeelement2.default('b'))).to.be.true;
				expect(view.getChildCount()).to.equal(2);
				const text1 = view.getChild(0);
				expect(text1).to.be.instanceof(_text2.default);
				expect(text1.data).to.equal('foobar');
				const i = view.getChild(1);
				expect(i.isSimilar(new _element2.default('i'))).to.be.true;
				expect(i.getChildCount()).to.equal(1);
				const text2 = i.getChild(0);
				expect(text2).to.be.instanceof(_text2.default);
				expect(text2.data).to.equal('baz');
				expect(selection.rangeCount).to.equal(2);
				const ranges = [...selection.getRanges()];
				expect(ranges[0].isEqual(_range2.default.createFromParentsAndOffsets(view, 0, text1, 4))).to.be.true;
				expect(ranges[1].isEqual(_range2.default.createFromParentsAndOffsets(text2, 0, view, 2))).to.be.true;
			});

			it('should use ranges order when provided', () => {
				const { view, selection } = (0, _view.parse)('{f}oo{b}arb{a}z', { order: [3, 1, 2] });
				expect(selection.rangeCount).to.equal(3);
				const ranges = [...selection.getRanges()];
				expect(ranges[0].isEqual(_range2.default.createFromParentsAndOffsets(view, 3, view, 4))).to.be.true;
				expect(ranges[1].isEqual(_range2.default.createFromParentsAndOffsets(view, 7, view, 8))).to.be.true;
				expect(ranges[2].isEqual(_range2.default.createFromParentsAndOffsets(view, 0, view, 1))).to.be.true;
				expect(selection.anchor.isEqual(ranges[2].start)).to.be.true;
				expect(selection.focus.isEqual(ranges[2].end)).to.be.true;
			});

			it('should set last range backward if needed', () => {
				const { view, selection } = (0, _view.parse)('{f}oo{b}arb{a}z', { order: [3, 1, 2], lastRangeBackward: true });
				expect(selection.rangeCount).to.equal(3);
				const ranges = [...selection.getRanges()];
				expect(ranges[0].isEqual(_range2.default.createFromParentsAndOffsets(view, 3, view, 4))).to.be.true;
				expect(ranges[1].isEqual(_range2.default.createFromParentsAndOffsets(view, 7, view, 8))).to.be.true;
				expect(ranges[2].isEqual(_range2.default.createFromParentsAndOffsets(view, 0, view, 1))).to.be.true;
				expect(selection.anchor.isEqual(ranges[2].end)).to.be.true;
				expect(selection.focus.isEqual(ranges[2].start)).to.be.true;
			});

			it('should return DocumentFragment if range is around single element', () => {
				const { view, selection } = (0, _view.parse)('[<b>foobar</b>]');
				expect(view).to.be.instanceOf(_documentfragment2.default);
				expect(selection.rangeCount).to.equal(1);
				expect(selection.getFirstRange().isEqual(_range2.default.createFromParentsAndOffsets(view, 0, view, 1))).to.be.true;
			});

			it('should throw when ranges order does not include all ranges', () => {
				expect(() => {
					(0, _view.parse)('{}foobar{}', { order: [1] });
				}).to.throw(Error);
			});

			it('should throw when ranges order is invalid', () => {
				expect(() => {
					(0, _view.parse)('{}foobar{}', { order: [1, 4] });
				}).to.throw(Error);
			});

			it('should throw when element range delimiter is inside text node', () => {
				expect(() => {
					(0, _view.parse)('foo[bar');
				}).to.throw(Error);
			});

			it('should throw when text range delimiter is inside empty text node', () => {
				expect(() => {
					(0, _view.parse)('<b>foo</b>}');
				}).to.throw(Error);
			});

			it('should throw when end of range is found before start', () => {
				expect(() => {
					(0, _view.parse)('fo}obar');
				}).to.throw(Error);
			});

			it('should throw when intersecting ranges found', () => {
				expect(() => {
					(0, _view.parse)('[fo{o}bar]');
				}).to.throw(Error);
			});

			it('should throw when opened ranges are left', () => {
				expect(() => {
					(0, _view.parse)('fo{obar');
				}).to.throw(Error);
			});

			it('should throw when wrong tag name is provided #1', () => {
				expect(() => {
					(0, _view.parse)('<b:bar></b:bar>');
				}).to.throw(Error);
			});

			it('should throw when wrong tag name is provided #2', () => {
				expect(() => {
					(0, _view.parse)('<container:b:bar></container:b:bar>');
				}).to.throw(Error);
			});

			it('should throw when wrong tag name is provided #3', () => {
				expect(() => {
					(0, _view.parse)('<container:b:10:test></container:b:10:test>');
				}).to.throw(Error);
			});

			it('should use provided root element #1', () => {
				const root = new _element2.default('p');
				const data = (0, _view.parse)('<span>text</span>', { rootElement: root });

				expect((0, _view.stringify)(data)).to.equal('<p><span>text</span></p>');
			});

			it('should use provided root element #2', () => {
				const root = new _element2.default('p');
				const data = (0, _view.parse)('<span>text</span><b>test</b>', { rootElement: root });

				expect((0, _view.stringify)(data)).to.equal('<p><span>text</span><b>test</b></p>');
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
