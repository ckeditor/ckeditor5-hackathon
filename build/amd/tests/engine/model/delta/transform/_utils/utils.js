define(['exports', '/ckeditor5/engine/model/document.js', '/ckeditor5/engine/model/element.js', '/ckeditor5/engine/model/position.js', '/ckeditor5/engine/model/range.js', '/ckeditor5/engine/model/delta/attributedelta.js', '/ckeditor5/engine/model/delta/insertdelta.js', '/ckeditor5/engine/model/delta/weakinsertdelta.js', '/ckeditor5/engine/model/delta/removedelta.js', '/ckeditor5/engine/model/delta/movedelta.js', '/ckeditor5/engine/model/delta/mergedelta.js', '/ckeditor5/engine/model/delta/splitdelta.js', '/ckeditor5/engine/model/delta/wrapdelta.js', '/ckeditor5/engine/model/delta/unwrapdelta.js', '/ckeditor5/engine/model/operation/attributeoperation.js', '/ckeditor5/engine/model/operation/insertoperation.js', '/ckeditor5/engine/model/operation/moveoperation.js', '/ckeditor5/engine/model/operation/removeoperation.js'], function (exports, _document, _element, _position, _range, _attributedelta, _insertdelta, _weakinsertdelta, _removedelta, _movedelta, _mergedelta, _splitdelta, _wrapdelta, _unwrapdelta, _attributeoperation, _insertoperation, _moveoperation, _removeoperation) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: model, operation */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.getAttributeDelta = getAttributeDelta;
	exports.getInsertDelta = getInsertDelta;
	exports.getWeakInsertDelta = getWeakInsertDelta;
	exports.getMergeDelta = getMergeDelta;
	exports.getMoveDelta = getMoveDelta;
	exports.getRemoveDelta = getRemoveDelta;
	exports.getSplitDelta = getSplitDelta;
	exports.getWrapDelta = getWrapDelta;
	exports.getUnwrapDelta = getUnwrapDelta;
	exports.expectDelta = expectDelta;
	exports.expectOperation = expectOperation;
	exports.applyDelta = applyDelta;
	exports.getFilledDocument = getFilledDocument;

	var _document2 = _interopRequireDefault(_document);

	var _element2 = _interopRequireDefault(_element);

	var _position2 = _interopRequireDefault(_position);

	var _range2 = _interopRequireDefault(_range);

	var _attributedelta2 = _interopRequireDefault(_attributedelta);

	var _insertdelta2 = _interopRequireDefault(_insertdelta);

	var _weakinsertdelta2 = _interopRequireDefault(_weakinsertdelta);

	var _removedelta2 = _interopRequireDefault(_removedelta);

	var _movedelta2 = _interopRequireDefault(_movedelta);

	var _mergedelta2 = _interopRequireDefault(_mergedelta);

	var _splitdelta2 = _interopRequireDefault(_splitdelta);

	var _wrapdelta2 = _interopRequireDefault(_wrapdelta);

	var _unwrapdelta2 = _interopRequireDefault(_unwrapdelta);

	var _attributeoperation2 = _interopRequireDefault(_attributeoperation);

	var _insertoperation2 = _interopRequireDefault(_insertoperation);

	var _moveoperation2 = _interopRequireDefault(_moveoperation);

	var _removeoperation2 = _interopRequireDefault(_removeoperation);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function getAttributeDelta(range, key, oldValue, newValue, version) {
		let delta = new _attributedelta2.default();
		delta.addOperation(new _attributeoperation2.default(range, key, oldValue, newValue, version));

		return delta;
	}

	function getInsertDelta(position, nodes, version) {
		let delta = new _insertdelta2.default();
		delta.addOperation(new _insertoperation2.default(position, nodes, version));

		return delta;
	}

	function getWeakInsertDelta(position, nodes, version) {
		let delta = new _weakinsertdelta2.default();
		delta.addOperation(new _insertoperation2.default(position, nodes, version));

		return delta;
	}

	function getMergeDelta(position, howManyInPrev, howManyInNext, version) {
		let delta = new _mergedelta2.default();

		let sourcePosition = _position2.default.createFromPosition(position);
		sourcePosition.path.push(0);

		let targetPosition = _position2.default.createFromPosition(position);
		targetPosition.offset--;
		targetPosition.path.push(howManyInPrev);

		let move = new _moveoperation2.default(sourcePosition, howManyInNext, targetPosition, version);
		move.isSticky = true;

		delta.addOperation(move);
		delta.addOperation(new _removeoperation2.default(position, 1, version + 1));

		return delta;
	}

	function getMoveDelta(sourcePosition, howMany, targetPosition, baseVersion) {
		let delta = new _movedelta2.default();

		let move = new _moveoperation2.default(sourcePosition, howMany, targetPosition, baseVersion);
		delta.addOperation(move);

		return delta;
	}

	function getRemoveDelta(sourcePosition, howMany, baseVersion) {
		let delta = new _removedelta2.default();

		let remove = new _removeoperation2.default(sourcePosition, howMany, baseVersion);
		delta.addOperation(remove);

		return delta;
	}

	function getSplitDelta(position, nodeCopy, howManyMove, version) {
		let delta = new _splitdelta2.default();

		let insertPosition = _position2.default.createFromPosition(position);
		insertPosition.path = insertPosition.getParentPath();
		insertPosition.offset++;

		let targetPosition = _position2.default.createFromPosition(insertPosition);
		targetPosition.path.push(0);

		delta.addOperation(new _insertoperation2.default(insertPosition, [nodeCopy], version));

		let move = new _moveoperation2.default(position, howManyMove, targetPosition, version + 1);
		move.isSticky = true;

		delta.addOperation(move);

		return delta;
	}

	function getWrapDelta(range, element, version) {
		let delta = new _wrapdelta2.default();

		let insert = new _insertoperation2.default(range.end, element, version);

		let targetPosition = _position2.default.createFromPosition(range.end);
		targetPosition.path.push(0);
		let move = new _moveoperation2.default(range.start, range.end.offset - range.start.offset, targetPosition, version + 1);

		delta.addOperation(insert);
		delta.addOperation(move);

		return delta;
	}

	function getUnwrapDelta(positionBefore, howManyChildren, version) {
		let delta = new _unwrapdelta2.default();

		let sourcePosition = _position2.default.createFromPosition(positionBefore);
		sourcePosition.path.push(0);

		let move = new _moveoperation2.default(sourcePosition, howManyChildren, positionBefore, version);
		move.isSticky = true;

		let removePosition = _position2.default.createFromPosition(positionBefore);
		removePosition.offset += howManyChildren;

		let remove = new _removeoperation2.default(removePosition, 1, version + 1);

		delta.addOperation(move);
		delta.addOperation(remove);

		return delta;
	}

	function expectDelta(delta, expected) {
		expect(delta).to.be.instanceof(expected.type);
		expect(delta.operations.length).to.equal(expected.operations.length);

		for (let i = 0; i < delta.operations.length; i++) {
			expectOperation(delta.operations[i], expected.operations[i]);
		}
	}

	function expectOperation(op, params) {
		for (let i in params) {
			if (i == 'type') {
				expect(op).to.be.instanceof(params[i]);
			} else if (i == 'nodes') {
				expect(op.nodeList._nodes).to.deep.equal(params[i]);
			} else if (params[i] instanceof _position2.default || params[i] instanceof _range2.default) {
				expect(op[i].isEqual(params[i])).to.be.true;
			} else {
				expect(op[i]).to.equal(params[i]);
			}
		}
	}

	function applyDelta(delta, document) {
		for (let op of delta.operations) {
			document.applyOperation(op);
		}
	}

	function getFilledDocument() {
		const doc = new _document2.default();
		const root = doc.createRoot('root');

		root.insertChildren(0, [new _element2.default('x'), new _element2.default('x'), new _element2.default('x', [], 'a'), new _element2.default('div', [], [new _element2.default('x'), new _element2.default('x'), new _element2.default('x', [], 'a'), new _element2.default('div', [], [new _element2.default('x'), new _element2.default('x'), new _element2.default('x', [], 'abcd'), new _element2.default('p', [], 'abcfoobarxyz')])])]);

		return doc;
	}
});