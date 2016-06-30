define('tests', ['/ckeditor5/engine/view/writer.js', '/ckeditor5/engine/view/containerelement.js', '/ckeditor5/engine/view/text.js', '/ckeditor5/engine/view/position.js', '/tests/engine/_utils/view.js'], function (_writer, _containerelement, _text, _position, _view) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: view, browser-only */

	'use strict';

	var _writer2 = _interopRequireDefault(_writer);

	var _containerelement2 = _interopRequireDefault(_containerelement);

	var _text2 = _interopRequireDefault(_text);

	var _position2 = _interopRequireDefault(_position);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('Writer', () => {
		let writer;

		/**
   * Executes test using `parse` and `stringify` utils functions. Uses range delimiters `[]{}` to create and
   * test merge position.
   *
   * @param {String} input
   * @param {String} expected
   */
		function test(input, expected) {
			const { view, selection } = (0, _view.parse)(input);
			const newPosition = writer.mergeAttributes(selection.getFirstPosition());
			expect((0, _view.stringify)(view, newPosition, { showType: true, showPriority: true })).to.equal(expected);
		}

		beforeEach(() => {
			writer = new _writer2.default();
		});

		describe('mergeAttributes', () => {
			it('should not merge if inside text node', () => {
				test('<container:p>fo{}bar</container:p>', '<container:p>fo{}bar</container:p>');
			});

			it('should not merge if between containers', () => {
				test('<container:div><container:p>foo</container:p>[]<container:p>bar</container:p></container:div>', '<container:div><container:p>foo</container:p>[]<container:p>bar</container:p></container:div>');
			});

			it('should return same position when inside empty container', () => {
				test('<container:p>[]</container:p>', '<container:p>[]</container:p>');
			});

			it('should not merge when position is placed at the beginning of the container', () => {
				test('<container:p>[]<attribute:b:1></attribute:b:1></container:p>', '<container:p>[]<attribute:b:1></attribute:b:1></container:p>');
			});

			it('should not merge when position is placed at the end of the container', () => {
				test('<container:p><attribute:b:1></attribute:b:1>[]</container:p>', '<container:p><attribute:b:1></attribute:b:1>[]</container:p>');
			});

			it('should merge when placed between two text nodes', () => {
				// <p>foobar</p> -> <p>foo|bar</p>
				const t1 = new _text2.default('foo');
				const t2 = new _text2.default('bar');
				const p = new _containerelement2.default('p', null, [t1, t2]);
				const position = new _position2.default(p, 1);

				const newPosition = writer.mergeAttributes(position);
				expect((0, _view.stringify)(p, newPosition)).to.equal('<p>foo{}bar</p>');
			});

			it('should merge when placed between similar attribute nodes', () => {
				test('<container:p><attribute:b:1 foo="bar">baz</attribute:b:1>[]<attribute:b:1 foo="bar">qux</attribute:b:1></container:p>', '<container:p><attribute:b:1 foo="bar">baz{}qux</attribute:b:1></container:p>');
			});

			it('should not merge when placed between non-similar attribute nodes', () => {
				test('<container:p><attribute:b:1 foo="bar"></attribute:b:1>[]<attribute:b:1 foo="baz"></attribute:b:1></container:p>', '<container:p><attribute:b:1 foo="bar"></attribute:b:1>[]<attribute:b:1 foo="baz"></attribute:b:1></container:p>');
			});

			it('should not merge when placed between similar attribute nodes with different priority', () => {
				test('<container:p><attribute:b:1 foo="bar"></attribute:b:1>[]<attribute:b:2 foo="bar"></attribute:b:2></container:p>', '<container:p><attribute:b:1 foo="bar"></attribute:b:1>[]<attribute:b:2 foo="bar"></attribute:b:2></container:p>');
			});

			it('should merge attribute nodes and their contents if possible', () => {
				test('<container:p><attribute:b:1 foo="bar">foo</attribute:b:1>[]<attribute:b:1 foo="bar">bar</attribute:b:1></container:p>', '<container:p><attribute:b:1 foo="bar">foo{}bar</attribute:b:1></container:p>');
			});

			it('should remove empty attributes after merge #1', () => {
				test('<container:p><attribute:b>[]</attribute:b></container:p>', '<container:p>[]</container:p>');
			});

			it('should remove empty attributes after merge #2', () => {
				test('<container:p><attribute:b>foo</attribute:b><attribute:i>[]</attribute:i><attribute:b>bar</attribute:b></container:p>', '<container:p><attribute:b:10>foo{}bar</attribute:b:10></container:p>');
			});

			it('should remove empty attributes after merge #3', () => {
				test('<container:p><attribute:b></attribute:b><attribute:i>[]</attribute:i><attribute:b></attribute:b></container:p>', '<container:p>[]</container:p>');
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
