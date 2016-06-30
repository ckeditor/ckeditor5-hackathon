define('tests', ['/ckeditor5/engine/view/attributeelement.js', '/ckeditor5/engine/view/element.js', '/tests/engine/_utils/view.js'], function (_attributeelement, _element, _view) {
	/**
  * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: view, browser-only */

	'use strict';

	var _attributeelement2 = _interopRequireDefault(_attributeelement);

	var _element2 = _interopRequireDefault(_element);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('AttributeElement', () => {
		describe('constructor', () => {
			it('should create element with default priority', () => {
				const el = new _attributeelement2.default('strong');

				expect(el).to.be.an.instanceof(_attributeelement2.default);
				expect(el).to.be.an.instanceof(_element2.default);
				expect(el).to.have.property('name').that.equals('strong');
				expect(el).to.have.property('priority').that.equals(_attributeelement2.default.DEFAULT_PRIORITY);
			});
		});

		describe('clone', () => {
			it('should clone element with priority', () => {
				const el = new _attributeelement2.default('b');
				el.priority = 7;

				const clone = el.clone();

				expect(clone).to.not.equal(el);
				expect(clone.name).to.equal(el.name);
				expect(clone.priority).to.equal(el.priority);
			});
		});

		describe('isSimilar', () => {
			it('should return true if priorities are the same', () => {
				const b1 = new _attributeelement2.default('b');
				b1.priority = 7;

				const b2 = new _attributeelement2.default('b');
				b2.priority = 7;

				expect(b1.isSimilar(b2)).to.be.true;
			});

			it('should return false if priorities are different', () => {
				const b1 = new _attributeelement2.default('b');
				b1.priority = 7;

				const b2 = new _attributeelement2.default('b'); // default priority

				expect(b1.isSimilar(b2)).to.be.false;
			});
		});

		describe('getFillerOffset', () => {
			it('should return position 0 if it is the only element in the container', () => {
				const { selection } = (0, _view.parse)('<container:p><attribute:b>[]</attribute:b></container:p>');
				const attribute = selection.getFirstPosition().parent;

				expect(attribute.getFillerOffset()).to.equals(0);
			});

			it('should return position 0 if it is the only nested element in the container', () => {
				const { selection } = (0, _view.parse)('<container:p><attribute:b><attribute:i>[]</attribute:i></attribute:b></container:p>');
				const attribute = selection.getFirstPosition().parent;

				expect(attribute.getFillerOffset()).to.equals(0);
			});

			it('should return null if element contains another element', () => {
				const attribute = (0, _view.parse)('<attribute:b><attribute:i></attribute:i></attribute:b>');

				expect(attribute.getFillerOffset()).to.be.null;
			});

			it('should return null if element contains text', () => {
				const attribute = (0, _view.parse)('<attribute:b>text</attribute:b>');

				expect(attribute.getFillerOffset()).to.be.null;
			});

			it('should return null if container element contains text', () => {
				const { selection } = (0, _view.parse)('<container:p><attribute:b>[]</attribute:b>foo</container:p>');
				const attribute = selection.getFirstPosition().parent;

				expect(attribute.getFillerOffset()).to.be.null;
			});

			it('should return null if it is the parent contains text', () => {
				const { selection } = (0, _view.parse)('<container:p><attribute:b><attribute:i>[]</attribute:i>foo</attribute:b></container:p>');
				const attribute = selection.getFirstPosition().parent;

				expect(attribute.getFillerOffset()).to.be.null;
			});

			it('should return null if there is no parent container element', () => {
				const { selection } = (0, _view.parse)('<attribute:b><attribute:i>[]</attribute:i>foo</attribute:b>');
				const attribute = selection.getFirstPosition().parent;

				expect(attribute.getFillerOffset()).to.be.null;
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
