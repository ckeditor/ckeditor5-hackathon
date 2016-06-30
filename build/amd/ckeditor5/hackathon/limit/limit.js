define(['exports', '../../engine/model/range.js', '../../engine/conversion/model-converter-builder.js', '../../feature.js', '../../utils/ObservableMixin.js', '../../utils/mix.js'], function (exports, _range, _modelConverterBuilder, _feature, _ObservableMixin, _mix) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _range2 = _interopRequireDefault(_range);

	var _modelConverterBuilder2 = _interopRequireDefault(_modelConverterBuilder);

	var _feature2 = _interopRequireDefault(_feature);

	var _ObservableMixin2 = _interopRequireDefault(_ObservableMixin);

	var _mix2 = _interopRequireDefault(_mix);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	class Limit extends _feature2.default {
		init() {
			const editor = this.editor;
			const doc = editor.document;
			const limit = editor.config.get('limit');

			this.set('count');

			(0, _modelConverterBuilder2.default)(editor.editing.modelToView) // no data converter
			.fromAttribute('overflow').toElement('span.overflow');

			// There is no conversion builder from attribute to nothing. We need to do it manually.
			editor.data.modelToView.on('insert:$text', (evt, data) => {
				if (data.item.getAttribute('overflow')) {
					evt.stop();
				}
			}, null, 0);

			doc.on('change', (evt, type, data, batch) => {
				doc.enqueueChanges(() => {
					const range = _range2.default.createFromElement(doc.getRoot());
					let count = 0;

					for (let value of range.getWalker({ singleCharacters: true })) {
						if (value.type == 'CHARACTER') {
							count++;

							if (count > limit) {
								batch.setAttr('overflow', true, value.item);
							} else {
								batch.removeAttr('overflow', value.item);
							}
						}
					}

					this.count = count;
				});
			});
		}
	}

	exports.default = Limit;
	(0, _mix2.default)(Limit, _ObservableMixin2.default);
});