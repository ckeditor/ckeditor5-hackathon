define(['exports', '../feature.js', '../undo/undo.js', '../engine/model/delta/attributedelta.js', '../engine/model/delta/insertdelta.js', '../engine/model/delta/mergedelta.js', '../engine/model/delta/movedelta.js', '../engine/model/delta/removedelta.js', '../engine/model/delta/renamedelta.js', '../engine/model/delta/splitdelta.js', '../engine/model/delta/unwrapdelta.js', '../engine/model/delta/weakinsertdelta.js', '../engine/model/delta/wrapdelta.js', '../engine/model/operation/insertoperation.js', '../engine/model/operation/removeoperation.js', '../engine/model/operation/moveoperation.js', '../engine/model/operation/attributeoperation.js', '../engine/model/range.js', '../engine/view/range.js', '../engine/view/attributeelement.js', '../engine/view/containerelement.js'], function (exports, _feature, _undo, _attributedelta, _insertdelta, _mergedelta, _movedelta, _removedelta, _renamedelta, _splitdelta, _unwrapdelta, _weakinsertdelta, _wrapdelta, _insertoperation, _removeoperation, _moveoperation, _attributeoperation, _range, _range3, _attributeelement, _containerelement) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _feature2 = _interopRequireDefault(_feature);

	var _undo2 = _interopRequireDefault(_undo);

	var _attributedelta2 = _interopRequireDefault(_attributedelta);

	var _insertdelta2 = _interopRequireDefault(_insertdelta);

	var _mergedelta2 = _interopRequireDefault(_mergedelta);

	var _movedelta2 = _interopRequireDefault(_movedelta);

	var _removedelta2 = _interopRequireDefault(_removedelta);

	var _renamedelta2 = _interopRequireDefault(_renamedelta);

	var _splitdelta2 = _interopRequireDefault(_splitdelta);

	var _unwrapdelta2 = _interopRequireDefault(_unwrapdelta);

	var _weakinsertdelta2 = _interopRequireDefault(_weakinsertdelta);

	var _wrapdelta2 = _interopRequireDefault(_wrapdelta);

	var _insertoperation2 = _interopRequireDefault(_insertoperation);

	var _removeoperation2 = _interopRequireDefault(_removeoperation);

	var _moveoperation2 = _interopRequireDefault(_moveoperation);

	var _attributeoperation2 = _interopRequireDefault(_attributeoperation);

	var _range2 = _interopRequireDefault(_range);

	var _range4 = _interopRequireDefault(_range3);

	var _attributeelement2 = _interopRequireDefault(_attributeelement);

	var _containerelement2 = _interopRequireDefault(_containerelement);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	class SelectiveUndo extends _feature2.default {
		static get requires() {
			return [_undo2.default];
		}

		/**
   * @inheritDoc
   */
		init() {
			this.previewedItem = null;
			this.previewElements = [];
			this.items = [];
			this.uiHolder = this._initUi();

			window.document.body.appendChild(this.uiHolder);

			const undo = this.editor.commands.get('undo');

			this.listenTo(this.editor.document, 'change', (evt, type, data, batch) => {
				if (batch.type == 'undo' || batch.type == 'ignore') {
					return;
				}

				const item = this._getItem(batch);

				if (item) {
					this._updateItem(item, type, data, batch);
				} else {
					this._addItem(type, data, batch);
				}
			});

			this.listenTo(this.editor.document, 'change', (evt, type, data, batch) => {
				if (this.previewedItem != null) {
					this._closePreview();
				}
			}, 0);

			this.listenTo(this.editor.document, 'change', (evt, type, data, batch) => {
				if (this.previewedItem != null) {
					this._previewItem(this.previewedItem);
				}
			}, 9999);

			this.listenTo(undo, 'revert', (evt, batch) => {
				this._removeItem(batch);
			});
		}

		_getItem(batch) {
			for (let item of this.items) {
				if (item.batch == batch) {
					return item;
				}
			}

			return null;
		}

		_addItem(type, data, batch) {
			const item = {};

			item.id = this.items.length + 1;
			item.batch = batch;

			item.ui = window.document.createElement('div');
			item.ui.className = 'ck-editor__selective-undo__item';
			item.ui.innerHTML = this._getBatchDescription(batch, item.id);

			item.ui.addEventListener('click', () => {
				this._revertItem(item);
			});

			item.ui.addEventListener('mouseenter', () => {
				this._previewItem(item);
				this.previewedItem = item;
			});

			item.ui.addEventListener('mouseleave', () => {
				this._closePreview();
				this.previewedItem = null;
			});

			this.uiHolder.appendChild(item.ui);

			this.items.push(item);
		}

		_updateItem(item, type, data, batch) {
			item.ui.innerHTML = this._getBatchDescription(batch, item.id);
		}

		_removeItem(batch) {
			const item = this._getItem(batch);

			if (item) {
				this.uiHolder.removeChild(item.ui);
			}
		}

		_revertItem(item) {
			this._closePreview();
			this.previewedItem = null;
			this.editor.execute('undo', item.batch);
		}

		_previewItem(item) {
			let ranges = [];

			for (let delta of item.batch.deltas) {
				for (let operation of delta.operations) {
					let baseVersion = operation.baseVersion;
					let deltaVersion = delta.baseVersion;

					if (delta instanceof _insertdelta2.default && operation instanceof _insertoperation2.default) {
						ranges.push({
							baseVersion,
							deltaVersion,
							range: _range2.default.createFromPositionAndShift(operation.position, operation.nodeList.length)
						});
					} else if (delta instanceof _removedelta2.default && operation instanceof _removeoperation2.default) {
						ranges.push({
							baseVersion,
							deltaVersion,
							range: _range2.default.createFromPositionAndShift(operation.sourcePosition, 0)
						});
					} else if (delta instanceof _splitdelta2.default && operation instanceof _moveoperation2.default) {
						ranges.push({
							baseVersion,
							deltaVersion,
							range: _range2.default.createFromPositionAndShift(operation.sourcePosition, 0)
						});
					} else if (delta instanceof _mergedelta2.default && operation instanceof _moveoperation2.default) {
						ranges.push({
							baseVersion,
							deltaVersion,
							range: _range2.default.createFromPositionAndShift(operation.movedRangeStart, 0)
						});
					} else if (delta instanceof _movedelta2.default && operation instanceof _moveoperation2.default) {
						ranges.push({
							baseVersion,
							deltaVersion,
							range: _range2.default.createFromPositionAndShift(operation.movedRangeStart, operation.howMany)
						});

						ranges.push({
							baseVersion,
							deltaVersion,
							range: _range2.default.createFromPositionAndShift(operation.sourcePosition, 0)
						});
					} else if (delta instanceof _attributedelta2.default && operation instanceof _attributeoperation2.default) {
						ranges.push({
							baseVersion,
							deltaVersion,
							range: _range2.default.createFromRange(operation.range)
						});
					}
				}
			}

			let transformedRanges = convertRanges(ranges, this.editor.document.history);
			const mapper = this.editor.editing.mapper;
			const writer = this.editor.editing.view.writer;

			for (let range of transformedRanges) {
				if (range.start.root.rootName == '$graveyard') {
					continue;
				}

				if (range.isEmpty) {
					let viewPos = mapper.toViewPosition(range.start);
					let viewElement = new _containerelement2.default('span', { 'class': 'selective-undo-pointer' });
					writer.insert(viewPos, viewElement);

					this.previewElements.push({
						type: 'pointer',
						position: viewPos,
						element: viewElement
					});
				} else {
					let viewRange = mapper.toViewRange(range);
					let viewElement = new _attributeelement2.default('span', { 'class': 'selective-undo-range' });
					let newRange = writer.wrap(viewRange, viewElement);

					this.previewElements.push({
						type: 'range',
						range: newRange,
						element: viewElement
					});
				}

				this.editor.editing.modelToView.convertSelection(this.editor.document.selection);
				this.editor.editing.view.render();
			}
		}

		_closePreview() {
			const writer = this.editor.editing.view.writer;

			for (let item of this.previewElements.reverse()) {
				if (item.type == 'pointer') {
					let index = item.element.getIndex();
					let viewRange = _range4.default.createFromParentsAndOffsets(item.element.parent, index, item.element.parent, index + 1);
					writer.remove(viewRange);
				} else {
					let parent = item.range.start.parent;
					let newRange = _range4.default.createFromParentsAndOffsets(parent, 0, parent, parent.getChildCount());
					writer.unwrap(newRange, item.element);
				}

				this.editor.editing.modelToView.convertSelection(this.editor.document.selection);
				this.editor.editing.view.render();
			}

			this.previewElements = [];
		}

		_getBatchDescription(batch, id) {
			let lastDelta = null;
			let description = 'Batch #' + id;

			for (let delta of batch.deltas) {
				if (delta instanceof _attributedelta2.default) {
					description += '<br />Change attribute <strong>' + delta.key + '</strong> to <strong>' + delta.value + '</strong>';
				} else if (delta instanceof _weakinsertdelta2.default) {
					if (!(lastDelta instanceof _weakinsertdelta2.default)) {
						description += '<br />Write/insert text: ';
					}

					for (let operation of delta.operations) {
						for (let item of operation.nodeList) {
							description += item.name || item.character;
						}
					}
				} else if (delta instanceof _insertdelta2.default) {
					if (!(lastDelta instanceof _insertdelta2.default)) {
						description += '<br />Insert: ';
					}

					for (let operation of delta.operations) {
						for (let item of operation.nodeList) {
							description += item.name || item.character;
						}
					}
				} else if (delta instanceof _mergedelta2.default) {
					description += '<br />Merge elements';
				} else if (delta instanceof _removedelta2.default) {
					description += '<br />Remove elements';
				} else if (delta instanceof _movedelta2.default) {
					description += '<br />Move elements';
				} else if (delta instanceof _renamedelta2.default) {
					description += '<br />Change element name';
				} else if (delta instanceof _splitdelta2.default) {
					description += '<br />Split element';
				} else if (delta instanceof _unwrapdelta2.default) {
					description += '<br />Unwrap element contents';
				} else if (delta instanceof _wrapdelta2.default) {
					description += '<br />Wrap element contents';
				}

				lastDelta = delta;
			}

			return description;
		}

		_initUi() {
			const element = window.document.createElement('div');
			element.className = 'ck-editor__selective-undo';

			return element;
		}
	}

	exports.default = SelectiveUndo;
	function convertRanges(ranges, history) {
		let transformedRanges = [];

		for (let item of ranges) {
			let range = item.range;
			let baseVersion = item.baseVersion;
			let deltaVersion = item.deltaVersion;
			let transformed = [range];

			for (let historyItem of history.getHistoryItems(deltaVersion)) {
				let delta = historyItem.delta;

				for (let operation of delta.operations) {
					if (operation.baseVersion <= baseVersion) {
						continue;
					}

					for (let i = 0; i < transformed.length; i++) {
						let result;

						switch (operation.type) {
							case 'insert':
								result = transformed[i].getTransformedByInsertion(operation.position, operation.nodeList.length, true);
								break;

							case 'move':
							case 'remove':
							case 'reinsert':
								result = transformed[i].getTransformedByMove(operation.sourcePosition, operation.targetPosition, operation.howMany, true);
								break;
						}

						if (result) {
							transformed.splice(i, 1, ...result);

							i = i + result.length - 1;
						}
					}
				}
			}

			transformedRanges = transformedRanges.concat(transformed);
		}

		transformedRanges.sort((a, b) => a.start.isBefore(b.start) ? -1 : 1);

		for (let i = 1; i < transformedRanges.length; i++) {
			let a = transformedRanges[i - 1];
			let b = transformedRanges[i];

			if (a.end.isTouching(b.start)) {
				a.end = b.end;
				transformedRanges.splice(i, 1);
				i--;
			}
		}

		return transformedRanges;
	}
});