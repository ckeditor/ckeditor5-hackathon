define('tests', ['/ckeditor5/editor/editor.js', '/ckeditor5/ui/componentfactory.js', '/ckeditor5/utils/ckeditorerror.js'], function (_editor, _componentfactory, _ckeditorerror) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: ui */

	'use strict';

	var _editor2 = _interopRequireDefault(_editor);

	var _componentfactory2 = _interopRequireDefault(_componentfactory);

	var _ckeditorerror2 = _interopRequireDefault(_ckeditorerror);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('ComponentFactory', () => {
		let editor, factory;

		beforeEach(() => {
			editor = new _editor2.default();
			factory = new _componentfactory2.default(editor);
		});

		describe('constructor', () => {
			it('sets all the properties', () => {
				expect(factory).to.have.property('editor', editor);
			});
		});

		describe('add', () => {
			it('throws when trying to override already registered component', () => {
				factory.add('foo', class {}, class {}, {});

				expect(() => {
					factory.add('foo', class {}, class {}, {});
				}).to.throw(_ckeditorerror2.default, /^componentfactory-item-exists/);
			});
		});

		describe('create', () => {
			it('creates an instance', () => {
				class View {}

				class Controller {
					constructor(model, view, ed) {
						expect(model).to.equal(model);
						expect(view).to.be.instanceof(View);
						expect(ed).to.equal(editor);
					}
				}

				const model = {};

				factory.add('foo', Controller, View, model);

				const instance = factory.create('foo');

				expect(instance).to.be.instanceof(Controller);
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
