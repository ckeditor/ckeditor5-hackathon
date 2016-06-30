define(['exports', '../feature.js', '../engine/model/treewalker.js', '../engine/model/position.js', '../engine/model/range.js', '../engine/model/liveposition.js'], function (exports, _feature, _treewalker, _position, _range, _liveposition) {
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

	var _range2 = _interopRequireDefault(_range);

	var _liveposition2 = _interopRequireDefault(_liveposition);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

	/**
  * Auto linking PoC.
  *
  * @extends ckeditor5.Feature
  */
	class AutoLinker extends _feature2.default {
		/**
   * @inheritdoc
   */
		init() {
			this.editor.document.on('change', (event, type, changes, batch) => {
				if (type != 'insert') {
					return;
				}

				for (let value of changes.range.getItems({ singleCharacters: true })) {
					const walker = new _treewalker2.default({
						direction: 'BACKWARD',
						startPosition: _position2.default.createAfter(value)
					});

					const currentValue = walker.next().value;
					const text = currentValue.item.text;

					if (!text) {
						return;
					}

					let matchedUrl = urlRegex.exec(text);

					if (!matchedUrl) {
						return;
					}

					const doc = this.editor.document;
					const url = matchedUrl[0];
					const offset = _getLastPathPart(currentValue.nextPosition.path) + matchedUrl.index;
					const livePos = _liveposition2.default.createFromParentAndOffset(currentValue.item.commonParent, offset);

					doc.enqueueChanges(() => {
						const urlRange = _range2.default.createFromPositionAndShift(livePos, url.length);
						batch.setAttr('link', url, urlRange);
					});
				}
			});
		}
	}

	exports.default = AutoLinker;
	function _getLastPathPart(path) {
		return path[path.length - 1];
	}
});