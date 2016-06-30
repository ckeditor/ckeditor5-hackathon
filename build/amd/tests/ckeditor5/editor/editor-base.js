define('tests', ['/ckeditor5/editor/editor.js', '/ckeditor5/command/command.js', '/ckeditor5/utils/locale.js', '/ckeditor5/utils/ckeditorerror.js'], function (_editor, _command, _locale, _ckeditorerror) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: editor */

	'use strict';

	var _editor2 = _interopRequireDefault(_editor);

	var _command2 = _interopRequireDefault(_command);

	var _locale2 = _interopRequireDefault(_locale);

	var _ckeditorerror2 = _interopRequireDefault(_ckeditorerror);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('Editor', () => {
		describe('locale', () => {
			it('is instantiated and t() is exposed', () => {
				const editor = new _editor2.default();

				expect(editor.locale).to.be.instanceof(_locale2.default);
				expect(editor.t).to.equal(editor.locale.t);
			});

			it('is configured with the config.lang', () => {
				const editor = new _editor2.default({ lang: 'pl' });

				expect(editor.locale.lang).to.equal('pl');
			});
		});

		describe('destroy', () => {
			it('should fire "destroy"', () => {
				const editor = new _editor2.default();
				let spy = sinon.spy();

				editor.on('destroy', spy);

				return editor.destroy().then(() => {
					expect(spy.calledOnce).to.be.true;
				});
			});

			it('should destroy all components it initialized', () => {
				const editor = new _editor2.default();

				const spy1 = sinon.spy(editor.data, 'destroy');
				const spy2 = sinon.spy(editor.document, 'destroy');

				return editor.destroy().then(() => {
					expect(spy1.calledOnce).to.be.true;
					expect(spy2.calledOnce).to.be.true;
				});
			});
		});

		describe('execute', () => {
			it('should execute specified command', () => {
				const editor = new _editor2.default();

				let command = new _command2.default(editor);
				sinon.spy(command, '_execute');

				editor.commands.set('commandName', command);
				editor.execute('commandName');

				expect(command._execute.calledOnce).to.be.true;
			});

			it('should throw an error if specified command has not been added', () => {
				const editor = new _editor2.default();

				expect(() => {
					editor.execute('command');
				}).to.throw(_ckeditorerror2.default, /^editor-command-not-found:/);
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
