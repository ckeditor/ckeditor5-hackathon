define('tests', ['/ckeditor5/utils/keyboard.js', '/ckeditor5/utils/ckeditorerror.js'], function (_keyboard, _ckeditorerror) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	var _ckeditorerror2 = _interopRequireDefault(_ckeditorerror);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('Keyboard', () => {
		describe('keyCodes', () => {
			it('contains numbers', () => {
				expect(_keyboard.keyCodes['0']).to.equal(48);
				expect(_keyboard.keyCodes['9']).to.equal(57);
			});

			it('contains letters', () => {
				expect(_keyboard.keyCodes.a).to.equal(65);
				expect(_keyboard.keyCodes.z).to.equal(90);
			});

			it('modifiers and other keys', () => {
				expect(_keyboard.keyCodes.delete).to.equal(46);
				expect(_keyboard.keyCodes.ctrl).to.equal(0x110000);
				expect(_keyboard.keyCodes.cmd).to.equal(0x110000);
			});
		});

		describe('getCode', () => {
			it('gets code of a number', () => {
				expect((0, _keyboard.getCode)('0')).to.equal(48);
			});

			it('gets code of a letter', () => {
				expect((0, _keyboard.getCode)('a')).to.equal(65);
			});

			it('is case insensitive', () => {
				expect((0, _keyboard.getCode)('A')).to.equal(65);
				expect((0, _keyboard.getCode)('Ctrl')).to.equal(0x110000);
				expect((0, _keyboard.getCode)('ENTER')).to.equal(13);
			});

			it('throws when passed unknown key name', () => {
				expect(() => {
					(0, _keyboard.getCode)('foo');
				}).to.throw(_ckeditorerror2.default, /^keyboard-unknown-key:/);
			});

			it('gets code of a keystroke info', () => {
				expect((0, _keyboard.getCode)({ keyCode: 48 })).to.equal(48);
			});

			it('adds modifiers to the keystroke code', () => {
				expect((0, _keyboard.getCode)({ keyCode: 48, altKey: true, ctrlKey: true, shiftKey: true })).to.equal(48 + 0x110000 + 0x220000 + 0x440000);
			});
		});

		describe('parseKeystroke', () => {
			it('parses string', () => {
				expect((0, _keyboard.parseKeystroke)('ctrl+a')).to.equal(0x110000 + 65);
			});

			it('allows spacing', () => {
				expect((0, _keyboard.parseKeystroke)('ctrl +   a')).to.equal(0x110000 + 65);
			});

			it('is case-insensitive', () => {
				expect((0, _keyboard.parseKeystroke)('Ctrl+A')).to.equal(0x110000 + 65);
			});

			it('works with an array', () => {
				expect((0, _keyboard.parseKeystroke)(['ctrl', 'a'])).to.equal(0x110000 + 65);
			});

			it('works with an array which contains numbers', () => {
				expect((0, _keyboard.parseKeystroke)(['shift', 33])).to.equal(0x220000 + 33);
			});

			it('works with two modifiers', () => {
				expect((0, _keyboard.parseKeystroke)('ctrl+shift+a')).to.equal(0x110000 + 0x220000 + 65);
			});

			it('throws on unknown name', () => {
				expect(() => {
					(0, _keyboard.parseKeystroke)('foo');
				}).to.throw(_ckeditorerror2.default, /^keyboard-unknown-key:/);
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
