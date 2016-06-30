define('tests', ['/tests/ckeditor5/_utils/modeltesteditor.js', '/ckeditor5/engine/model/range.js', '/ckeditor5/engine/model/position.js', '/ckeditor5/undo/undoengine.js', '/tests/engine/_utils/model.js'], function (_modeltesteditor, _range, _position, _undoengine, _model) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	var _modeltesteditor2 = _interopRequireDefault(_modeltesteditor);

	var _range2 = _interopRequireDefault(_range);

	var _position2 = _interopRequireDefault(_position);

	var _undoengine2 = _interopRequireDefault(_undoengine);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	// import deleteContents from '/ckeditor5/engine/model/composer/deletecontents.js';

	let editor, doc, root;

	beforeEach(() => {
		return _modeltesteditor2.default.create({
			features: [_undoengine2.default]
		}).then(newEditor => {
			editor = newEditor;
			doc = editor.document;
			root = doc.getRoot();
		});
	});

	function setSelection(pathA, pathB) {
		doc.selection.setRanges([new _range2.default(new _position2.default(root, pathA), new _position2.default(root, pathB))]);
	}

	function input(input) {
		(0, _model.setData)(doc, input);
	}

	function output(output) {
		expect((0, _model.getData)(doc)).to.equal(output);
	}

	function undoDisabled() {
		expect(editor.commands.get('undo').isEnabled).to.be.false;
	}

	describe('UndoEngine integration', () => {
		describe('adding and removing content', () => {
			it('add and undo', () => {
				input('<p>fo<selection />o</p><p>bar</p>');

				doc.batch().insert(doc.selection.getFirstPosition(), 'zzz');
				output('<p>fozzz<selection />o</p><p>bar</p>');

				editor.execute('undo');
				output('<p>fo<selection />o</p><p>bar</p>');

				undoDisabled();
			});

			it('multiple adding and undo', () => {
				input('<p>fo<selection />o</p><p>bar</p>');

				doc.batch().insert(doc.selection.getFirstPosition(), 'zzz').insert(new _position2.default(root, [1, 0]), 'xxx');
				output('<p>fozzz<selection />o</p><p>xxxbar</p>');

				setSelection([1, 0], [1, 0]);
				doc.batch().insert(doc.selection.getFirstPosition(), 'yyy');
				output('<p>fozzzo</p><p>yyy<selection />xxxbar</p>');

				editor.execute('undo');
				output('<p>fozzzo</p><p><selection />xxxbar</p>');

				editor.execute('undo');
				output('<p>fo<selection />o</p><p>bar</p>');

				undoDisabled();
			});

			it('multiple adding mixed with undo', () => {
				input('<p>fo<selection />o</p><p>bar</p>');

				doc.batch().insert(doc.selection.getFirstPosition(), 'zzz');
				output('<p>fozzz<selection />o</p><p>bar</p>');

				setSelection([1, 0], [1, 0]);
				doc.batch().insert(doc.selection.getFirstPosition(), 'yyy');
				output('<p>fozzzo</p><p>yyy<selection />bar</p>');

				editor.execute('undo');
				output('<p>fozzzo</p><p><selection />bar</p>');

				setSelection([0, 0], [0, 0]);
				doc.batch().insert(doc.selection.getFirstPosition(), 'xxx');
				output('<p>xxx<selection />fozzzo</p><p>bar</p>');

				editor.execute('undo');
				output('<p><selection />fozzzo</p><p>bar</p>');

				editor.execute('undo');
				output('<p>fo<selection />o</p><p>bar</p>');

				undoDisabled();
			});

			it('multiple remove and undo', () => {
				input('<p><selection />foo</p><p>bar</p>');

				doc.batch().remove(_range2.default.createFromPositionAndShift(doc.selection.getFirstPosition(), 2));
				output('<p><selection />o</p><p>bar</p>');

				setSelection([1, 1], [1, 1]);
				doc.batch().remove(_range2.default.createFromPositionAndShift(doc.selection.getFirstPosition(), 2));
				output('<p>o</p><p>b<selection /></p>');

				editor.execute('undo');
				// Here is an edge case that selection could be before or after `ar` but selection always ends up after.
				output('<p>o</p><p>bar<selection /></p>');

				editor.execute('undo');
				// As above.
				output('<p>fo<selection />o</p><p>bar</p>');

				undoDisabled();
			});

			it('add and remove different parts and undo', () => {
				input('<p>fo<selection />o</p><p>bar</p>');

				doc.batch().insert(doc.selection.getFirstPosition(), 'zzz');
				output('<p>fozzz<selection />o</p><p>bar</p>');

				setSelection([1, 2], [1, 2]);
				doc.batch().remove(_range2.default.createFromPositionAndShift(new _position2.default(root, [1, 1]), 1));
				output('<p>fozzzo</p><p>b<selection />r</p>');

				editor.execute('undo');
				output('<p>fozzzo</p><p>ba<selection />r</p>');

				editor.execute('undo');
				output('<p>fo<selection />o</p><p>bar</p>');

				undoDisabled();
			});

			//it( 'add and remove same part and undo', () => {
			//	// This test case fails because some operations are transformed to NoOperations incorrectly.
			//	input( '<p>fo<selection />o</p><p>bar</p>' );
			//
			//	doc.batch().insert( doc.selection.getFirstPosition(), 'zzz' );
			//	output( '<p>fozzz<selection />o</p><p>bar</p>' );
			//
			//	doc.batch().remove( Range.createFromPositionAndShift( new Position( root, [ 0, 2 ] ) , 3 ) );
			//	output( '<p>fo<selection />o</p><p>bar</p>' );
			//
			//	editor.execute( 'undo' );
			//	output( '<p>fozzz<selection />o</p><p>bar</p>' );
			//
			//	editor.execute( 'undo' );
			//	output( '<p>fo<selection />o</p><p>bar</p>' );
			//
			//	undoDisabled();
			//} );
		});

		describe('moving', () => {
			//it( 'move same content twice then undo', () => {
			//	// This test case fails because some operations are transformed to NoOperations incorrectly.
			//	input( '<p>f<selection>o</selection>z</p><p>bar</p>' );
			//
			//	doc.batch().move( doc.selection.getFirstRange(), new Position( root, [ 1, 0 ] ) );
			//	output( '<p>fz</p><p><selection>o</selection>bar</p>' );
			//
			//	doc.batch().move( doc.selection.getFirstRange(), new Position( root, [ 0, 2 ] ) );
			//	output( '<p>fz<selection>o</selection></p><p>bar</p>' );
			//
			//	editor.execute( 'undo' );
			//	output( '<p>fz</p><p><selection>o</selection>bar</p>' );
			//
			//	editor.execute( 'undo' );
			//	output( '<p>f<selection>o</selection>z</p><p>bar</p>' );
			//
			//	undoDisabled();
			//} );

			it('move content and new parent then undo', () => {
				input('<p>f<selection>o</selection>z</p><p>bar</p>');

				doc.batch().move(doc.selection.getFirstRange(), new _position2.default(root, [1, 0]));
				output('<p>fz</p><p><selection>o</selection>bar</p>');

				setSelection([1], [2]);
				doc.batch().move(doc.selection.getFirstRange(), new _position2.default(root, [0]));
				output('<selection><p>obar</p></selection><p>fz</p>');

				editor.execute('undo');
				output('<p>fz</p><selection><p>obar</p></selection>');

				editor.execute('undo');
				output('<p>f<selection>o</selection>z</p><p>bar</p>');

				undoDisabled();
			});
		});

		describe('attributes with other', () => {
			it('attributes then insert inside then undo', () => {
				input('<p>fo<selection>ob</selection>ar</p>');

				doc.batch().setAttr('bold', true, doc.selection.getFirstRange());
				output('<p>fo<selection><$text bold=true>ob</$text></selection>ar</p>');

				setSelection([0, 3], [0, 3]);
				doc.batch().insert(doc.selection.getFirstPosition(), 'zzz');
				output('<p>fo<$text bold=true>o</$text>zzz<selection bold=true /><$text bold=true>b</$text>ar</p>');

				editor.execute('undo');
				output('<p>fo<$text bold=true>o<selection bold=true />b</$text>ar</p>');

				editor.execute('undo');
				output('<p>fo<selection>ob</selection>ar</p>');

				undoDisabled();
			});
		});

		describe('wrapping, unwrapping, merging, splitting', () => {
			it('wrap and undo', () => {
				input('fo<selection>zb</selection>ar');

				doc.batch().wrap(doc.selection.getFirstRange(), 'p');
				output('fo<p><selection>zb</selection></p>ar');

				editor.execute('undo');
				output('fo<selection>zb</selection>ar');

				undoDisabled();
			});

			//it( 'wrap, move and undo', () => {
			//	input( 'fo<selection>zb</selection>ar' );
			//
			//	doc.batch().wrap( doc.selection.getFirstRange(), 'p' );
			//	output( 'fo<p><selection>zb</selection></p>ar' );
			//
			//	setSelection( [ 2, 0 ], [ 2, 1 ] );
			//	doc.batch().move( doc.selection.getFirstRange(), new Position( root, [ 0 ] ) );
			//	output( '<selection>z</selection>fo<p>b</p>ar' );
			//
			//	editor.execute( 'undo' );
			//	output( 'fo<p><selection>z</selection>b</p>ar' );
			//
			//	// This test case fails here for unknown reason, but "z" letter magically disappears.
			//	// AssertionError: expected 'fo<selection>b</selection>ar' to equal 'fo<selection>zb</selection>ar'
			//	editor.execute( 'undo' );
			//	output( 'fo<selection>zb</selection>ar' );
			//
			//	undoDisabled();
			//} );

			it('unwrap and undo', () => {
				input('<p>foo<selection />bar</p>');

				doc.batch().unwrap(doc.selection.getFirstPosition().parent);
				output('foo<selection />bar');

				editor.execute('undo');
				output('<p>foo<selection />bar</p>');

				undoDisabled();
			});

			//it( 'merge and undo', () => {
			//	input( '<p>foo</p><p><selection />bar</p>' );
			//
			//	doc.batch().merge( new Position( root, [ 1 ] ) );
			//	// This test fails here because selection is stuck with <p> element and ends up in graveyard.
			//	// AssertionError: expected '<p>foobar</p>' to equal '<p>foo<selection />bar</p>'
			//	output( '<p>foo<selection />bar</p>' );
			//
			//	editor.execute( 'undo' );
			//	// This test fails because when selection is transformed it is first in empty <p> but when
			//	// "bar" is inserted, it gets moved to the right.
			//	// AssertionError: expected '<p>foo</p><p>bar<selection /></p>' to equal '<p>foo</p><p><selection />bar</p>'
			//	output( '<p>foo</p><p><selection />bar</p>' );
			//
			//	undoDisabled();
			//} );

			//it( 'split and undo', () => {
			//	input( '<p>foo<selection />bar</p>' );
			//
			//	doc.batch().split( doc.selection.getFirstPosition() );
			//	// This test fails because selection ends up in wrong node after splitting.
			//	// AssertionError: expected '<p>foo<selection /></p><p>bar</p>' to equal '<p>foo</p><p><selection />bar</p>'
			//	output( '<p>foo</p><p><selection />bar</p>' );
			//
			//	editor.execute( 'undo' );
			//	// This test fails because selection after transforming ends up after inserted test.
			//	// AssertionError: expected '<p>foobar<selection /></p>' to equal '<p>foo<selection />bar</p>'
			//	output( '<p>foo<selection />bar</p>' );
			//
			//	undoDisabled();
			//} );
		});

		describe('other edge cases', () => {
			//it( 'deleteContents between two nodes', () => {
			//	input( '<p>fo<selection>o</p><p>b</selection>ar</p>' );
			//
			//	deleteContents( doc.batch(), doc.selection, { merge: true } );
			//	output( '<p>fo<selection />ar</p>' );
			//
			//	// This test case fails because of OT problems.
			//	// When the batch is undone, first MergeDelta is reversed to SplitDelta and it is undone.
			//	// Then RemoveOperations are reversed to ReinsertOperation.
			//	// Unfortunately, ReinsertOperation that inserts "o" points to the same position were split happened.
			//	// Then, when ReinsertOperation is transformed by operations of SplitDelta, it ends up in wrong <p>.
			//	editor.execute( 'undo' );
			//	output( '<p>fo<selection>o</p><p>b</selection>ar</p>' );
			//} );
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
