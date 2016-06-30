define('tests', ['/tests/engine/model/_utils/utils.js', '/ckeditor5/engine/model/document.js', '/ckeditor5/engine/model/range.js', '/ckeditor5/engine/model/element.js'], function (_utils, _document, _range, _element) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	var _document2 = _interopRequireDefault(_document);

	var _range2 = _interopRequireDefault(_range);

	var _element2 = _interopRequireDefault(_element);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('getNodesAndText', () => {
		let doc, root, div, p;

		beforeEach(() => {
			doc = new _document2.default();
			root = doc.createRoot('root');

			div = new _element2.default('div', [], 'foobar');
			p = new _element2.default('p', [], 'abcxyz');

			root.insertChildren(0, [div, p]);
		});

		it('reads two elements with text', () => {
			expect((0, _utils.getNodesAndText)(_range2.default.createFromElement(root))).to.equal('DIVfoobarDIVPabcxyzP');
		});
	});

	describe('jsonParseStringify', () => {
		class Foo {
			constructor(ra) {
				this.ra = ra;
			}
		}

		it('should return cleaned object', () => {
			let foo = new Foo({ bar: 'bar' });

			let fooJsoned = (0, _utils.jsonParseStringify)(foo);
			expect(fooJsoned).to.not.be.instanceOf(Foo);
			expect(fooJsoned).to.deep.equal({ ra: { bar: 'bar' } });
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
