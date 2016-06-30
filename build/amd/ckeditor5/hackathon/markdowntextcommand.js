define(['exports', '../command/command.js', '../engine/model/text.js', '../engine/model/range.js'], function (exports, _command, _text, _range) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _command2 = _interopRequireDefault(_command);

	var _text2 = _interopRequireDefault(_text);

	var _range2 = _interopRequireDefault(_range);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	const SAMPLE_TEXT = 'sample';

	class MarkdownTextCommand extends _command2.default {
		constructor(editor, attribute, delimiter) {
			super(editor);

			this.set('value', false);
			this.delimiter = delimiter;

			this.listenTo(this.editor.document.selection, 'change:attribute', () => {
				this.value = this.editor.document.selection.hasAttribute(attribute);
			});
		}

		_doExecute() {
			const doc = this.editor.document;
			const selection = doc.selection;

			if (selection.isCollapsed) {
				this._insertText(doc);
			} else {
				// TODO: Range selections.
			}
		}

		_insertText(doc) {
			doc.enqueueChanges(() => {
				const position = doc.selection.getFirstPosition();
				const batch = doc.batch();
				const text = new _text2.default(this.delimiter + SAMPLE_TEXT + this.delimiter);
				const delimiterSize = this.delimiter.length;

				batch.insert(position, text);

				const range = _range2.default.createFromParentsAndOffsets(position.parent, position.offset + delimiterSize, position.parent, position.offset + delimiterSize + SAMPLE_TEXT.length);

				doc.selection.setRanges([range]);
			});
		}
	}
	exports.default = MarkdownTextCommand;
});