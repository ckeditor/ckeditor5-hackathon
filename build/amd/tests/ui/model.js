define('tests', ['/ckeditor5/ui/model.js'], function (_model) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: ui */

	'use strict';

	var _model2 = _interopRequireDefault(_model);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	let Car, car;

	describe('Model', () => {
		beforeEach(() => {
			Car = class extends _model2.default {};

			car = new Car({
				color: 'red',
				year: 2015
			});
		});

		it('should set attributes on creation', () => {
			expect(car).to.have.property('color', 'red');
			expect(car).to.have.property('year', 2015);

			const spy = sinon.spy();

			car.on('change:color', spy);
			car.color = 'blue';

			expect(spy.called).to.be.true;
		});

		it('should add properties on creation', () => {
			let car = new Car(null, {
				prop: 1
			});

			expect(car).to.have.property('prop', 1);
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
