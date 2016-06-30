define(['exports', '../feature.js', '/ckeditor5/utils/collection.js', '/ckeditor5/ui/model.js', '/ckeditor5/ui/panel/panel.js', './floatingpanelview.js', '/ckeditor5/ui/list/list.js', '/ckeditor5/ui/list/listview.js'], function (exports, _feature, _collection, _model, _panel, _floatingpanelview, _list, _listview) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* global console:false */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _feature2 = _interopRequireDefault(_feature);

	var _collection2 = _interopRequireDefault(_collection);

	var _model2 = _interopRequireDefault(_model);

	var _panel2 = _interopRequireDefault(_panel);

	var _floatingpanelview2 = _interopRequireDefault(_floatingpanelview);

	var _list2 = _interopRequireDefault(_list);

	var _listview2 = _interopRequireDefault(_listview);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * Autocomplete
  *
  * @extends ckeditor5.Feature
  */
	class Autocomplete extends _feature2.default {
		/**
   * TODO
   */
		init() {
			const editor = this.editor;

			this.model = new _model2.default({
				text: '',
				suggestions: new _collection2.default({ idProperty: 'label' })
			});

			this._setupUi();

			editor.document.on('changesDone', this._check, this);
		}

		/**
   * TODO
   */
		_setupUi() {
			const panelModel = new _model2.default({
				isOn: false
			});

			const listModel = new _model2.default({
				items: this.model.suggestions,
				current: null
			});

			listModel.bind('isOn').to(panelModel);

			this._setupPanel(panelModel, this._setupList(listModel));
		}

		/**
   * TODO
   */
		_setupPanel(panelModel, list) {
			const editor = this.editor;
			const suggestions = this.model.suggestions;
			const panel = new _panel2.default(panelModel, new _floatingpanelview2.default(panelModel));

			panel.add('content', list);
			editor.ui.collections.get('body').add(panel);

			// Show the panel when there are some suggestions.
			this.listenTo(suggestions, 'add', () => {
				if (!panelModel.isOn) {
					panelModel.isOn = true;
				}
			});

			// Hide the panel when no suggestions.
			this.listenTo(suggestions, 'remove', () => {
				if (!this.model.suggestions.length) {
					panelModel.isOn = false;
				}
			});
		}

		/**
   * TODO
   */
		_setupList(listModel) {
			const editor = this.editor;
			const list = new _list2.default(listModel, new _listview2.default(listModel), editor);
			const stopCodes = new Set([40, 38, 13]);

			this.listenTo(listModel, 'execute', this._insert, this);
			this.listenTo(editor.editing.view, 'keydown', _onKeyDown, this, -100);

			function _onKeyDown(evt, domEvt) {
				if (!listModel.isOn) {
					return;
				}

				const keyCode = domEvt.keyCode;

				if (keyCode == 40) {
					list.selectNext();
				} else if (keyCode == 38) {
					list.selectPrevious();
				} else if (keyCode == 13) {
					listModel.fire('execute', list.current);
				}

				if (stopCodes.has(keyCode)) {
					// This is kinda weird because this is for keyup/down...
					domEvt.preventDefault();

					// ...and this one for enter. Why?
					evt.stop();
				}
			}

			return list;
		}

		/**
   * TODO
   */
		_check() {
			console.log('[i] Checking autocomplete');

			const editor = this.editor;
			const cfg = editor.config.get('autocomplete');

			// A s#ample @te^xt.
			const sel = editor.document.selection;

			// "A s#ample @text."
			const selText = sel.focus.parent.getText();
			const selOffset = sel.focus.offset;

			// "A s#ample @te"
			const preceding = selText.substr(0, selOffset);

			let lastTrigger = null;
			let lastTriggerIndex = -1;

			this.model.suggestions.clear();

			for (let c in cfg) {
				const index = preceding.lastIndexOf(c);

				if (index > lastTriggerIndex) {
					// "A s#ample @te"
					// -----------^
					lastTriggerIndex = index;

					// "@"
					lastTrigger = c;
				}
			}

			console.log(`	[i] Preceding: "${ preceding }"`);

			if (!lastTrigger) {
				console.log('	[i] No trigger found.');

				return;
			}

			// "text"
			const text =
			// "te"
			selText.slice(lastTriggerIndex, selOffset) +
			// "xt."
			selText.slice(selOffset).split(/\s/g)[0];

			console.log(`	[i] Text: "${ text }"`);

			if (text.match(/\s/g)) {
				console.log('	[i] Whitespace between trigger and current position.');

				return;
			}

			this.model.text = text;

			cfg[lastTrigger].filter(sugText => {
				if (text === lastTrigger) {
					return sugText;
				} else {
					return sugText !== text && sugText.indexOf(text) === 0;
				}
			}).sort().forEach(sugText => {
				console.log(`	[i] Suggestion "${ sugText }" found.`);

				// It's very, very memory-inefficient. But it's a PoC, so...
				this.model.suggestions.add(new _model2.default({
					label: sugText,
					selected: false
				}));
			});
		}

		/**
   * TODO
   */
		_insert(evt, itemModel) {
			const editor = this.editor;
			const doc = editor.document;

			doc.enqueueChanges(() => {
				doc.batch().insert(doc.selection.focus, itemModel.label.slice(this.model.text.length));
			});
		}
	}
	exports.default = Autocomplete;
});