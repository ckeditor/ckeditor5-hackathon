define('tests', ['/tests/ckeditor5/_utils/module.js', '/tests/ckeditor5/_utils/utils.js', '/ckeditor5/editor/editor.js', '/ckeditor5/plugincollection.js', '/ckeditor5/plugin.js', '/ckeditor5/feature.js', '/ckeditor5/utils/ckeditorerror.js', '/ckeditor5/utils/log.js'], function (_module, _utils, _editor, _plugincollection, _plugin, _feature, _ckeditorerror, _log) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: browser-only */

	'use strict';

	var _module2 = _interopRequireDefault(_module);

	var _utils2 = _interopRequireDefault(_utils);

	var _editor2 = _interopRequireDefault(_editor);

	var _plugincollection2 = _interopRequireDefault(_plugincollection);

	var _plugin2 = _interopRequireDefault(_plugin);

	var _feature2 = _interopRequireDefault(_feature);

	var _ckeditorerror2 = _interopRequireDefault(_ckeditorerror);

	var _log2 = _interopRequireDefault(_log);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	let editor;
	let PluginA, PluginB, PluginC, PluginD, PluginE, PluginF, PluginG, PluginH, PluginI;
	class TestError extends Error {}
	class GrandPlugin extends _feature2.default {}

	_utils2.default.createSinonSandbox();

	before(() => {
		PluginA = createPlugin('A');
		PluginB = createPlugin('B');
		PluginC = createPlugin('C');
		PluginD = createPlugin('D');
		PluginE = createPlugin('E');
		PluginF = createPlugin('F');
		PluginG = createPlugin('G', GrandPlugin);
		PluginH = createPlugin('H');
		PluginI = createPlugin('I');

		PluginC.requires = [PluginB];
		PluginD.requires = [PluginA, PluginC];
		PluginF.requires = [PluginE];
		PluginE.requires = [PluginF];
		PluginH.requires = [PluginI];

		editor = new _editor2.default();
	});

	// Create fake plugins that will be used on tests.

	_module2.default.define('A/A', () => {
		return PluginA;
	});

	_module2.default.define('B/B', () => {
		return PluginB;
	});

	_module2.default.define('C/C', ['editor/editor', 'B/B'], () => {
		return PluginC;
	});

	_module2.default.define('D/D', ['editor/editor', 'A/A', 'C/C'], () => {
		return PluginD;
	});

	_module2.default.define('E/E', ['editor/editor', 'F/F'], () => {
		return PluginE;
	});

	_module2.default.define('F/F', ['editor/editor', 'E/E'], () => {
		return PluginF;
	});

	_module2.default.define('G/G', () => {
		return PluginG;
	});

	_module2.default.define('H/H', () => {
		return PluginH;
	});

	_module2.default.define('I/I', () => {
		return PluginI;
	});

	// Erroneous cases.

	_module2.default.define('X/X', () => {
		throw new TestError('Some error inside a plugin');
	});

	_module2.default.define('Y/Y', () => {
		return class {};
	});

	/////////////

	describe('load', () => {
		it('should not fail when trying to load 0 plugins (empty array)', () => {
			let plugins = new _plugincollection2.default(editor);

			return plugins.load([]).then(() => {
				expect(getPlugins(plugins)).to.be.empty();
			});
		});

		it('should add collection items for loaded plugins', () => {
			let plugins = new _plugincollection2.default(editor);

			return plugins.load(['A', 'B']).then(() => {
				expect(getPlugins(plugins).length).to.equal(2);

				expect(plugins.get(PluginA)).to.be.an.instanceof(PluginA);
				expect(plugins.get(PluginB)).to.be.an.instanceof(PluginB);

				expect(plugins.get('A')).to.be.an.instanceof(PluginA);
				expect(plugins.get('B')).to.be.an.instanceof(PluginB);
			});
		});

		it('should load dependency plugins', () => {
			let plugins = new _plugincollection2.default(editor);
			let spy = sinon.spy(plugins, '_add');

			return plugins.load(['A', 'C']).then(loadedPlugins => {
				expect(getPlugins(plugins).length).to.equal(3);

				expect(getPluginNames(getPluginsFromSpy(spy))).to.deep.equal(['A', 'B', 'C'], 'order by plugins._add()');
				expect(getPluginNames(loadedPlugins)).to.deep.equal(['A', 'B', 'C'], 'order by returned value');
			});
		});

		it('should be ok when dependencies are loaded first', () => {
			let plugins = new _plugincollection2.default(editor);
			let spy = sinon.spy(plugins, '_add');

			return plugins.load(['A', 'B', 'C']).then(loadedPlugins => {
				expect(getPlugins(plugins).length).to.equal(3);

				expect(getPluginNames(getPluginsFromSpy(spy))).to.deep.equal(['A', 'B', 'C'], 'order by plugins._add()');
				expect(getPluginNames(loadedPlugins)).to.deep.equal(['A', 'B', 'C'], 'order by returned value');
			});
		});

		it('should load deep dependency plugins', () => {
			let plugins = new _plugincollection2.default(editor);
			let spy = sinon.spy(plugins, '_add');

			return plugins.load(['D']).then(loadedPlugins => {
				expect(getPlugins(plugins).length).to.equal(4);

				// The order must have dependencies first.
				expect(getPluginNames(getPluginsFromSpy(spy))).to.deep.equal(['A', 'B', 'C', 'D'], 'order by plugins._add()');
				expect(getPluginNames(loadedPlugins)).to.deep.equal(['A', 'B', 'C', 'D'], 'order by returned value');
			});
		});

		it('should handle cross dependency plugins', () => {
			let plugins = new _plugincollection2.default(editor);
			let spy = sinon.spy(plugins, '_add');

			return plugins.load(['A', 'E']).then(loadedPlugins => {
				expect(getPlugins(plugins).length).to.equal(3);

				// The order must have dependencies first.
				expect(getPluginNames(getPluginsFromSpy(spy))).to.deep.equal(['A', 'F', 'E'], 'order by plugins._add()');
				expect(getPluginNames(loadedPlugins)).to.deep.equal(['A', 'F', 'E'], 'order by returned value');
			});
		});

		it('should load grand child classes', () => {
			let plugins = new _plugincollection2.default(editor);

			return plugins.load(['G']).then(() => {
				expect(getPlugins(plugins).length).to.equal(1);
			});
		});

		it('should make plugin available to get by name when plugin was loaded as dependency first', () => {
			let plugins = new _plugincollection2.default(editor);

			return plugins.load(['H', 'I']).then(() => {
				expect(plugins.get('I')).to.be.instanceof(PluginI);
			});
		});

		it('should set the `editor` property on loaded plugins', () => {
			let plugins = new _plugincollection2.default(editor);

			return plugins.load(['A', 'B']).then(() => {
				expect(plugins.get('A').editor).to.equal(editor);
				expect(plugins.get('B').editor).to.equal(editor);
			});
		});

		it('should reject on invalid plugin names (forward require.js loading error)', () => {
			let logSpy = _utils2.default.sinon.stub(_log2.default, 'error');

			let plugins = new _plugincollection2.default(editor);

			return plugins.load(['A', 'BAD', 'B'])
			// Throw here, so if by any chance plugins.load() was resolved correctly catch() will be stil executed.
			.then(() => {
				throw new Error('Test error: this promise should not be resolved successfully');
			}).catch(err => {
				expect(err).to.be.an.instanceof(Error);
				// Make sure it's the Require.JS error, not the one thrown above.
				expect(err.message).to.match(/^Script error for/);

				sinon.assert.calledOnce(logSpy);
				expect(logSpy.args[0][0]).to.match(/^plugincollection-load:/);
			});
		});

		it('should reject on broken plugins (forward the error thrown in a plugin)', () => {
			let logSpy = _utils2.default.sinon.stub(_log2.default, 'error');

			let plugins = new _plugincollection2.default(editor);

			return plugins.load(['A', 'X', 'B'])
			// Throw here, so if by any chance plugins.load() was resolved correctly catch() will be stil executed.
			.then(() => {
				throw new Error('Test error: this promise should not be resolved successfully');
			}).catch(err => {
				expect(err).to.be.an.instanceof(TestError);
				expect(err).to.have.property('message', 'Some error inside a plugin');

				sinon.assert.calledOnce(logSpy);
				expect(logSpy.args[0][0]).to.match(/^plugincollection-load:/);
			});
		});

		it('should reject when loading a module which is not a plugin', () => {
			let logSpy = _utils2.default.sinon.stub(_log2.default, 'error');

			let plugins = new _plugincollection2.default(editor);

			return plugins.load(['Y'])
			// Throw here, so if by any chance plugins.load() was resolved correctly catch() will be stil executed.
			.then(() => {
				throw new Error('Test error: this promise should not be resolved successfully');
			}).catch(err => {
				expect(err).to.be.an.instanceof(_ckeditorerror2.default);
				expect(err.message).to.match(/^plugincollection-instance/);

				sinon.assert.calledOnce(logSpy);
				expect(logSpy.args[0][0]).to.match(/^plugincollection-load:/);
			});
		});
	});

	describe('getPluginPath()', () => {
		it('generates path for modules within some package', () => {
			const p = _plugincollection2.default.getPluginPath('some/ba');

			expect(p).to.equal('ckeditor5/some/ba.js');
		});

		it('generates path from simplified feature name', () => {
			const p = _plugincollection2.default.getPluginPath('foo');

			expect(p).to.equal('ckeditor5/foo/foo.js');
		});
	});

	function createPlugin(name, baseClass) {
		baseClass = baseClass || _plugin2.default;

		const P = class extends baseClass {
			constructor(editor) {
				super(editor);
				this._pluginName = name;
			}
		};

		P._pluginName = name;

		return P;
	}

	function getPlugins(pluginCollection) {
		const plugins = [];

		for (let entry of pluginCollection) {
			// Keep only plugins kept under their classes.
			if (typeof entry[0] == 'function') {
				plugins.push(entry[1]);
			}
		}

		return plugins;
	}

	function getPluginsFromSpy(addSpy) {
		return addSpy.args.map(arg => arg[0])
		// Entries may be kept twice in the plugins map - once as a pluginName => plugin, once as pluginClass => plugin.
		// Return only pluginClass => plugin entries as these will always represent all plugins.
		.filter(plugin => typeof plugin == 'function');
	}

	function getPluginNames(plugins) {
		return plugins.map(plugin => plugin._pluginName);
	}
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
