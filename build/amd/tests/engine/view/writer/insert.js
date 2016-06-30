define('tests', ['/ckeditor5/engine/view/writer.js', '/ckeditor5/engine/view/documentfragment.js', '/ckeditor5/engine/view/containerelement.js', '/ckeditor5/engine/view/element.js', '/ckeditor5/engine/view/position.js', '/ckeditor5/utils/ckeditorerror.js', '/tests/engine/_utils/view.js', '/ckeditor5/engine/view/attributeelement.js', '/ckeditor5/engine/view/text.js'], function (_writer, _documentfragment, _containerelement, _element, _position, _ckeditorerror, _view, _attributeelement, _text) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: view, browser-only */

	'use strict';

	var _writer2 = _interopRequireDefault(_writer);

	var _documentfragment2 = _interopRequireDefault(_documentfragment);

	var _containerelement2 = _interopRequireDefault(_containerelement);

	var _element2 = _interopRequireDefault(_element);

	var _position2 = _interopRequireDefault(_position);

	var _ckeditorerror2 = _interopRequireDefault(_ckeditorerror);

	var _attributeelement2 = _interopRequireDefault(_attributeelement);

	var _text2 = _interopRequireDefault(_text);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('Writer', () => {
		let writer;

		/**
   * Executes test using `parse` and `stringify` utils functions.
   *
   * @param {String} input
   * @param {Array.<String>} nodesToInsert
   * @param {String} expected
   */
		function test(input, nodesToInsert, expected) {
			nodesToInsert = nodesToInsert.map(node => (0, _view.parse)(node));
			let { view, selection } = (0, _view.parse)(input);

			if (view instanceof _attributeelement2.default || view instanceof _text2.default) {
				view = new _documentfragment2.default(view);
			}

			const newRange = writer.insert(selection.getFirstPosition(), nodesToInsert);
			expect((0, _view.stringify)(view, newRange, { showType: true, showPriority: true })).to.equal(expected);
		}

		beforeEach(() => {
			writer = new _writer2.default();
		});

		describe('insert', () => {
			it('should return collapsed range in insertion position when using empty array', () => {
				test('<container:p>foo{}bar</container:p>', [], '<container:p>foo{}bar</container:p>');
			});

			it('should insert text into another text node #1', () => {
				test('<container:p>foo{}bar</container:p>', ['baz'], '<container:p>foo{baz}bar</container:p>');
			});

			it('should insert text into another text node #2', () => {
				test('<container:p>foobar{}</container:p>', ['baz'], '<container:p>foobar{baz]</container:p>');
			});

			it('should insert text into another text node #3', () => {
				test('<container:p>{}foobar</container:p>', ['baz'], '<container:p>[baz}foobar</container:p>');
			});

			it('should break attributes when inserting into text node', () => {
				test('<container:p>foo{}bar</container:p>', ['<attribute:b:1>baz</attribute:b:1>'], '<container:p>foo[<attribute:b:1>baz</attribute:b:1>]bar</container:p>');
			});

			it('should merge text nodes', () => {
				test('<container:p>[]foobar</container:p>', ['baz'], '<container:p>[baz}foobar</container:p>');
			});

			it('should merge same attribute nodes', () => {
				test('<container:p><attribute:b:1>foo{}bar</attribute:b:1></container:p>', ['<attribute:b:1>baz</attribute:b:1>'], '<container:p><attribute:b:1>foo{baz}bar</attribute:b:1></container:p>');
			});

			it('should not merge different attributes', () => {
				test('<container:p><attribute:b:1>foo{}bar</attribute:b:1></container:p>', ['<attribute:b:2>baz</attribute:b:2>'], '<container:p>' + '<attribute:b:1>' + 'foo' + '</attribute:b:1>' + '[' + '<attribute:b:2>' + 'baz' + '</attribute:b:2>' + ']' + '<attribute:b:1>' + 'bar' + '</attribute:b:1>' + '</container:p>');
			});

			it('should allow to insert multiple nodes', () => {
				test('<container:p>[]</container:p>', ['<attribute:b:1>foo</attribute:b:1>', 'bar'], '<container:p>[<attribute:b:1>foo</attribute:b:1>bar]</container:p>');
			});

			it('should merge after inserting multiple nodes', () => {
				test('<container:p><attribute:b:1>qux</attribute:b:1>[]baz</container:p>', ['<attribute:b:1>foo</attribute:b:1>', 'bar'], '<container:p><attribute:b:1>qux{foo</attribute:b:1>bar}baz</container:p>');
			});

			it('should insert text into in document fragment', () => {
				test('foo{}bar', ['baz'], 'foo{baz}bar');
			});

			it('should merge same attribute nodes in document fragment', () => {
				test('<attribute:b:2>foo</attribute:b:2>[]', ['<attribute:b:1>bar</attribute:b:1>'], '<attribute:b:2>foo</attribute:b:2>[<attribute:b:1>bar</attribute:b:1>]');
			});

			it('should throw when inserting Element', () => {
				const element = new _element2.default('b');
				const container = new _containerelement2.default('p');
				const position = new _position2.default(container, 0);
				expect(() => {
					writer.insert(position, element);
				}).to.throw(_ckeditorerror2.default, 'view-writer-insert-invalid-node');
			});

			it('should throw when Element is inserted as child node', () => {
				const element = new _element2.default('b');
				const root = new _containerelement2.default('p', null, element);
				const container = new _containerelement2.default('p');
				const position = new _position2.default(container, 0);

				expect(() => {
					writer.insert(position, root);
				}).to.throw(_ckeditorerror2.default, 'view-writer-insert-invalid-node');
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
