define('tests', ['/ckeditor5/engine/view/writer.js', '/ckeditor5/engine/view/containerelement.js', '/ckeditor5/engine/view/range.js', '/ckeditor5/engine/view/documentfragment.js', '/tests/engine/_utils/view.js', '/ckeditor5/engine/view/attributeelement.js', '/ckeditor5/engine/view/text.js'], function (_writer, _containerelement, _range, _documentfragment, _view, _attributeelement, _text) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: view, browser-only */

	'use strict';

	var _writer2 = _interopRequireDefault(_writer);

	var _containerelement2 = _interopRequireDefault(_containerelement);

	var _range2 = _interopRequireDefault(_range);

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
   * test ranges.
   *
   * @param {String} input
   * @param {String} expectedResult
   * @param {String} expectedRemoved
   */
		function test(input, expectedResult, expectedRemoved) {
			let { view, selection } = (0, _view.parse)(input);

			if (view instanceof _attributeelement2.default || view instanceof _text2.default) {
				view = new _documentfragment2.default(view);
			}

			const range = selection.getFirstRange();
			const removed = writer.remove(range);
			expect((0, _view.stringify)(view, range, { showType: true, showPriority: true })).to.equal(expectedResult);
			expect((0, _view.stringify)(removed, null, { showType: true, showPriority: true })).to.equal(expectedRemoved);
		}

		beforeEach(() => {
			writer = new _writer2.default();
		});

		describe('remove', () => {
			it('should throw when range placed in two containers', () => {
				const p1 = new _containerelement2.default('p');
				const p2 = new _containerelement2.default('p');

				expect(() => {
					writer.remove(_range2.default.createFromParentsAndOffsets(p1, 0, p2, 0));
				}).to.throw('view-writer-invalid-range-container');
			});

			it('should return empty DocumentFragment when range is collapsed', () => {
				const p = new _containerelement2.default('p');
				const range = _range2.default.createFromParentsAndOffsets(p, 0, p, 0);
				const fragment = writer.remove(range);

				expect(fragment).to.be.instanceof(_documentfragment2.default);
				expect(fragment.getChildCount()).to.equal(0);
				expect(range.isCollapsed).to.be.true;
			});

			it('should remove single text node', () => {
				test('<container:p>[foobar]</container:p>', '<container:p>[]</container:p>', 'foobar');
			});

			it('should not leave empty text nodes', () => {
				test('<container:p>{foobar}</container:p>', '<container:p>[]</container:p>', 'foobar');
			});

			it('should remove part of the text node', () => {
				test('<container:p>f{oob}ar</container:p>', '<container:p>f{}ar</container:p>', 'oob');
			});

			it('should remove parts of nodes', () => {
				test('<container:p>f{oo<attribute:b:10>ba}r</attribute:b:10></container:p>', '<container:p>f[]<attribute:b:10>r</attribute:b:10></container:p>', 'oo<attribute:b:10>ba</attribute:b:10>');
			});

			it('should merge after removing #1', () => {
				test('<container:p><attribute:b:1>foo</attribute:b:1>[bar]<attribute:b:1>bazqux</attribute:b:1></container:p>', '<container:p><attribute:b:1>foo{}bazqux</attribute:b:1></container:p>', 'bar');
			});

			it('should merge after removing #2', () => {
				test('<container:p><attribute:b:1>fo{o</attribute:b:1>bar<attribute:b:1>ba}zqux</attribute:b:1></container:p>', '<container:p><attribute:b:1>fo{}zqux</attribute:b:1></container:p>', '<attribute:b:1>o</attribute:b:1>bar<attribute:b:1>ba</attribute:b:1>');
			});

			it('should remove part of the text node in document fragment', () => {
				test('fo{ob}ar', 'fo{}ar', 'ob');
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
