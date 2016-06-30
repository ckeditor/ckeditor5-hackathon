define('tests', ['/ckeditor5/engine/view/node.js', '/ckeditor5/engine/view/text.js'], function (_node, _text) {
	/**
  * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: view */

	'use strict';

	var _node2 = _interopRequireDefault(_node);

	var _text2 = _interopRequireDefault(_text);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('Element', () => {
		describe('constructor', () => {
			it('should create element without attributes', () => {
				const text = new _text2.default('foo');

				expect(text).to.be.an.instanceof(_node2.default);
				expect(text.data).to.equal('foo');
				expect(text).to.have.property('parent').that.is.null;
			});
		});

		describe('clone', () => {
			it('should return new text with same data', () => {
				const text = new _text2.default('foo bar');
				const clone = text.clone();

				expect(clone).to.not.equal(text);
				expect(clone.data).to.equal(text.data);
			});
		});

		describe('isSimilar', () => {
			const text = new _text2.default('foo');

			it('should return false when comparing to non-text', () => {
				expect(text.isSimilar(null)).to.be.false;
				expect(text.isSimilar({})).to.be.false;
			});

			it('should return true when the same text node is provided', () => {
				expect(text.isSimilar(text)).to.be.true;
			});

			it('sould return true when data is the same', () => {
				const other = new _text2.default('foo');

				expect(text.isSimilar(other)).to.be.true;
			});

			it('sould return false when data is not the same', () => {
				const other = text.clone();
				other.data = 'not-foo';

				expect(text.isSimilar(other)).to.be.false;
			});
		});

		describe('setText', () => {
			it('should change the text', () => {
				const text = new _text2.default('foo');
				text.data = 'bar';

				expect(text.data).to.equal('bar');
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
