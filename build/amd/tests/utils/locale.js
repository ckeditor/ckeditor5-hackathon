define('tests', ['/ckeditor5/utils/locale.js'], function (_locale) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	var _locale2 = _interopRequireDefault(_locale);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('Locale', () => {
		let locale;

		beforeEach(() => {
			locale = new _locale2.default();
		});

		describe('constructor', () => {
			it('sets the lang', () => {
				const locale = new _locale2.default('pl');

				expect(locale).to.have.property('lang', 'pl');
			});

			it('defaults lang to en', () => {
				const locale = new _locale2.default();

				expect(locale).to.have.property('lang', 'en');
			});
		});

		describe('t', () => {
			it('has the context bound', () => {
				const t = locale.t;

				expect(t('Foo')).to.equal('Foo');
			});

			it('interpolates 1 value', () => {
				const t = locale.t;

				expect(t('%0 - %0', ['foo'])).to.equal('foo - foo');
			});

			it('interpolates 3 values', () => {
				const t = locale.t;

				expect(t('%1 - %0 - %2', ['a', 'b', 'c'])).to.equal('b - a - c');
			});

			// Those test make sure that if %0 is really to be used, then it's going to work.
			// It'd be a super rare case if one would need to use %0 and at the same time interpolate something.
			it('does not interpolate placeholders if values not passed', () => {
				const t = locale.t;

				expect(t('%1 - %0 - %2')).to.equal('%1 - %0 - %2');
			});

			it('does not interpolate those placeholders for which values has not been passed', () => {
				const t = locale.t;

				expect(t('%1 - %0 - %2', ['a'])).to.equal('%1 - a - %2');
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
