define(['exports', '../../../utils/mix.js', '../../../utils/emittermixin.js', './deletecontents.js', './modifyselection.js'], function (exports, _mix, _emittermixin, _deletecontents, _modifyselection) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _mix2 = _interopRequireDefault(_mix);

	var _emittermixin2 = _interopRequireDefault(_emittermixin);

	var _deletecontents2 = _interopRequireDefault(_deletecontents);

	var _modifyselection2 = _interopRequireDefault(_modifyselection);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * Set of frequently used tools to work with a document.
  * The instance of composer is available in {@link engine.model.Document#composer}.
  *
  * By default this class implements only a very basic version of those algorithms. However, all its methods can be extended
  * by features by listening to related events. The default action of those events are implemented
  * by functions available in the {@link engine.model.composer} namespace, so they can be reused
  * in the algorithms implemented by features.
  *
  * @member engine.model.composer
  * @mixes utils.EmitterMixin
  */
	class Composer {
		/**
   * Creates an instance of the composer.
   */
		constructor() {
			this.on('deleteContents', (evt, data) => (0, _deletecontents2.default)(data.batch, data.selection, data.options));
			this.on('modifySelection', (evt, data) => (0, _modifyselection2.default)(data.selection, data.options));
		}

		/**
   * See {@link engine.model.composer.deleteContents}.
   *
   * Note: For the sake of predictability, the resulting selection should always be collapsed.
   * In cases where a feature wants to modify deleting behavior so selection isn't collapsed
   * (e.g. a table feature may want to keep row selection after pressing <kbd>Backspace</kbd>),
   * then that behavior should be implemented in the view's listener. At the same time, the table feature
   * will need to modify this method's behavior too, e.g. to "delete contents and then collapse
   * the selection inside the last selected cell" or "delete the row and collapse selection somewhere near".
   * That needs to be done in order to ensure that other features which use `deleteContents()` will work well with tables.
   *
   * @fires engine.model.composer.Composer#deleteContents
   * @param {engine.model.Batch} batch Batch to which deltas will be added.
   * @param {engine.model.Selection} selection Selection of which the content should be deleted.
   * @param {Object} options See {@link engine.model.composer.deleteContents}'s options.
   */
		deleteContents(batch, selection, options) {
			this.fire('deleteContents', { batch, selection, options });
		}

		/**
   * See {@link engine.model.composer.modifySelection}.
   *
   * @fires engine.model.composer.Composer#modifySelection
   * @param {engine.model.Selection} The selection to modify.
   * @param {Object} options See {@link engine.model.composer.modifySelection}'s options.
   */
		modifySelection(selection, options) {
			this.fire('modifySelection', { selection, options });
		}
	}

	exports.default = Composer;
	(0, _mix2.default)(Composer, _emittermixin2.default);

	/**
  * Event fired when {@link engine.model.composer.Composer#deleteContents} method is called.
  * The {@link engine.model.composer.deleteContents default action of the composer} is implemented as a
  * listener to that event so it can be fully customized by the features.
  *
  * @event engine.model.composer.Composer#deleteContents
  * @param {Object} data
  * @param {engine.model.Batch} data.batch
  * @param {engine.model.Selection} data.selection
  * @param {Object} data.options See {@link engine.model.composer.deleteContents}'s options.
  */

	/**
  * Event fired when {@link engine.model.composer.Composer#modifySelection} method is called.
  * The {@link engine.model.composer.modifySelection default action of the composer} is implemented as a
  * listener to that event so it can be fully customized by the features.
  *
  * @event engine.model.composer.Composer#modifySelection
  * @param {Object} data
  * @param {engine.model.Selection} data.selection
  * @param {Object} data.options See {@link engine.model.composer.modifySelection}'s options.
  */
});