define('tests', ['/ckeditor5/engine/view/writer.js', '/ckeditor5/engine/view/element.js', '/ckeditor5/engine/view/containerelement.js', '/ckeditor5/engine/view/attributeelement.js', '/ckeditor5/engine/view/documentfragment.js', '/ckeditor5/engine/view/position.js', '/ckeditor5/engine/view/range.js', '/ckeditor5/engine/view/text.js', '/ckeditor5/utils/ckeditorerror.js', '/tests/engine/_utils/view.js'], function (_writer, _element, _containerelement, _attributeelement, _documentfragment, _position, _range, _text, _ckeditorerror, _view) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: view, browser-only */

	'use strict';

	var _writer2 = _interopRequireDefault(_writer);

	var _element2 = _interopRequireDefault(_element);

	var _containerelement2 = _interopRequireDefault(_containerelement);

	var _attributeelement2 = _interopRequireDefault(_attributeelement);

	var _documentfragment2 = _interopRequireDefault(_documentfragment);

	var _position2 = _interopRequireDefault(_position);

	var _range2 = _interopRequireDefault(_range);

	var _text2 = _interopRequireDefault(_text);

	var _ckeditorerror2 = _interopRequireDefault(_ckeditorerror);

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
   * @param {String} unwrapAttribute
   * @param {String} expected
   */
		function test(input, unwrapAttribute, expected) {
			let { view, selection } = (0, _view.parse)(input);

			if (view instanceof _attributeelement2.default || view instanceof _text2.default) {
				view = new _documentfragment2.default(view);
			}

			const newRange = writer.wrap(selection.getFirstRange(), (0, _view.parse)(unwrapAttribute));
			expect((0, _view.stringify)(view, newRange, { showType: true, showPriority: true })).to.equal(expected);
		}

		beforeEach(() => {
			writer = new _writer2.default();
		});

		describe('wrap', () => {
			it('should do nothing on collapsed ranges', () => {
				test('<container:p>f{}oo</container:p>', '<attribute:b></attribute:b>', '<container:p>f{}oo</container:p>');
			});

			it('wraps single text node', () => {
				test('<container:p>[foobar]</container:p>', '<attribute:b:1></attribute:b:1>', '<container:p>[<attribute:b:1>foobar</attribute:b:1>]</container:p>');
			});

			it('wraps single text node in document fragment', () => {
				test('{foobar}', '<attribute:b:1></attribute:b:1>', '[<attribute:b:1>foobar</attribute:b:1>]');
			});

			it('should throw error when element is not instance of AttributeElement', () => {
				const container = new _containerelement2.default('p', null, new _text2.default('foo'));
				const range = new _range2.default(new _position2.default(container, 0), new _position2.default(container, 1));
				const b = new _element2.default('b');

				expect(() => {
					writer.wrap(range, b);
				}).to.throw(_ckeditorerror2.default, 'view-writer-wrap-invalid-attribute');
			});

			it('should throw error when range placed in two containers', () => {
				const container1 = new _containerelement2.default('p');
				const container2 = new _containerelement2.default('p');
				const range = new _range2.default(new _position2.default(container1, 0), new _position2.default(container2, 1));
				const b = new _attributeelement2.default('b');

				expect(() => {
					writer.wrap(range, b, 1);
				}).to.throw(_ckeditorerror2.default, 'view-writer-invalid-range-container');
			});

			it('wraps part of a single text node #1', () => {
				test('<container:p>[foo}bar</container:p>', '<attribute:b:1></attribute:b:1>', '<container:p>[<attribute:b:1>foo</attribute:b:1>]bar</container:p>');
			});

			it('wraps part of a single text node #2', () => {
				test('<container:p>{foo}bar</container:p>', '<attribute:b:1></attribute:b:1>', '<container:p>[<attribute:b:1>foo</attribute:b:1>]bar</container:p>');
			});

			it('wraps part of a single text node #3', () => {
				test('<container:p>foo{bar}</container:p>', '<attribute:b:1></attribute:b:1>', '<container:p>foo[<attribute:b:1>bar</attribute:b:1>]</container:p>');
			});

			it('should not wrap inside nested containers', () => {
				test('<container:div>[foobar<container:p>baz</container:p>]</container:div>', '<attribute:b:1></attribute:b:1>', '<container:div>[<attribute:b:1>foobar</attribute:b:1><container:p>baz</container:p>]</container:div>');
			});

			it('wraps according to priorities', () => {
				test('<container:p>[<attribute:u:1>foobar</attribute:u:1>]</container:p>', '<attribute:b:2></attribute:b:2>', '<container:p>[<attribute:u:1><attribute:b:2>foobar</attribute:b:2></attribute:u:1>]</container:p>');
			});

			it('merges wrapped nodes #1', () => {
				test('<container:p>[<attribute:b:1>foo</attribute:b:1>bar<attribute:b:1>baz</attribute:b:1>]</container:p>', '<attribute:b:1></attribute:b:1>', '<container:p>[<attribute:b:1>foobarbaz</attribute:b:1>]</container:p>');
			});

			it('merges wrapped nodes #2', () => {
				test('<container:p><attribute:b:1>foo</attribute:b:1>[bar}baz</container:p>', '<attribute:b:1></attribute:b:1>', '<container:p><attribute:b:1>foo{bar</attribute:b:1>]baz</container:p>');
			});

			it('merges wrapped nodes #3', () => {
				test('<container:p><attribute:b:1>foobar</attribute:b:1>[baz]</container:p>', '<attribute:b:1></attribute:b:1>', '<container:p><attribute:b:1>foobar{baz</attribute:b:1>]</container:p>');
			});

			it('merges wrapped nodes #4', () => {
				test('<container:p>[foo<attribute:i:1>bar</attribute:i:1>]baz</container:p>', '<attribute:b:1></attribute:b:1>', '<container:p>[<attribute:b:1>foo<attribute:i:1>bar</attribute:i:1></attribute:b:1>]baz</container:p>');
			});

			it('merges wrapped nodes #5', () => {
				test('<container:p>[foo<attribute:i:1>bar</attribute:i:1>baz]</container:p>', '<attribute:b:2></attribute:b:2>', '<container:p>' + '[' + '<attribute:b:2>foo</attribute:b:2>' + '<attribute:i:1>' + '<attribute:b:2>bar</attribute:b:2>' + '</attribute:i:1>' + '<attribute:b:2>baz</attribute:b:2>' + ']' + '</container:p>');
			});

			it('should wrap single element by merging attributes', () => {
				test('<container:p>[<attribute:b:1 foo="bar" one="two"></attribute:b:1>]</container:p>', '<attribute:b:1 baz="qux" one="two"></attribute:b:1>', '<container:p>[<attribute:b:1 baz="qux" foo="bar" one="two"></attribute:b:1>]</container:p>');
			});

			it('should not merge attributes when they differ', () => {
				test('<container:p>[<attribute:b:1 foo="bar"></attribute:b:1>]</container:p>', '<attribute:b:1 foo="baz"></attribute:b:1>', '<container:p>[<attribute:b:1 foo="baz"><attribute:b:1 foo="bar"></attribute:b:1></attribute:b:1>]</container:p>');
			});

			it('should wrap single element by merging classes', () => {
				test('<container:p>[<attribute:b:1 class="foo bar baz"></attribute:b:1>]</container:p>', '<attribute:b:1 class="foo bar qux jax"></attribute:b:1>', '<container:p>[<attribute:b:1 class="foo bar baz qux jax"></attribute:b:1>]</container:p>');
			});

			it('should wrap single element by merging styles', () => {
				test('<container:p>[<attribute:b:1 style="color:red; position: absolute;"></attribute:b:1>]</container:p>', '<attribute:b:1 style="color:red; top: 20px;"></attribute:b:1>', '<container:p>[<attribute:b:1 style="color:red;position:absolute;top:20px;"></attribute:b:1>]</container:p>');
			});

			it('should not merge styles when they differ', () => {
				test('<container:p>[<attribute:b:1 style="color:red;"></attribute:b:1>]</container:p>', '<attribute:b:1 style="color:black;"></attribute:b:1>', '<container:p>' + '[' + '<attribute:b:1 style="color:black;">' + '<attribute:b:1 style="color:red;"></attribute:b:1>' + '</attribute:b:1>' + ']' + '</container:p>');
			});

			it('should not merge single elements when they have different priority', () => {
				test('<container:p>[<attribute:b:2 style="color:red;"></attribute:b:2>]</container:p>', '<attribute:b:1 style="color:red;"></attribute:b:1>', '<container:p>' + '[' + '<attribute:b:1 style="color:red;">' + '<attribute:b:2 style="color:red;"></attribute:b:2>' + '</attribute:b:1>' + ']</container:p>');
			});

			it('should be merged with outside element when wrapping all children', () => {
				test('<container:p><attribute:b:1 foo="bar">[foobar<attribute:i:1>baz</attribute:i:1>]</attribute:b:1></container:p>', '<attribute:b:1 baz="qux"></attribute:b:1>', '<container:p>' + '[' + '<attribute:b:1 baz="qux" foo="bar">' + 'foobar' + '<attribute:i:1>baz</attribute:i:1>' + '</attribute:b:1>' + ']' + '</container:p>');
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
