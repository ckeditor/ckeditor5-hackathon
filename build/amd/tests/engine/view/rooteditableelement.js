define('tests', ['/ckeditor5/engine/view/containerelement.js', '/ckeditor5/engine/view/editableelement.js', '/ckeditor5/engine/view/rooteditableelement.js', '/tests/engine/view/_utils/createdocumentmock.js'], function (_containerelement, _editableelement, _rooteditableelement, _createdocumentmock) {
	/**
  * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: view */

	'use strict';

	var _containerelement2 = _interopRequireDefault(_containerelement);

	var _editableelement2 = _interopRequireDefault(_editableelement);

	var _rooteditableelement2 = _interopRequireDefault(_rooteditableelement);

	var _createdocumentmock2 = _interopRequireDefault(_createdocumentmock);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('RootEditableElement', () => {
		describe('constructor', () => {
			it('should create an element with default root name', () => {
				const root = new _rooteditableelement2.default((0, _createdocumentmock2.default)(), 'div');

				expect(root).to.be.instanceof(_editableelement2.default);
				expect(root).to.be.instanceof(_containerelement2.default);

				expect(root.rootName).to.equal('main');
				expect(root.name).to.equal('div');

				expect(root.isFocused).to.be.false;
				expect(root.isReadOnly).to.be.false;
			});

			it('should create an element with custom root name', () => {
				const root = new _rooteditableelement2.default((0, _createdocumentmock2.default)(), 'h1', 'header');

				expect(root.rootName).to.equal('header');
				expect(root.name).to.equal('h1');

				expect(root.isFocused).to.be.false;
				expect(root.isReadOnly).to.be.false;
			});
		});

		describe('isFocused', () => {
			let docMock, viewMain, viewHeader;

			beforeEach(() => {
				docMock = (0, _createdocumentmock2.default)();

				viewMain = new _rooteditableelement2.default(docMock, 'div');
				viewHeader = new _rooteditableelement2.default(docMock, 'h1', 'header');
			});

			it('should be observable', () => {
				const root = new _rooteditableelement2.default((0, _createdocumentmock2.default)(), 'div');

				expect(root.isFocused).to.be.false;

				const isFocusedSpy = sinon.spy();

				root.on('change:isFocused', isFocusedSpy);

				root.isFocused = true;

				expect(root.isFocused).to.be.true;

				expect(isFocusedSpy.calledOnce).to.be.true;
			});

			it('should change isFocused when focusedEditable changes', () => {
				docMock.focusedEditable = viewMain;

				expect(viewMain.isFocused).to.be.true;
				expect(viewHeader.isFocused).to.be.false;

				docMock.focusedEditable = viewHeader;

				expect(viewMain.isFocused).to.be.false;
				expect(viewHeader.isFocused).to.be.true;

				docMock.focusedEditable = null;

				expect(viewMain.isFocused).to.be.false;
				expect(viewHeader.isFocused).to.be.false;
			});
		});

		describe('isReadOnly', () => {
			it('should be observable', () => {
				const root = new _rooteditableelement2.default((0, _createdocumentmock2.default)(), 'div');

				expect(root.isReadOnly).to.be.false;

				const isReadOnlySpy = sinon.spy();

				root.on('change:isReadOnly', isReadOnlySpy);

				root.isReadOnly = true;

				expect(root.isReadOnly).to.be.true;

				expect(isReadOnlySpy.calledOnce).to.be.true;
			});
		});

		describe('getDocument', () => {
			it('should return document', () => {
				const docMock = (0, _createdocumentmock2.default)();
				const root = new _rooteditableelement2.default(docMock, 'div');

				expect(root.getDocument()).to.equal(docMock);
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
