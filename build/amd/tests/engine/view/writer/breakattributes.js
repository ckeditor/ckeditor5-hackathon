define('tests', ['/ckeditor5/engine/view/writer.js', '/ckeditor5/engine/view/documentfragment.js', '/ckeditor5/engine/view/attributeelement.js', '/ckeditor5/engine/view/text.js', '/tests/engine/_utils/view.js'], function (_writer, _documentfragment, _attributeelement, _text, _view) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: view, browser-only */

	'use strict';

	var _writer2 = _interopRequireDefault(_writer);

	var _documentfragment2 = _interopRequireDefault(_documentfragment);

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
   * Executes test using `parse` and `stringify` utils functions. Uses range delimiters `[]{}` to create and
   * test break position.
   *
   * @param {String} input
   * @param {String} expected
   */
		function test(input, expected) {
			let { view, selection } = (0, _view.parse)(input);

			// Wrap attributes and text into DocumentFragment.
			if (view instanceof _attributeelement2.default || view instanceof _text2.default) {
				view = new _documentfragment2.default(view);
			}

			const newPosition = writer.breakAttributes(selection.getFirstPosition());
			expect((0, _view.stringify)(view, newPosition, { showType: true, showPriority: true })).to.equal(expected);
		}

		beforeEach(() => {
			writer = new _writer2.default();
		});

		describe('breakAttributes', () => {
			it('should not break text nodes if they are not in attribute elements - middle', () => {
				test('<container:p>foo{}bar</container:p>', '<container:p>foo{}bar</container:p>');
			});

			it('should not break text nodes if they are not in attribute elements - beginning', () => {
				test('<container:p>{}foobar</container:p>', '<container:p>{}foobar</container:p>');
			});

			it('should not break text nodes if they are not in attribute elements #2 - end', () => {
				test('<container:p>foobar{}</container:p>', '<container:p>foobar{}</container:p>');
			});

			it('should split attribute element', () => {
				test('<container:p><attribute:b:1>foo{}bar</attribute:b:1></container:p>', '<container:p><attribute:b:1>foo</attribute:b:1>[]<attribute:b:1>bar</attribute:b:1></container:p>');
			});

			it('should move from beginning of the nested text node to the container', () => {
				test('<container:p><attribute:b:1><attribute:u:1>{}foobar</attribute:u:1></attribute:b:1></container:p>', '<container:p>[]<attribute:b:1><attribute:u:1>foobar</attribute:u:1></attribute:b:1></container:p>');
			});

			it('should stick selection in text node if it is in container', () => {
				test('<container:p>foo{}<attribute:b:1>bar</attribute:b:1></container:p>', '<container:p>foo{}<attribute:b:1>bar</attribute:b:1></container:p>');
			});

			it('should split nested attributes', () => {
				test('<container:p><attribute:b:1><attribute:u:1>foo{}bar</attribute:u:1></attribute:b:1></container:p>', '<container:p>' + '<attribute:b:1>' + '<attribute:u:1>' + 'foo' + '</attribute:u:1>' + '</attribute:b:1>' + '[]' + '<attribute:b:1>' + '<attribute:u:1>' + 'bar' + '</attribute:u:1>' + '</attribute:b:1>' + '</container:p>');
			});

			it('should move from end of the nested text node to the container', () => {
				test('<container:p><attribute:b:1><attribute:u:1>foobar{}</attribute:u:1></attribute:b:1></container:p>', '<container:p><attribute:b:1><attribute:u:1>foobar</attribute:u:1></attribute:b:1>[]</container:p>');
			});

			it('should split attribute element directly in document fragment', () => {
				test('<attribute:b:1>foo{}bar</attribute:b:1>', '<attribute:b:1>foo</attribute:b:1>[]<attribute:b:1>bar</attribute:b:1>');
			});

			it('should not split text directly in document fragment', () => {
				test('foo{}bar', 'foo{}bar');
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
