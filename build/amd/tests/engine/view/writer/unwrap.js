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

			const newRange = writer.unwrap(selection.getFirstRange(), (0, _view.parse)(unwrapAttribute));
			expect((0, _view.stringify)(view, newRange, { showType: true, showPriority: true })).to.equal(expected);
		}

		beforeEach(() => {
			writer = new _writer2.default();
		});

		describe('unwrap', () => {
			it('should do nothing on collapsed ranges', () => {
				test('<container:p>f{}oo</container:p>', '<attribute:b:10></attribute:b:10>', '<container:p>f{}oo</container:p>');
			});

			it('should do nothing on single text node', () => {
				test('<container:p>[foobar]</container:p>', '<attribute:b:1></attribute:b:1>', '<container:p>[foobar]</container:p>');
			});

			it('should throw error when element is not instance of AttributeElement', () => {
				const container = new _containerelement2.default('p', null, new _attributeelement2.default('b', null, new _text2.default('foo')));
				const range = new _range2.default(new _position2.default(container, 0), new _position2.default(container, 1));
				const b = new _element2.default('b');

				expect(() => {
					writer.unwrap(range, b);
				}).to.throw(_ckeditorerror2.default, 'view-writer-unwrap-invalid-attribute');
			});

			it('should throw error when range placed in two containers', () => {
				const container1 = new _containerelement2.default('p');
				const container2 = new _containerelement2.default('p');
				const range = new _range2.default(new _position2.default(container1, 0), new _position2.default(container2, 1));
				const b = new _attributeelement2.default('b');

				expect(() => {
					writer.unwrap(range, b, 1);
				}).to.throw(_ckeditorerror2.default, 'view-writer-invalid-range-container');
			});

			it('should unwrap single node', () => {
				test('<container:p>[<attribute:b:1>foobar</attribute:b:1>]</container:p>', '<attribute:b:1></attribute:b:1>', '<container:p>[foobar]</container:p>');
			});

			it('should not unwrap attributes with different priorities #1', () => {
				test('<container:p>[<attribute:b:1>foobar</attribute:b:1>]</container:p>', '<attribute:b:2></attribute:b:2>', '<container:p>[<attribute:b:1>foobar</attribute:b:1>]</container:p>');
			});

			it('should not unwrap attributes with different priorities #2', () => {
				test('<container:p>' + '[' + '<attribute:b:2>foo</attribute:b:2>' + '<attribute:b:1>bar</attribute:b:1>' + '<attribute:b:2>baz</attribute:b:2>' + ']' + '</container:p>', '<attribute:b:2></attribute:b:2>', '<container:p>[foo<attribute:b:1>bar</attribute:b:1>baz]</container:p>');
			});

			it('should unwrap part of the node', () => {
				test('<container:p>[baz<attribute:b:1>foo}bar</attribute:b:1>', '<attribute:b:1></attribute:b:1>', '<container:p>[bazfoo]<attribute:b:1>bar</attribute:b:1></container:p>');
			});

			it('should unwrap nested attributes', () => {
				test('<container:p>[<attribute:u:1><attribute:b:1>foobar</attribute:b:1></attribute:u:1>]</container:p>', '<attribute:b:1></attribute:b:1>', '<container:p>[<attribute:u:1>foobar</attribute:u:1>]</container:p>');
			});

			it('should merge unwrapped nodes #1', () => {
				test('<container:p>foo[<attribute:b:1>bar</attribute:b:1>]baz</container:p>', '<attribute:b:1></attribute:b:1>', '<container:p>foo{bar}baz</container:p>');
			});

			it('should merge unwrapped nodes #2', () => {
				const input = '<container:p>' + 'foo' + '<attribute:u:1>bar</attribute:u:1>' + '[' + '<attribute:b:1>' + '<attribute:u:1>bazqux</attribute:u:1>' + '</attribute:b:1>' + ']' + '</container:p>';
				const attribute = '<attribute:b:1></attribute:b:1>';
				const result = '<container:p>foo<attribute:u:1>bar{bazqux</attribute:u:1>]</container:p>';

				test(input, attribute, result);
			});

			it('should merge unwrapped nodes #3', () => {
				const input = '<container:p>' + 'foo' + '<attribute:u:1>bar</attribute:u:1>' + '[' + '<attribute:b:1>' + '<attribute:u:1>baz}qux</attribute:u:1>' + '</attribute:b:1>' + '</container:p>';
				const attribute = '<attribute:b:1></attribute:b:1>';
				const result = '<container:p>' + 'foo' + '<attribute:u:1>bar{baz</attribute:u:1>]' + '<attribute:b:1>' + '<attribute:u:1>qux</attribute:u:1>' + '</attribute:b:1>' + '</container:p>';

				test(input, attribute, result);
			});

			it('should merge unwrapped nodes #4', () => {
				const input = '<container:p>' + 'foo' + '<attribute:u:1>bar</attribute:u:1>' + '[' + '<attribute:b:1>' + '<attribute:u:1>baz</attribute:u:1>' + '</attribute:b:1>' + ']' + '<attribute:u:1>qux</attribute:u:1>' + '</container:p>';
				const attribute = '<attribute:b:1></attribute:b:1>';
				const result = '<container:p>' + 'foo' + '<attribute:u:1>bar{baz}qux</attribute:u:1>' + '</container:p>';

				test(input, attribute, result);
			});

			it('should merge unwrapped nodes #5', () => {
				const input = '<container:p>' + '[' + '<attribute:b:1><attribute:u:1>foo</attribute:u:1></attribute:b:1>' + '<attribute:b:1><attribute:u:1>bar</attribute:u:1></attribute:b:1>' + '<attribute:b:1><attribute:u:1>baz</attribute:u:1></attribute:b:1>' + ']' + '</container:p>';
				const attribute = '<attribute:b:1></attribute:b:1>';
				const result = '<container:p>[<attribute:u:1>foobarbaz</attribute:u:1>]</container:p>';

				test(input, attribute, result);
			});

			it('should unwrap mixed ranges #1', () => {
				const input = '<container:p>' + '[' + '<attribute:u:1>' + '<attribute:b:1>foo]</attribute:b:1>' + '</attribute:u:1>' + '</container:p>';
				const attribute = '<attribute:b:1></attribute:b:1>';
				const result = '<container:p>[<attribute:u:1>foo</attribute:u:1>]</container:p>';

				test(input, attribute, result);
			});

			it('should unwrap mixed ranges #2', () => {
				test('<container:p>[<attribute:u:1><attribute:b:1>foo}</attribute:b:1></attribute:u></container:p>', '<attribute:b:1></attribute:b:1>', '<container:p>[<attribute:u:1>foo</attribute:u:1>]</container:p>');
			});

			it('should unwrap single element by removing matching attributes', () => {
				test('<container:p>[<attribute:b:1 foo="bar" baz="qux">test</attribute:b:1>]</container:p>', '<attribute:b:1 baz="qux"></attribute:b:1>', '<container:p>[<attribute:b:1 foo="bar">test</attribute:b:1>]</container:p>');
			});

			it('should not unwrap single element when attributes are different', () => {
				test('<container:p>[<attribute:b:1 baz="qux" foo="bar">test</attribute:b:1>]</container:p>', '<attribute:b:1 baz="qux" test="true"></attribute:b:1>', '<container:p>[<attribute:b:1 baz="qux" foo="bar">test</attribute:b:1>]</container:p>');
			});

			it('should unwrap single element by removing matching classes', () => {
				test('<container:p>[<attribute:b:1 class="foo bar baz">test</attribute:b:1>]</container:p>', '<attribute:b:1 class="baz foo"></attribute:b:1>', '<container:p>[<attribute:b:1 class="bar">test</attribute:b:1>]</container:p>');
			});

			it('should not unwrap single element when classes are different', () => {
				test('<container:p>[<attribute:b:1 class="foo bar baz">test</attribute:b:1>]</container:p>', '<attribute:b:1 class="baz foo qux"></attribute:b:1>', '<container:p>[<attribute:b:1 class="foo bar baz">test</attribute:b:1>]</container:p>');
			});

			it('should unwrap single element by removing matching styles', () => {
				test('<container:p>[<attribute:b:1 style="color:red;position:absolute;top:10px;">test</attribute:b:1>]</container:p>', '<attribute:b:1 style="position: absolute;"></attribute:b:1>', '<container:p>[<attribute:b:1 style="color:red;top:10px;">test</attribute:b:1>]</container:p>');
			});

			it('should not unwrap single element when styles are different', () => {
				test('<container:p>[<attribute:b:1 style="color:red;position:absolute;top:10px;">test</attribute:b:1>]</container:p>', '<attribute:b:1 style="position: relative;"></attribute:b:1>', '<container:p>[<attribute:b:1 style="color:red;position:absolute;top:10px;">test</attribute:b:1>]</container:p>');
			});

			it('should unwrap single node in document fragment', () => {
				test('<container:p>[<attribute:b:1>foobar</attribute:b:1>]</container:p>', '<attribute:b:1></attribute:b:1>', '<container:p>[foobar]</container:p>');
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
