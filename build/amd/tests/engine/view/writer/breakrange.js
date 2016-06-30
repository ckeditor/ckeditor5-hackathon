define('tests', ['/ckeditor5/engine/view/writer.js', '/ckeditor5/engine/view/documentfragment.js', '/ckeditor5/engine/view/containerelement.js', '/ckeditor5/engine/view/attributeelement.js', '/ckeditor5/engine/view/text.js', '/ckeditor5/engine/view/range.js', '/tests/engine/_utils/view.js'], function (_writer, _documentfragment, _containerelement, _attributeelement, _text, _range, _view) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: view, browser-only */

	'use strict';

	var _writer2 = _interopRequireDefault(_writer);

	var _documentfragment2 = _interopRequireDefault(_documentfragment);

	var _containerelement2 = _interopRequireDefault(_containerelement);

	var _attributeelement2 = _interopRequireDefault(_attributeelement);

	var _text2 = _interopRequireDefault(_text);

	var _range2 = _interopRequireDefault(_range);

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
   * @param {String} expected
   */
		function test(input, expected) {
			let { view, selection } = (0, _view.parse)(input);

			if (view instanceof _attributeelement2.default || view instanceof _text2.default) {
				view = new _documentfragment2.default(view);
			}

			const newRange = writer.breakRange(selection.getFirstRange());
			expect((0, _view.stringify)(view, newRange, { showType: true })).to.equal(expected);
		}

		beforeEach(() => {
			writer = new _writer2.default();
		});

		describe('breakRange', () => {
			it('should throw when range placed in two containers', () => {
				const p1 = new _containerelement2.default('p');
				const p2 = new _containerelement2.default('p');

				expect(() => {
					writer.breakRange(_range2.default.createFromParentsAndOffsets(p1, 0, p2, 0));
				}).to.throw('view-writer-invalid-range-container');
			});

			it('should not break text nodes if they are not in attribute elements', () => {
				test('<container:p>foo{}bar</container:p>', '<container:p>foo{}bar</container:p>');
			});

			it('should break at collapsed range and return collapsed one', () => {
				test('<container:p><attribute:b>foo{}bar</attribute:b></container:p>', '<container:p><attribute:b>foo</attribute:b>[]<attribute:b>bar</attribute:b></container:p>');
			});

			it('should break inside text node #1', () => {
				test('<container:p><attribute:b>foo{bar}baz</attribute:b></container:p>', '<container:p><attribute:b>foo</attribute:b>[<attribute:b>bar</attribute:b>]<attribute:b>baz</attribute:b></container:p>');
			});

			it('should break inside text node #2', () => {
				test('<container:p><attribute:b>foo{barbaz}</attribute:b></container:p>', '<container:p><attribute:b>foo</attribute:b>[<attribute:b>barbaz</attribute:b>]</container:p>');
			});

			it('should break inside text node #3', () => {
				test('<container:p><attribute:b>foo{barbaz]</attribute:b></container:p>', '<container:p><attribute:b>foo</attribute:b>[<attribute:b>barbaz</attribute:b>]</container:p>');
			});

			it('should break inside text node #4', () => {
				test('<container:p><attribute:b>{foo}barbaz</attribute:b></container:p>', '<container:p>[<attribute:b>foo</attribute:b>]<attribute:b>barbaz</attribute:b></container:p>');
			});

			it('should break inside text node #5', () => {
				test('<container:p><attribute:b>[foo}barbaz</attribute:b></container:p>', '<container:p>[<attribute:b>foo</attribute:b>]<attribute:b>barbaz</attribute:b></container:p>');
			});

			it('should break placed inside different nodes', () => {
				test('<container:p>foo{bar<attribute:b>baz}qux</attribute:b></container:p>', '<container:p>foo{bar<attribute:b>baz</attribute:b>]<attribute:b>qux</attribute:b></container:p>');
			});

			it('should split attribute element directly in document fragment', () => {
				test('<attribute:b>fo{ob}ar</attribute:b>', '<attribute:b>fo</attribute:b>[<attribute:b>ob</attribute:b>]<attribute:b>ar</attribute:b>');
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
