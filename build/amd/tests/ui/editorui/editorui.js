define('tests', ['/tests/ckeditor5/_utils/utils.js', '/ckeditor5/editor/editor.js', '/ckeditor5/ui/editorui/editorui.js', '/ckeditor5/ui/componentfactory.js', '/ckeditor5/ui/controllercollection.js'], function (_utils, _editor, _editorui, _componentfactory, _controllercollection) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	var _utils2 = _interopRequireDefault(_utils);

	var _editor2 = _interopRequireDefault(_editor);

	var _editorui2 = _interopRequireDefault(_editorui);

	var _componentfactory2 = _interopRequireDefault(_componentfactory);

	var _controllercollection2 = _interopRequireDefault(_controllercollection);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	_utils2.default.createSinonSandbox();

	describe('EditorUI', () => {
		let editor, editorUI;

		beforeEach(() => {
			editor = new _editor2.default();
			editorUI = new _editorui2.default(editor);
		});

		describe('constructor', () => {
			it('sets all the properties', () => {
				expect(editorUI).to.have.property('editor', editor);

				expect(editorUI.featureComponents).to.be.instanceof(_componentfactory2.default);

				expect(editorUI.collections.get('body')).to.be.instanceof(_controllercollection2.default);
			});
		});

		describe('init', () => {
			it('calls _setupIconManager when "icon" in model', () => {
				const spy = _utils2.default.sinon.spy(editorUI, '_setupIconManager');

				return editorUI.init().then(() => {
					expect(spy.calledOnce).to.be.true;
				});
			});
		});

		describe('_setupIconManager', () => {
			it('sets "icon" property', () => {
				editorUI._setupIconManager();

				expect(editorUI.icons).to.be.an('array');
				expect(editorUI.icons).to.not.be.empty;
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
