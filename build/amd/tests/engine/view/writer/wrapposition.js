define('tests', ['/ckeditor5/engine/view/writer.js', '/ckeditor5/engine/view/text.js', '/ckeditor5/engine/view/element.js', '/ckeditor5/engine/view/containerelement.js', '/ckeditor5/engine/view/documentfragment.js', '/ckeditor5/engine/view/position.js', '/ckeditor5/utils/ckeditorerror.js', '/tests/engine/_utils/view.js', '/ckeditor5/engine/view/attributeelement.js'], function (_writer, _text, _element, _containerelement, _documentfragment, _position, _ckeditorerror, _view, _attributeelement) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: view, browser-only */

	'use strict';

	var _writer2 = _interopRequireDefault(_writer);

	var _text2 = _interopRequireDefault(_text);

	var _element2 = _interopRequireDefault(_element);

	var _containerelement2 = _interopRequireDefault(_containerelement);

	var _documentfragment2 = _interopRequireDefault(_documentfragment);

	var _position2 = _interopRequireDefault(_position);

	var _ckeditorerror2 = _interopRequireDefault(_ckeditorerror);

	var _attributeelement2 = _interopRequireDefault(_attributeelement);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('wrapPosition', () => {
		let writer;

		/**
   * Executes test using `parse` and `stringify` utils functions.
   *
   * @param {String} input
   * @param {String} unwrapAttribute
   * @param {String} expected
   */
		function test(input, unwrapAttribute, expected) {
			let { view, selection } = (0, _view.parse)(input);

			if (view instanceof _attributeelement2.default || view instanceof _text2.default) {
				view = new _documentfragment2.default(view);
			}

			const newPosition = writer.wrapPosition(selection.getFirstPosition(), (0, _view.parse)(unwrapAttribute));
			expect((0, _view.stringify)(view, newPosition, { showType: true, showPriority: true })).to.equal(expected);
		}

		beforeEach(() => {
			writer = new _writer2.default();
		});

		it('should throw error when element is not instance of AttributeElement', () => {
			const container = new _containerelement2.default('p', null, new _text2.default('foo'));
			const position = new _position2.default(container, 0);
			const b = new _element2.default('b');

			expect(() => {
				writer.wrapPosition(position, b);
			}).to.throw(_ckeditorerror2.default, 'view-writer-wrap-invalid-attribute');
		});

		it('should wrap position at the beginning of text node', () => {
			test('<container:p>{}foobar</container:p>', '<attribute:b:1></attribute:b:1>', '<container:p><attribute:b:1>[]</attribute:b:1>foobar</container:p>');
		});

		it('should wrap position inside text node', () => {
			test('<container:p>foo{}bar</container:p>', '<attribute:b:1></attribute:b:1>', '<container:p>foo<attribute:b:1>[]</attribute:b:1>bar</container:p>');
		});

		it('should wrap position inside document fragment', () => {
			test('<attribute:b:1>foo</attribute:b:1>[]<attribute:b:3>bar</attribute:b:3>', '<attribute:b:2></attribute:b:2>', '<attribute:b:1>foo</attribute:b:1><attribute:b:2>[]</attribute:b:2><attribute:b:3>bar</attribute:b:3>');
		});

		it('should wrap position at the end of text node', () => {
			test('<container:p>foobar{}</container:p>', '<attribute:b:1></attribute:b:1>', '<container:p>foobar<attribute:b:1>[]</attribute:b:1></container:p>');
		});

		it('should merge with existing attributes #1', () => {
			test('<container:p><attribute:b:1>foo</attribute:b:1>[]</container:p>', '<attribute:b:1></attribute:b:1>', '<container:p><attribute:b:1>foo{}</attribute:b:1></container:p>');
		});

		it('should merge with existing attributes #2', () => {
			test('<container:p>[]<attribute:b:1>foo</attribute:b:1></container:p>', '<attribute:b:1></attribute:b:1>', '<container:p><attribute:b:1>{}foo</attribute:b:1></container:p>');
		});

		it('should wrap when inside nested attributes', () => {
			test('<container:p><attribute:b:1>foo{}bar</attribute:b:1></container:p>', '<attribute:u:1></attribute:u:1>', '<container:p>' + '<attribute:b:1>foo</attribute:b:1>' + '<attribute:u:1><attribute:b:1>[]</attribute:b:1></attribute:u:1>' + '<attribute:b:1>bar</attribute:b:1>' + '</container:p>');
		});

		it('should merge when wrapping between same attribute', () => {
			test('<container:p><attribute:b:1>foo</attribute:b:1>[]<attribute:b:1>bar</attribute:b:1></container:p>', '<attribute:b:1></attribute:b:1>', '<container:p><attribute:b:1>foo{}bar</attribute:b:1></container:p>');
		});

		it('should move position to text node if in same attribute', () => {
			test('<container:p><attribute:b:1>foobar[]</attribute:b:1></container:p>', '<attribute:b:1></attribute:b:1>', '<container:p><attribute:b:1>foobar{}</attribute:b:1></container:p>');
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
