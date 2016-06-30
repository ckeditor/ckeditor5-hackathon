define('tests', ['/ckeditor5/utils/diff.js', '/ckeditor5/utils/difftochanges.js'], function (_diff, _difftochanges) {
	/**
  * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	var _diff2 = _interopRequireDefault(_diff);

	var _difftochanges2 = _interopRequireDefault(_difftochanges);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('diffToChanges', () => {
		describe('equal patterns', () => {
			test(0, '', '');
			test(0, 'abc', 'abc');
		});

		describe('insertion', () => {
			test(1, '', 'abc');
			test(1, 'abc', 'abcd');
			test(1, 'abc', 'abcdef');
			test(2, 'abc', 'xxabcyy');
			test(2, 'abc', 'axxbyyc');
		});

		describe('deletion', () => {
			test(1, 'abc', '');
			test(1, 'abc', 'ac');
			test(1, 'abc', 'bc');
			test(1, 'abc', 'ab');
			test(1, 'abc', 'c');
			test(2, 'abc', 'b');
		});

		describe('replacement', () => {
			test(2, 'abc', 'def');
			test(2, 'abc', 'axc');
			test(2, 'abc', 'axyc');
			test(2, 'abc', 'xybc');
			test(2, 'abc', 'abxy');
		});

		describe('various', () => {
			test(3, 'abc', 'xbccy');
			test(2, 'abcdef', 'defabc');
			test(4, 'abcdef', 'axxdeyyfz');
			test(4, 'abcdef', 'xybzc');
			test(5, 'abcdef', 'bdxfy');
		});

		it('works with arrays', () => {
			const input = Array.from('abc');
			const output = Array.from('xaby');
			const changes = (0, _difftochanges2.default)((0, _diff2.default)(input, output), output);

			changes.forEach(change => {
				if (change.type == 'INSERT') {
					input.splice(change.index, 0, ...change.values);
				} else if (change.type == 'DELETE') {
					input.splice(change.index, change.howMany);
				}
			});

			expect(input).to.deep.equal(output);
			expect(changes).to.have.lengthOf(3);
		});

		function test(expectedChangeNumber, oldStr, newStr) {
			it(`${ oldStr } => ${ newStr }`, () => {
				const changes = (0, _difftochanges2.default)((0, _diff2.default)(oldStr, newStr), newStr);
				const oldStrChars = Array.from(oldStr);

				changes.forEach(change => {
					if (change.type == 'INSERT') {
						oldStrChars.splice(change.index, 0, ...change.values);
					} else if (change.type == 'DELETE') {
						oldStrChars.splice(change.index, change.howMany);
					}
				});

				expect(oldStrChars.join('')).to.equal(newStr);
				expect(changes).to.have.lengthOf(expectedChangeNumber);
			});
		}
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
