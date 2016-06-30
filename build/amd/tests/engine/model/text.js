define('tests', ['/ckeditor5/engine/model/text.js'], function (_text) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: model */

	'use strict';

	var _text2 = _interopRequireDefault(_text);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('Text', () => {
		describe('constructor', () => {
			it('should create character without attributes', () => {
				let text = new _text2.default('bar', { bold: true });

				expect(text).to.have.property('text').that.equals('bar');
				expect(text).to.have.property('_attrs').that.is.instanceof(Map);
				expect(Array.from(text._attrs)).to.deep.equal([['bold', true]]);
			});

			it('should create empty text object', () => {
				let empty1 = new _text2.default();
				let empty2 = new _text2.default('');

				expect(empty1.text).to.equal('');
				expect(empty2.text).to.equal('');
			});
		});

		describe('attributes interface', () => {
			let text;

			beforeEach(() => {
				text = new _text2.default('bar', { foo: 'bar' });
			});

			describe('hasAttribute', () => {
				it('should return true if element contains attribute with given key', () => {
					expect(text.hasAttribute('foo')).to.be.true;
				});

				it('should return false if element does not contain attribute with given key', () => {
					expect(text.hasAttribute('bar')).to.be.false;
				});
			});

			describe('getAttribute', () => {
				it('should return attribute value for given key if element contains given attribute', () => {
					expect(text.getAttribute('foo')).to.equal('bar');
				});

				it('should return undefined if element does not contain given attribute', () => {
					expect(text.getAttribute('bar')).to.be.undefined;
				});
			});

			describe('getAttributes', () => {
				it('should return an iterator that iterates over all attributes set on the element', () => {
					expect(Array.from(text.getAttributes())).to.deep.equal([['foo', 'bar']]);
				});
			});

			describe('setAttribute', () => {
				it('should set given attribute on the element', () => {
					text.setAttribute('abc', 'xyz');

					expect(text.getAttribute('abc')).to.equal('xyz');
				});
			});

			describe('setAttributesTo', () => {
				it('should remove all attributes set on element and set the given ones', () => {
					text.setAttribute('abc', 'xyz');
					text.setAttributesTo({ bold: true });

					expect(text.getAttribute('bold')).to.equal(true);
					expect(text.getAttribute('foo')).to.be.undefined;
					expect(text.getAttribute('abc')).to.be.undefined;
				});
			});

			describe('removeAttribute', () => {
				it('should remove attribute set on the element and return true', () => {
					let result = text.removeAttribute('foo');

					expect(text.getAttribute('foo')).to.be.undefined;
					expect(result).to.be.true;
				});

				it('should return false if element does not contain given attribute', () => {
					let result = text.removeAttribute('abc');

					expect(result).to.be.false;
				});
			});

			describe('clearAttributes', () => {
				it('should remove all attributes from the element', () => {
					text.setAttribute('abc', 'xyz');

					text.clearAttributes();

					expect(text.getAttribute('foo')).to.be.undefined;
					expect(text.getAttribute('abc')).to.be.undefined;
				});
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
