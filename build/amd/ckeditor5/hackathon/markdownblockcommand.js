define(['exports', '../command/command.js', '../engine/model/range.js', '../engine/model/position.js', './markdown.js'], function (exports, _command, _range, _position, _markdown) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _command2 = _interopRequireDefault(_command);

	var _range2 = _interopRequireDefault(_range);

	var _position2 = _interopRequireDefault(_position);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	class MarkdownBlockCommand extends _command2.default {
		constructor(editor, blockName, delimiter) {
			super(editor);

			const selection = this.editor.document.selection;
			this.delimiter = delimiter;
			this.set('value', false);

			this.listenTo(selection, 'change:attribute', () => {
				const block = (0, _markdown.findTopmostBlock)(selection.getFirstPosition());
				this.value = block.name === blockName;
			});
		}

		_doExecute() {
			const doc = this.editor.document;
			const selection = doc.selection;
			const remove = this.value;

			if (selection.isCollapsed) {
				doc.enqueueChanges(() => {
					const position = selection.getFirstPosition();
					const block = (0, _markdown.findTopmostBlock)(position);
					const batch = doc.batch();

					const text = block.getText();
					// TODO: Remove ardcoded headers.
					const regexp = /^#{1,3}\s/;
					const matched = regexp.exec(text);

					if (matched !== null) {
						batch.remove(_range2.default.createFromParentsAndOffsets(block, 0, block, matched[0].length));
					}
				});

				doc.enqueueChanges(() => {
					const batch = doc.batch();
					const position = selection.getFirstPosition();
					const block = (0, _markdown.findTopmostBlock)(position);

					if (!remove) {
						batch.insert(_position2.default.createFromParentAndOffset(block, 0), this.delimiter);
					}
				});
			}
		}
	}
	exports.default = MarkdownBlockCommand;
});