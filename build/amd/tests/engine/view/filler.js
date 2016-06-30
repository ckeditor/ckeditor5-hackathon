define('tests', ['/ckeditor5/engine/view/filler.js'], function (_filler) {
	/**
  * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: view, browser-only */

	'use strict';

	describe('filler', () => {
		describe('INLINE_FILLER', () => {
			it('should have length equal INLINE_FILLER_LENGTH', () => {
				expect(_filler.INLINE_FILLER.length).to.equal(_filler.INLINE_FILLER_LENGTH);
			});
		});

		describe('startsWithFiller', () => {
			it('should be true for node which contains only filler', () => {
				const node = document.createTextNode(_filler.INLINE_FILLER);

				expect((0, _filler.startsWithFiller)(node)).to.be.true;
			});

			it('should be true for node which starts with filler', () => {
				const node = document.createTextNode(_filler.INLINE_FILLER + 'foo');

				expect((0, _filler.startsWithFiller)(node)).to.be.true;
			});

			it('should be false for element', () => {
				const node = document.createElement('p');

				expect((0, _filler.startsWithFiller)(node)).to.be.false;
			});

			it('should be false which contains filler in the middle', () => {
				const node = document.createTextNode('x' + _filler.INLINE_FILLER + 'x');

				expect((0, _filler.startsWithFiller)(node)).to.be.false;
			});

			it('should be false for the node which does not contains filler', () => {
				const node = document.createTextNode('foo');

				expect((0, _filler.startsWithFiller)(node)).to.be.false;
			});

			it('should be false for the node which does not contains filler, even if it has the same length', () => {
				let text = '';

				for (let i = 0; i < _filler.INLINE_FILLER_LENGTH; i++) {
					text += 'x';
				}

				const node = document.createTextNode(text);

				expect((0, _filler.startsWithFiller)(node)).to.be.false;
			});
		});

		describe('getDataWithoutFiller', () => {
			it('should return data without filler', () => {
				const node = document.createTextNode(_filler.INLINE_FILLER + 'foo');

				const dataWithoutFiller = (0, _filler.getDataWithoutFiller)(node);

				expect(dataWithoutFiller.length).to.equals(3);
				expect(dataWithoutFiller).to.equals('foo');
			});

			it('should return the same data for data without filler', () => {
				const node = document.createTextNode('foo');

				const dataWithoutFiller = (0, _filler.getDataWithoutFiller)(node);

				expect(dataWithoutFiller.length).to.equals(3);
				expect(dataWithoutFiller).to.equals('foo');
			});
		});

		describe('isInlineFiller', () => {
			it('should be true for inline filler', () => {
				const node = document.createTextNode(_filler.INLINE_FILLER);

				expect((0, _filler.isInlineFiller)(node)).to.be.true;
			});

			it('should be false for element which starts with filler', () => {
				const node = document.createTextNode(_filler.INLINE_FILLER + 'foo');

				expect((0, _filler.isInlineFiller)(node)).to.be.false;
			});

			it('should be false for the node which does not contains filler, even if it has the same length', () => {
				let text = '';

				for (let i = 0; i < _filler.INLINE_FILLER_LENGTH; i++) {
					text += 'x';
				}

				const node = document.createTextNode(text);

				expect((0, _filler.isInlineFiller)(node)).to.be.false;
			});
		});

		describe('isBlockFiller', () => {
			it('should return true if the node is an instance of the BR block filler', () => {
				const brFillerInstance = (0, _filler.BR_FILLER)(document);

				expect((0, _filler.isBlockFiller)(brFillerInstance, _filler.BR_FILLER)).to.be.true;
				// Check it twice to ensure that caching breaks nothing.
				expect((0, _filler.isBlockFiller)(brFillerInstance, _filler.BR_FILLER)).to.be.true;
			});

			it('should return true if the node is an instance of the NBSP block filler', () => {
				const nbspFillerInstance = (0, _filler.NBSP_FILLER)(document);

				expect((0, _filler.isBlockFiller)(nbspFillerInstance, _filler.NBSP_FILLER)).to.be.true;
				// Check it twice to ensure that caching breaks nothing.
				expect((0, _filler.isBlockFiller)(nbspFillerInstance, _filler.NBSP_FILLER)).to.be.true;
			});

			it('should return false for inline filler', () => {
				expect((0, _filler.isBlockFiller)(document.createTextNode(_filler.INLINE_FILLER), _filler.BR_FILLER)).to.be.false;
				expect((0, _filler.isBlockFiller)(document.createTextNode(_filler.INLINE_FILLER), _filler.NBSP_FILLER)).to.be.false;
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
