define(['exports', '../controller.js', '../controllercollection.js', '../componentfactory.js', '../../utils/observablemixin.js', '../iconmanagerview.js', '../../../theme/iconmanagermodel.js', '../../utils/mix.js'], function (exports, _controller, _controllercollection, _componentfactory, _observablemixin, _iconmanagerview, _iconmanagermodel, _mix) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _controller2 = _interopRequireDefault(_controller);

	var _controllercollection2 = _interopRequireDefault(_controllercollection);

	var _componentfactory2 = _interopRequireDefault(_componentfactory);

	var _observablemixin2 = _interopRequireDefault(_observablemixin);

	var _iconmanagerview2 = _interopRequireDefault(_iconmanagerview);

	var _iconmanagermodel2 = _interopRequireDefault(_iconmanagermodel);

	var _mix2 = _interopRequireDefault(_mix);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * Base class for the editor main view controllers.
  *
  * @memberOf ui.editorUI
  * @extends ui.Controller
  * @mixes utils.ObservaleMixin
  */
	class EditorUI extends _controller2.default {
		/**
   * Creates an EditorUI instance.
   *
   * @param {ckeditor5.Editor} editor
   */
		constructor(editor) {
			super();

			/**
    * @readonly
    * @member {ckeditor5.Editor} ui.editorUI.EditorUI#editor
    */
			this.editor = editor;

			/**
    * @readonly
    * @member {ui.ComponentFactory} ui.editorUI.EditorUI#featureComponents
    */
			this.featureComponents = new _componentfactory2.default(editor);

			this.collections.add(new _controllercollection2.default('body'));
		}

		/**
   * Initializes EditorUI instance.
   *
   * @returns {Promise}
   */
		init() {
			this._setupIconManager();

			return super.init();
		}

		/**
   * Adds IconManager into DOM.
   *
   * @protected
   */
		_setupIconManager() {
			/**
    * Icons available in the UI.
    *
    * @readonly
    * @member {Array} ui.editorUI.EditorUI#icons
    */
			this.icons = _iconmanagermodel2.default.icons;

			this.collections.get('body').add(new _controller2.default(_iconmanagermodel2.default, new _iconmanagerview2.default(_iconmanagermodel2.default)));
		}
	}

	exports.default = EditorUI;
	(0, _mix2.default)(EditorUI, _observablemixin2.default);
});