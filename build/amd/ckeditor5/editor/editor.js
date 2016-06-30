define(['exports', '../utils/emittermixin.js', '../utils/config.js', '../plugincollection.js', '../utils/locale.js', '../engine/datacontroller.js', '../engine/model/document.js', '../utils/ckeditorerror.js', '../utils/lib/lodash/isArray.js', '../utils/mix.js'], function (exports, _emittermixin, _config, _plugincollection, _locale, _datacontroller, _document, _ckeditorerror, _isArray, _mix) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _emittermixin2 = _interopRequireDefault(_emittermixin);

	var _config2 = _interopRequireDefault(_config);

	var _plugincollection2 = _interopRequireDefault(_plugincollection);

	var _locale2 = _interopRequireDefault(_locale);

	var _datacontroller2 = _interopRequireDefault(_datacontroller);

	var _document2 = _interopRequireDefault(_document);

	var _ckeditorerror2 = _interopRequireDefault(_ckeditorerror);

	var _isArray2 = _interopRequireDefault(_isArray);

	var _mix2 = _interopRequireDefault(_mix);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * Class representing a basic editor. It contains a base architecture, without much additional logic.
  *
  * See also {@link ckeditor5.editor.StandardEditor}.
  *
  * @memberOf ckeditor5.editor
  * @mixes utils.EmitterMixin
  */
	class Editor {
		/**
   * Creates a new instance of the Editor class.
   *
   * @param {Object} config The editor config.
   */
		constructor(config) {
			/**
    * Holds all configurations specific to this editor instance.
    *
    * @readonly
    * @member {utils.Config} ckeditor5.Editor#config
    */
			this.config = new _config2.default(config);

			/**
    * The plugins loaded and in use by this editor instance.
    *
    * @readonly
    * @member {ckeditor5.PluginCollection} ckeditor5.Editor#plugins
    */
			this.plugins = new _plugincollection2.default(this);

			/**
    * Commands registered to the editor.
    *
    * @readonly
    * @member {Map.<ckeditor5.command.Command>} ckeditor5.Editor#commands
    */
			this.commands = new Map();

			/**
    * @readonly
    * @member {utils.Locale} ckeditor5.Editor#locale
    */
			this.locale = new _locale2.default(this.config.get('lang'));

			/**
    * Shorthand for {@link utils.Locale#t}.
    *
    * @see utils.Locale#t
    * @method ckeditor5.Editor#t
    */
			this.t = this.locale.t;

			/**
    * Tree Model document managed by this editor.
    *
    * @readonly
    * @member {engine.model.Document} ckeditor5.Editor#document
    */
			this.document = new _document2.default();

			/**
    * Instance of the {@link engine.DataController data controller}.
    *
    * @readonly
    * @member {engine.DataController} ckeditor5.Editor#data
    */
			this.data = new _datacontroller2.default(this.document);

			/**
    * Instance of the {@link engine.EditingController editing controller}.
    *
    * This property is set by more specialized editor classes (such as {@link ckeditor5.editor.StandardEditor}),
    * however, it's required for features to work as their engine-related parts will try to connect converters.
    *
    * When defining a virtual editor class, like one working in Node.js, it's possible to plug a virtual
    * editing controller which only instantiates necessary properties, but without any observers and listeners.
    *
    * @readonly
    * @member {engine.EditingController} ckeditor5.editor.Editor#editing
    */
		}

		/**
   * Loads and initilizes plugins specified in `config.features`.
   *
   * @returns {Promise} A promise which resolves once the initialization is completed.
   */
		initPlugins() {
			const that = this;
			const config = this.config;

			return loadPlugins().then(initPlugins);

			function loadPlugins() {
				let plugins = config.features || [];

				// Handle features passed as a string.
				if (!(0, _isArray2.default)(plugins)) {
					plugins = plugins.split(',');
				}

				return that.plugins.load(plugins);
			}

			function initPlugins(loadedPlugins) {
				return loadedPlugins.reduce((promise, plugin) => {
					return promise.then(plugin.init.bind(plugin));
				}, Promise.resolve());
			}
		}

		/**
   * Destroys the editor instance, releasing all resources used by it.
   *
   * @fires ckeditor5.editor.Editor#destroy
   * @returns {Promise} A promise that resolves once the editor instance is fully destroyed.
   */
		destroy() {
			this.fire('destroy');
			this.stopListening();

			return Promise.resolve().then(() => {
				this.document.destroy();
				this.data.destroy();
			});
		}

		/**
   * Executes specified command with given parameter.
   *
   * @param {String} commandName Name of command to execute.
   * @param {*} [commandParam] If set, command will be executed with this parameter.
   */
		execute(commandName, commandParam) {
			let command = this.commands.get(commandName);

			if (!command) {
				/**
     * Specified command has not been added to the editor.
     *
     * @error editor-command-not-found
     */
				throw new _ckeditorerror2.default('editor-command-not-found: Specified command has not been added to the editor.');
			}

			command._execute(commandParam);
		}

		/**
   * Creates a basic editor instance.
   *
   * @param {Object} config See {@link ckeditor5.editor.StandardEditor}'s param.
   * @returns {Promise} Promise resolved once editor is ready.
   * @returns {ckeditor5.editor.StandardEditor} return.editor The editor instance.
   */
		static create(config) {
			return new Promise(resolve => {
				const editor = new this(config);

				resolve(editor.initPlugins().then(() => editor));
			});
		}
	}

	exports.default = Editor;
	(0, _mix2.default)(Editor, _emittermixin2.default);

	/**
  * Fired when this editor instance is destroyed. The editor at this point is not usable and this event should be used to
  * perform the clean-up in any plugin.
  *
  * @event ckeditor5.editor.Editor#destroy
  */
});