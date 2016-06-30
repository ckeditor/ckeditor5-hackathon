define('tests', ['/ckeditor5/engine/conversion/modelconversiondispatcher.js', '/ckeditor5/engine/model/document.js', '/ckeditor5/engine/model/text.js', '/ckeditor5/engine/model/element.js', '/ckeditor5/engine/model/range.js', '/ckeditor5/engine/model/position.js', '/ckeditor5/engine/model/operation/removeoperation.js'], function (_modelconversiondispatcher, _document, _text, _element, _range, _position, _removeoperation) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: conversion */

	'use strict';

	var _modelconversiondispatcher2 = _interopRequireDefault(_modelconversiondispatcher);

	var _document2 = _interopRequireDefault(_document);

	var _text2 = _interopRequireDefault(_text);

	var _element2 = _interopRequireDefault(_element);

	var _range2 = _interopRequireDefault(_range);

	var _position2 = _interopRequireDefault(_position);

	var _removeoperation2 = _interopRequireDefault(_removeoperation);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('ModelConversionDispatcher', () => {
		let dispatcher, doc, root;

		beforeEach(() => {
			dispatcher = new _modelconversiondispatcher2.default();
			doc = new _document2.default();
			root = doc.createRoot('root');
		});

		describe('constructor', () => {
			it('should create ModelConversionDispatcher with given api', () => {
				const apiObj = {};
				const dispatcher = new _modelconversiondispatcher2.default({ apiObj });

				expect(dispatcher.conversionApi.apiObj).to.equal(apiObj);
			});
		});

		describe('convertChange', () => {
			// We will do integration tests here. Unit tests will be done for methods that are used
			// by `convertChange` internally. This way we will have two kinds of tests.

			let image, imagePos;

			beforeEach(() => {
				image = new _element2.default('image');
				root.appendChildren([image, 'foobar']);

				imagePos = _position2.default.createBefore(image);

				dispatcher.listenTo(doc, 'change', (evt, type, changes) => {
					dispatcher.convertChange(type, changes);
				});
			});

			it('should fire insert and addAttribute callbacks for insertion changes', () => {
				const cbInsertText = sinon.spy();
				const cbInsertImage = sinon.spy();
				const cbAddAttribute = sinon.spy();

				dispatcher.on('insert:$text', cbInsertText);
				dispatcher.on('insert:image', cbInsertImage);
				dispatcher.on('addAttribute:key:$text', cbAddAttribute);

				const insertedText = new _text2.default('foo', { key: 'value' });
				doc.batch().insert(_position2.default.createFromParentAndOffset(root, 0), insertedText);

				expect(cbInsertText.called).to.be.true;
				expect(cbAddAttribute.called).to.be.true;
				expect(cbInsertImage.called).to.be.false;
			});

			it('should fire insert and addAttribute callbacks for reinsertion changes', () => {
				image.setAttribute('key', 'value');

				// We will just create reinsert operation by reverting remove operation
				// because creating reinsert change is tricky and not available through batch API.
				const removeOperation = new _removeoperation2.default(imagePos, 1, 0);

				// Let's apply remove operation so reinsert operation won't break.
				doc.applyOperation(removeOperation);

				const cbInsertText = sinon.spy();
				const cbInsertImage = sinon.spy();
				const cbAddAttribute = sinon.spy();

				dispatcher.on('insert:$text', cbInsertText);
				dispatcher.on('insert:image', cbInsertImage);
				dispatcher.on('addAttribute:key:image', cbAddAttribute);

				doc.applyOperation(removeOperation.getReversed());

				expect(cbInsertImage.called).to.be.true;
				expect(cbAddAttribute.called).to.be.true;
				expect(cbInsertText.called).to.be.false;
			});

			it('should fire move callback for move changes', () => {
				const cbMove = sinon.spy();

				dispatcher.on('move', cbMove);

				doc.batch().move(image, imagePos.getShiftedBy(3));

				expect(cbMove.called);
			});

			it('should fire remove callback for remove changes', () => {
				const cbRemove = sinon.spy();

				dispatcher.on('remove', cbRemove);

				doc.batch().remove(image);

				expect(cbRemove.called);
			});

			it('should fire addAttribute callbacks for add attribute change', () => {
				const cbAddText = sinon.spy();
				const cbAddImage = sinon.spy();

				dispatcher.on('addAttribute:key:$text', cbAddText);
				dispatcher.on('addAttribute:key:image', cbAddImage);

				doc.batch().setAttr('key', 'value', image);

				// Callback for adding attribute on text not called.
				expect(cbAddText.called).to.be.false;
				expect(cbAddImage.calledOnce).to.be.true;

				doc.batch().setAttr('key', 'value', _range2.default.createFromParentsAndOffsets(root, 3, root, 4));

				expect(cbAddText.calledOnce).to.be.true;
				// Callback for adding attribute on image not called this time.
				expect(cbAddImage.calledOnce).to.be.true;
			});

			it('should fire changeAttribute callbacks for change attribute change', () => {
				const cbChangeText = sinon.spy();
				const cbChangeImage = sinon.spy();

				dispatcher.on('changeAttribute:key:$text', cbChangeText);
				dispatcher.on('changeAttribute:key:image', cbChangeImage);

				doc.batch().setAttr('key', 'value', image).setAttr('key', 'newValue', image);

				// Callback for adding attribute on text not called.
				expect(cbChangeText.called).to.be.false;
				expect(cbChangeImage.calledOnce).to.be.true;

				const range = _range2.default.createFromParentsAndOffsets(root, 3, root, 4);
				doc.batch().setAttr('key', 'value', range).setAttr('key', 'newValue', range);

				expect(cbChangeText.calledOnce).to.be.true;
				// Callback for adding attribute on image not called this time.
				expect(cbChangeImage.calledOnce).to.be.true;
			});

			it('should fire removeAttribute callbacks for remove attribute change', () => {
				const cbRemoveText = sinon.spy();
				const cbRemoveImage = sinon.spy();

				dispatcher.on('removeAttribute:key:$text', cbRemoveText);
				dispatcher.on('removeAttribute:key:image', cbRemoveImage);

				doc.batch().setAttr('key', 'value', image).removeAttr('key', image);

				// Callback for adding attribute on text not called.
				expect(cbRemoveText.called).to.be.false;
				expect(cbRemoveImage.calledOnce).to.be.true;

				const range = _range2.default.createFromParentsAndOffsets(root, 3, root, 4);
				doc.batch().setAttr('key', 'value', range).removeAttr('key', range);

				expect(cbRemoveText.calledOnce).to.be.true;
				// Callback for adding attribute on image not called this time.
				expect(cbRemoveImage.calledOnce).to.be.true;
			});

			it('should not fire any event if not recognized event type was passed', () => {
				sinon.spy(dispatcher, 'fire');

				dispatcher.convertChange('unknown', { foo: 'bar' });

				expect(dispatcher.fire.called).to.be.false;
			});

			it('should not fire any event if change was in graveyard root and change type is different than remove', () => {
				sinon.spy(dispatcher, 'fire');

				let gyNode = new _element2.default('image');
				doc.graveyard.appendChildren(gyNode);

				doc.batch().setAttr('key', 'value', gyNode);

				expect(dispatcher.fire.called).to.be.false;
			});
		});

		describe('convertInsert', () => {
			it('should fire event with correct parameters for every item in passed range', () => {
				root.appendChildren([new _text2.default('foo', { bold: true }), new _element2.default('image'), 'bar', new _element2.default('paragraph', { class: 'nice' }, new _text2.default('xx', { italic: true }))]);

				const range = _range2.default.createFromElement(root);
				const loggedEvents = [];

				// We will check everything connected with insert event:
				dispatcher.on('insert', (evt, data, consumable) => {
					// Check if the item is correct.
					const itemId = data.item.name ? data.item.name : '$text:' + data.item.text;
					// Check if the range is correct.
					const log = 'insert:' + itemId + ':' + data.range.start.path + ':' + data.range.end.path;

					loggedEvents.push(log);

					// Check if the event name is correct.
					expect(evt.name).to.equal('insert:' + (data.item.name || '$text'));
					// Check if model consumable is correct.
					expect(consumable.consume(data.item, 'insert')).to.be.true;
				});

				// Same here.
				dispatcher.on('addAttribute', (evt, data, consumable) => {
					const itemId = data.item.name ? data.item.name : '$text:' + data.item.text;
					const key = data.attributeKey;
					const value = data.attributeNewValue;
					const log = 'addAttribute:' + key + ':' + value + ':' + itemId + ':' + data.range.start.path + ':' + data.range.end.path;

					loggedEvents.push(log);

					expect(evt.name).to.equal('addAttribute:' + key + ':' + (data.item.name || '$text'));
					expect(consumable.consume(data.item, 'addAttribute:' + key)).to.be.true;
				});

				dispatcher.convertInsert(range);

				// Check the data passed to called events and the order of them.
				expect(loggedEvents).to.deep.equal(['insert:$text:foo:0:3', 'addAttribute:bold:true:$text:foo:0:3', 'insert:image:3:4', 'insert:$text:bar:4:7', 'insert:paragraph:7:8', 'addAttribute:class:nice:paragraph:7:8', 'insert:$text:xx:7,0:7,2', 'addAttribute:italic:true:$text:xx:7,0:7,2']);
			});

			it('should not fire events for already consumed parts of model', () => {
				root.appendChildren([new _element2.default('image', { src: 'foo.jpg', title: 'bar', bold: true }, new _element2.default('caption', {}, 'title'))]);

				sinon.spy(dispatcher, 'fire');

				dispatcher.on('insert:image', (evt, data, consumable) => {
					consumable.consume(data.item.getChild(0), 'insert');
					consumable.consume(data.item, 'addAttribute:bold');
				});

				const range = _range2.default.createFromElement(root);

				dispatcher.convertInsert(range);

				expect(dispatcher.fire.calledWith('insert:image')).to.be.true;
				expect(dispatcher.fire.calledWith('addAttribute:src:image')).to.be.true;
				expect(dispatcher.fire.calledWith('addAttribute:title:image')).to.be.true;
				expect(dispatcher.fire.calledWith('insert:$text')).to.be.true;

				expect(dispatcher.fire.calledWith('addAttribute:bold:image')).to.be.false;
				expect(dispatcher.fire.calledWith('insert:caption')).to.be.false;
			});
		});

		describe('convertMove', () => {
			it('should fire single event for moved range', () => {
				root.appendChildren('barfoo');

				const range = _range2.default.createFromParentsAndOffsets(root, 0, root, 3);
				const loggedEvents = [];

				dispatcher.on('move', (evt, data) => {
					const log = 'move:' + data.sourcePosition.path + ':' + data.range.start.path + ':' + data.range.end.path;
					loggedEvents.push(log);
				});

				dispatcher.convertMove(_position2.default.createFromParentAndOffset(root, 3), range);

				expect(loggedEvents).to.deep.equal(['move:3:0:3']);
			});
		});

		describe('convertRemove', () => {
			it('should fire single event for removed range', () => {
				root.appendChildren('foo');
				doc.graveyard.appendChildren('bar');

				const range = _range2.default.createFromParentsAndOffsets(doc.graveyard, 0, doc.graveyard, 3);
				const loggedEvents = [];

				dispatcher.on('remove', (evt, data) => {
					const log = 'remove:' + data.sourcePosition.path + ':' + data.range.start.path + ':' + data.range.end.path;
					loggedEvents.push(log);
				});

				dispatcher.convertRemove(_position2.default.createFromParentAndOffset(root, 3), range);

				expect(loggedEvents).to.deep.equal(['remove:3:0:3']);
			});
		});

		describe('convertAttribute', () => {
			it('should fire event for every item in passed range', () => {
				root.appendChildren([new _text2.default('foo', { bold: true }), new _element2.default('image', { bold: true }), new _element2.default('paragraph', { bold: true, class: 'nice' }, new _text2.default('xx', { bold: true, italic: true }))]);

				const range = _range2.default.createFromElement(root);
				const loggedEvents = [];

				dispatcher.on('addAttribute', (evt, data, consumable) => {
					const itemId = data.item.name ? data.item.name : '$text:' + data.item.text;
					const key = data.attributeKey;
					const value = data.attributeNewValue;
					const log = 'addAttribute:' + key + ':' + value + ':' + itemId + ':' + data.range.start.path + ':' + data.range.end.path;

					loggedEvents.push(log);

					expect(evt.name).to.equal('addAttribute:' + key + ':' + (data.item.name || '$text'));
					expect(consumable.consume(data.item, 'addAttribute:' + key)).to.be.true;
				});

				dispatcher.convertAttribute('addAttribute', range, 'bold', null, true);

				expect(loggedEvents).to.deep.equal(['addAttribute:bold:true:$text:foo:0:3', 'addAttribute:bold:true:image:3:4', 'addAttribute:bold:true:paragraph:4:5', 'addAttribute:bold:true:$text:xx:4,0:4,2']);
			});

			it('should not fire events for already consumed parts of model', () => {
				root.appendChildren([new _element2.default('element', null, new _element2.default('inside'))]);

				sinon.spy(dispatcher, 'fire');

				dispatcher.on('removeAttribute:attr:element', (evt, data, consumable) => {
					consumable.consume(data.item.getChild(0), 'removeAttribute:attr');
				});

				const range = _range2.default.createFromElement(root);

				dispatcher.convertAttribute('removeAttribute', range, 'attr', 'value', null);

				expect(dispatcher.fire.calledWith('removeAttribute:attr:element')).to.be.true;
				expect(dispatcher.fire.calledWith('removeAttribute:attr:inside')).to.be.false;
			});
		});

		describe('convertSelection', () => {
			beforeEach(() => {
				dispatcher.off('selection');

				root.appendChildren('foobar');
				doc.selection.setRanges([new _range2.default(new _position2.default(root, [1]), new _position2.default(root, [3])), new _range2.default(new _position2.default(root, [4]), new _position2.default(root, [5]))]);
			});

			it('should fire selection event', () => {
				sinon.spy(dispatcher, 'fire');

				dispatcher.convertSelection(doc.selection);

				expect(dispatcher.fire.calledWith('selection', { selection: sinon.match.instanceOf(doc.selection.constructor) })).to.be.true;
			});

			it('should prepare correct list of consumable values', () => {
				doc.enqueueChanges(() => {
					doc.batch().setAttr('bold', true, _range2.default.createFromElement(root)).setAttr('italic', true, _range2.default.createFromParentsAndOffsets(root, 4, root, 5));
				});

				dispatcher.on('selection', (evt, data, consumable) => {
					expect(consumable.test(data.selection, 'selection')).to.be.true;
					expect(consumable.test(data.selection, 'selectionAttribute:bold')).to.be.true;
					expect(consumable.test(data.selection, 'selectionAttribute:italic')).to.be.null;
				});

				dispatcher.convertSelection(doc.selection);
			});

			it('should fire attributes events for selection', () => {
				sinon.spy(dispatcher, 'fire');

				doc.enqueueChanges(() => {
					doc.batch().setAttr('bold', true, _range2.default.createFromElement(root)).setAttr('italic', true, _range2.default.createFromParentsAndOffsets(root, 4, root, 5));
				});

				dispatcher.convertSelection(doc.selection);

				expect(dispatcher.fire.calledWith('selectionAttribute:bold')).to.be.true;
				expect(dispatcher.fire.calledWith('selectionAttribute:italic')).to.be.false;
			});

			it('should not fire attributes events if attribute has been consumed', () => {
				sinon.spy(dispatcher, 'fire');

				dispatcher.on('selection', (evt, data, consumable) => {
					consumable.consume(data.selection, 'selectionAttribute:bold');
				});

				doc.enqueueChanges(() => {
					doc.batch().setAttr('bold', true, _range2.default.createFromElement(root)).setAttr('italic', true, _range2.default.createFromParentsAndOffsets(root, 4, root, 5));
				});

				dispatcher.convertSelection(doc.selection);

				expect(dispatcher.fire.calledWith('selectionAttribute:bold')).to.be.false;
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
