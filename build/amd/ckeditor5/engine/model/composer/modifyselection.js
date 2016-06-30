define(['exports', '../position.js', '../treewalker.js', '../range.js'], function (exports, _position, _treewalker, _range) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = modifySelection;

	var _position2 = _interopRequireDefault(_position);

	var _treewalker2 = _interopRequireDefault(_treewalker);

	var _range2 = _interopRequireDefault(_range);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * Modifies the selection. Currently the supported modifications are:
  *
  * * Extending. The selection focus is moved in the specified `options.direction` with a step specified in `options.unit`
  * (defaults to `'CHARACTER'`, other values are not not yet supported).
  * Note: if you extend a forward selection in a backward direction you will in fact shrink it.
  *
  * @method engine.model.composer.modifySelection
  * @param {engine.model.Selection} The selection to modify.
  * @param {Object} [options]
  * @param {'FORWARD'|'BACKWARD'} [options.direction='FORWARD'] The direction in which the selection should be modified.
  */
	function modifySelection(selection, options = {}) {
		const isForward = options.direction != 'BACKWARD';

		const focus = selection.focus;
		const walker = new _treewalker2.default({
			boundaries: getSearchRange(focus, isForward),
			singleCharacters: true,
			direction: isForward ? 'FORWARD' : 'BACKWARD'
		});

		let next = walker.next();

		// 1. Nothing to do here.
		if (next.done) {
			return;
		}

		let value = next.value;

		// 2. Consume next character.
		if (value.type == 'CHARACTER') {
			selection.setFocus(value.nextPosition);

			return;
		}

		// 3. We're entering an element, so let's consume it fully.
		if (value.type == (isForward ? 'ELEMENT_START' : 'ELEMENT_END')) {
			selection.setFocus(value.item, isForward ? 'AFTER' : 'BEFORE');

			return;
		}

		// 4. We're leaving an element. That's more tricky.
		next = walker.next();

		// 4.1. Nothing left, so let's stay where we were.
		if (next.done) {
			return;
		}

		// Replace TreeWalker step wrapper by clean step value.
		value = next.value;

		// 4.2. Character found after element end. Not really a valid case in our data model, but let's
		// do something sensible and put the selection focus before that character.
		if (value.type == 'CHARACTER') {
			selection.setFocus(value.previousPosition);
		}
		// 4.3. OK, we're entering a new element. So let's place there the focus.
		else {
				selection.setFocus(value.item, isForward ? 0 : 'END');
			}
	}

	function getSearchRange(start, isForward) {
		const root = start.root;
		const searchEnd = _position2.default.createAt(root, isForward ? 'END' : 0);

		if (isForward) {
			return new _range2.default(start, searchEnd);
		} else {
			return new _range2.default(searchEnd, start);
		}
	}
});