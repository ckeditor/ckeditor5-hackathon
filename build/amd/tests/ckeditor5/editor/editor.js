define('tests', ['/tests/ckeditor5/_utils/module.js', '/ckeditor5/editor/editor.js', '/ckeditor5/plugin.js', '/ckeditor5/utils/config.js', '/ckeditor5/plugincollection.js'], function (_module, _editor, _plugin, _config, _plugincollection) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: editor, browser-only */

	'use strict';

	var _module2 = _interopRequireDefault(_module);

	var _editor2 = _interopRequireDefault(_editor);

	var _plugin2 = _interopRequireDefault(_plugin);

	var _config2 = _interopRequireDefault(_config);

	var _plugincollection2 = _interopRequireDefault(_plugincollection);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	const pluginClasses = {};

	before(() => {
		pluginDefinition('A/A');
		pluginDefinition('B/B');
		pluginDefinition('C/C', ['B/B']);
		pluginDefinition('D/D', ['C/C']);
	});

	describe('Editor', () => {
		describe('constructor', () => {
			it('should create a new editor instance', () => {
				const editor = new _editor2.default();

				expect(editor.config).to.be.an.instanceof(_config2.default);
				expect(editor.commands).to.be.an.instanceof(Map);

				expect(editor.plugins).to.be.an.instanceof(_plugincollection2.default);
				expect(getPlugins(editor)).to.be.empty;
			});
		});

		describe('plugins', () => {
			it('should be empty on new editor', () => {
				const editor = new _editor2.default();

				expect(getPlugins(editor)).to.be.empty;
			});
		});

		describe('create', () => {
			it('should return a promise that resolves properly', () => {
				let promise = _editor2.default.create();

				expect(promise).to.be.an.instanceof(Promise);

				return promise;
			});

			it('loads plugins', () => {
				return _editor2.default.create({
					features: ['A']
				}).then(editor => {
					expect(getPlugins(editor).length).to.equal(1);

					expect(editor.plugins.get('A')).to.be.an.instanceof(_plugin2.default);
				});
			});
		});

		describe('initPlugins', () => {
			it('should load features', () => {
				const editor = new _editor2.default({
					features: ['A', 'B']
				});

				expect(getPlugins(editor)).to.be.empty;

				return editor.initPlugins().then(() => {
					expect(getPlugins(editor).length).to.equal(2);

					expect(editor.plugins.get('A')).to.be.an.instanceof(_plugin2.default);
					expect(editor.plugins.get('B')).to.be.an.instanceof(_plugin2.default);
				});
			});

			it('should load features passed as a string', () => {
				const editor = new _editor2.default({
					features: 'A,B'
				});

				expect(getPlugins(editor)).to.be.empty;

				return editor.initPlugins().then(() => {
					expect(getPlugins(editor).length).to.equal(2);

					expect(editor.plugins.get('A')).to.be.an.instanceof(_plugin2.default);
					expect(editor.plugins.get('B')).to.be.an.instanceof(_plugin2.default);
				});
			});

			it('should initialize plugins in the right order', () => {
				const editor = new _editor2.default({
					features: ['A', 'D']
				});

				return editor.initPlugins().then(() => {
					sinon.assert.callOrder(editor.plugins.get(pluginClasses['A/A']).init, editor.plugins.get(pluginClasses['B/B']).init, editor.plugins.get(pluginClasses['C/C']).init, editor.plugins.get(pluginClasses['D/D']).init);
				});
			});

			it('should initialize plugins in the right order, waiting for asynchronous ones', () => {
				class PluginAsync extends _plugin2.default {}
				const asyncSpy = sinon.spy().named('async-call-spy');

				// Synchronous plugin that depends on an asynchronous one.
				pluginDefinition('sync/sync', ['async/async']);

				_module2.default.define('async/async', () => {
					PluginAsync.prototype.init = sinon.spy(() => {
						return new Promise(resolve => {
							setTimeout(() => {
								asyncSpy();
								resolve();
							}, 0);
						});
					});

					return PluginAsync;
				});

				const editor = new _editor2.default({
					features: ['A', 'sync']
				});

				return editor.initPlugins().then(() => {
					sinon.assert.callOrder(editor.plugins.get(pluginClasses['A/A']).init, editor.plugins.get(PluginAsync).init,
					// This one is called with delay by the async init.
					asyncSpy, editor.plugins.get(pluginClasses['sync/sync']).init);
				});
			});
		});
	});

	// @param {String} name Name of the plugin.
	// @param {String[]} deps Dependencies of the plugin (only other plugins).
	function pluginDefinition(name, deps) {
		_module2.default.define(name, deps || [], function () {
			class NewPlugin extends _plugin2.default {}

			NewPlugin.prototype.init = sinon.spy().named(name);
			NewPlugin.requires = Array.from(arguments);

			pluginClasses[name] = NewPlugin;

			return NewPlugin;
		});
	}

	// Returns an array of loaded plugins.
	function getPlugins(editor) {
		const plugins = [];

		for (let entry of editor.plugins) {
			// Keep only plugins kept under their classes.
			if (typeof entry[0] == 'function') {
				plugins.push(entry[1]);
			}
		}

		return plugins;
	}
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
