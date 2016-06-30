define('tests', ['/ckeditor5/engine/view/writer.js', '/ckeditor5/engine/view/containerelement.js', '/ckeditor5/engine/view/attributeelement.js', '/ckeditor5/engine/view/text.js', '/ckeditor5/engine/view/position.js', '/tests/engine/_utils/view.js'], function (_writer, _containerelement, _attributeelement, _text, _position, _view) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: view, browser-only */

	'use strict';

	var _writer2 = _interopRequireDefault(_writer);

	var _containerelement2 = _interopRequireDefault(_containerelement);

	var _attributeelement2 = _interopRequireDefault(_attributeelement);

	var _text2 = _interopRequireDefault(_text);

	var _position2 = _interopRequireDefault(_position);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('Writer', () => {
		let writer;

		beforeEach(() => {
			writer = new _writer2.default();
		});

		describe('getParentContainer', () => {
			it('should return parent container of the node', () => {
				const text = new _text2.default('foobar');
				const b = new _attributeelement2.default('b', null, [text]);
				const parent = new _containerelement2.default('p', null, [b]);

				b.priority = 1;
				const container = writer.getParentContainer(new _position2.default(text, 0));

				expect(container).to.equal(parent);
			});

			it('should return undefined if no parent container', () => {
				const text = new _text2.default('foobar');
				const b = new _attributeelement2.default('b', null, [text]);

				b.priority = 1;
				const container = writer.getParentContainer(new _position2.default(text, 0));

				expect(container).to.be.undefined;
			});
		});

		describe('move', () => {
			it('should move nodes using remove and insert methods', () => {
				const { selection: sourceSelection } = (0, _view.parse)('<container:p>[foobar]</container:p>');
				const { selection: targetSelection } = (0, _view.parse)('<container:div>[]</container:div>');

				const removeSpy = sinon.spy(writer, 'remove');
				const insertSpy = sinon.spy(writer, 'insert');
				const sourceRange = sourceSelection.getFirstRange();
				const targetPosition = targetSelection.getFirstPosition();

				const newRange = writer.move(sourceRange, targetPosition);

				sinon.assert.calledOnce(removeSpy);
				sinon.assert.calledWithExactly(removeSpy, sourceRange);
				sinon.assert.calledOnce(insertSpy);
				sinon.assert.calledWithExactly(insertSpy, targetPosition, removeSpy.firstCall.returnValue);
				expect(newRange).to.equal(insertSpy.firstCall.returnValue);
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
