define(['exports', '../feature.js', '../engine/model/treewalker.js', '../engine/model/position.js', '../engine/model/liveposition.js', '../engine/model/text.js'], function (exports, _feature, _treewalker, _position, _liveposition, _text) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _feature2 = _interopRequireDefault(_feature);

	var _treewalker2 = _interopRequireDefault(_treewalker);

	var _position2 = _interopRequireDefault(_position);

	var _liveposition2 = _interopRequireDefault(_liveposition);

	var _text2 = _interopRequireDefault(_text);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * Text transformations PoC.
  *
  * @extends ckeditor5.Feature
  */
	class TextTransformator extends _feature2.default {
		/**
   * @inheritdoc
   */
		constructor(...args) {
			super(...args);

			/**
    * Set of transformation definitions.
    *
    * @type {Map}
    */
			this.transformDefinitions = new Map();
			this.transformDefinitions.set('cke', new _text2.default('CKE'));
			this.transformDefinitions.set(':)', new _text2.default('\u263A'));
		}

		/**
   * @inheritdoc
   */
		init() {
			this.editor.document.on('change', (event, type, changes, batch) => {
				if (type != 'insert') {
					return;
				}

				for (let value of changes.range.getItems({ singleCharacters: true })) {
					let matched = this._matchChangeWithPatterns(_position2.default.createAfter(value), this.transformDefinitions);

					if (!matched.success) {
						continue;
					}

					const doc = this.editor.document;
					let livePos = _liveposition2.default.createFromPosition(matched.position);

					doc.enqueueChanges(() => {
						if (livePos.root != doc.graveyard && this._matchChangeWithPatterns(matched.position, this.transformDefinitions)) {
							for (let i = 0; i < matched.transformation[0].length; i++) {
								batch.remove(livePos.nodeBefore);
							}

							batch.insert(livePos, matched.transformation[1]);
						}
					});
				}
			});
		}

		/**
   * Iterate through the change range and match with transformation definitions.
   *
   * @param {Object} position
   * @param {Map} transformDefinitions
   * @returns {Object} matched definition data
   * @private
   */
		_matchChangeWithPatterns(position, transformDefinitions) {
			let matched = { position };

			for (let transformation of transformDefinitions) {
				const walker = new _treewalker2.default({
					singleCharacters: true,
					direction: 'BACKWARD',
					startPosition: matched.position
				});

				matched.success = true;

				let current = walker.next();
				let characters = transformation[0].split('');

				for (let i = characters.length - 1; i >= 0; i--) {
					if (current.done || current.value.item.character != characters[i]) {
						matched.success = false;
						break;
					}

					current = walker.next();
				}

				if (matched.success) {
					matched.transformation = transformation;
					break;
				}
			}

			if (!matched.success) {
				return { success: false };
			}

			return matched;
		}
	}
	exports.default = TextTransformator;
});