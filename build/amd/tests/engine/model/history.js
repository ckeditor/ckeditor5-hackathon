define('tests', ['/ckeditor5/engine/model/history.js', '/ckeditor5/engine/model/delta/delta.js', '/ckeditor5/engine/model/operation/nooperation.js', '/ckeditor5/utils/ckeditorerror.js'], function (_history, _delta, _nooperation, _ckeditorerror) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	var _history2 = _interopRequireDefault(_history);

	var _delta2 = _interopRequireDefault(_delta);

	var _nooperation2 = _interopRequireDefault(_nooperation);

	var _ckeditorerror2 = _interopRequireDefault(_ckeditorerror);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('History', () => {
		let history;

		beforeEach(() => {
			history = new _history2.default();
		});

		describe('constructor', () => {
			it('should create an empty History instance', () => {
				expect(history._deltas.length).to.equal(0);
				expect(history._historyPoints.size).to.equal(0);
			});
		});

		describe('addOperation', () => {
			it('should save delta containing passed operation in the history', () => {
				let delta = new _delta2.default();
				let operation = new _nooperation2.default(0);

				delta.addOperation(operation);
				history.addOperation(operation);

				expect(history._deltas.length).to.equal(1);
				expect(history._deltas[0]).to.equal(delta);
			});

			it('should save each delta only once', () => {
				let delta = new _delta2.default();

				delta.addOperation(new _nooperation2.default(0));
				delta.addOperation(new _nooperation2.default(1));
				delta.addOperation(new _nooperation2.default(2));

				for (let operation of delta.operations) {
					history.addOperation(operation);
				}

				expect(history._deltas.length).to.equal(1);
				expect(history._deltas[0]).to.equal(delta);
			});

			it('should save multiple deltas and keep their order', () => {
				let deltaA = new _delta2.default();
				let deltaB = new _delta2.default();
				let deltaC = new _delta2.default();

				let deltas = [deltaA, deltaB, deltaC];

				let i = 0;

				for (let delta of deltas) {
					delta.addOperation(new _nooperation2.default(i++));
					delta.addOperation(new _nooperation2.default(i++));
				}

				for (let delta of deltas) {
					for (let operation of delta.operations) {
						history.addOperation(operation);
					}
				}

				expect(history._deltas.length).to.equal(3);
				expect(history._deltas[0]).to.equal(deltaA);
				expect(history._deltas[1]).to.equal(deltaB);
				expect(history._deltas[2]).to.equal(deltaC);
			});
		});

		describe('getTransformedDelta', () => {
			it('should transform given delta by deltas from history which were applied since the baseVersion of given delta', () => {
				sinon.spy(_history2.default, '_transform');

				let deltaA = new _delta2.default();
				deltaA.addOperation(new _nooperation2.default(0));

				let deltaB = new _delta2.default();
				deltaB.addOperation(new _nooperation2.default(1));

				let deltaC = new _delta2.default();
				deltaC.addOperation(new _nooperation2.default(2));

				let deltaD = new _delta2.default();
				deltaD.addOperation(new _nooperation2.default(3));

				let deltaX = new _delta2.default();
				deltaX.addOperation(new _nooperation2.default(1));

				history.addOperation(deltaA.operations[0]);
				history.addOperation(deltaB.operations[0]);
				history.addOperation(deltaC.operations[0]);
				history.addOperation(deltaD.operations[0]);

				// `deltaX` bases on the same history point as `deltaB` -- so it already acknowledges `deltaA` existence.
				// It should be transformed by `deltaB` and all following deltas (`deltaC` and `deltaD`).
				history.getTransformedDelta(deltaX);

				// `deltaX` was not transformed by `deltaA`.
				expect(_history2.default._transform.calledWithExactly(deltaX, deltaA)).to.be.false;

				expect(_history2.default._transform.calledWithExactly(deltaX, deltaB)).to.be.true;
				// We can't do exact call matching because after first transformation, what we are further transforming
				// is no longer `deltaX` but a result of transforming `deltaX` and `deltaB`.
				expect(_history2.default._transform.calledWithExactly(sinon.match.instanceOf(_delta2.default), deltaC)).to.be.true;
				expect(_history2.default._transform.calledWithExactly(sinon.match.instanceOf(_delta2.default), deltaD)).to.be.true;
			});

			it('should correctly set base versions if multiple deltas are result of transformation', () => {
				// Let's stub History._transform so it will always return two deltas with two operations each.
				_history2.default._transform = function () {
					let resultA = new _delta2.default();
					resultA.addOperation(new _nooperation2.default(1));
					resultA.addOperation(new _nooperation2.default(1));

					let resultB = new _delta2.default();
					resultB.addOperation(new _nooperation2.default(1));
					resultB.addOperation(new _nooperation2.default(1));

					return [resultA, resultB];
				};

				let deltaA = new _delta2.default();
				deltaA.addOperation(new _nooperation2.default(0));

				let deltaX = new _delta2.default();
				deltaX.addOperation(new _nooperation2.default(0));

				history.addOperation(deltaA.operations[0]);

				let result = history.getTransformedDelta(deltaX);

				expect(result[0].operations[0].baseVersion).to.equal(1);
				expect(result[0].operations[1].baseVersion).to.equal(2);
				expect(result[1].operations[0].baseVersion).to.equal(3);
				expect(result[1].operations[1].baseVersion).to.equal(4);
			});

			it('should not transform given delta if it bases on current version of history', () => {
				let deltaA = new _delta2.default();
				deltaA.addOperation(new _nooperation2.default(0));

				let deltaB = new _delta2.default();
				let opB = new _nooperation2.default(1);
				deltaB.addOperation(opB);

				history.addOperation(deltaA.operations[0]);

				let result = history.getTransformedDelta(deltaB);

				expect(result.length).to.equal(1);
				expect(result[0]).to.equal(deltaB);
				expect(result[0].operations[0]).to.equal(opB);
			});

			it('should throw if given delta bases on an incorrect version of history', () => {
				let deltaA = new _delta2.default();
				deltaA.addOperation(new _nooperation2.default(0));
				deltaA.addOperation(new _nooperation2.default(1));

				history.addOperation(deltaA.operations[0]);
				history.addOperation(deltaA.operations[1]);

				let deltaB = new _delta2.default();
				// Wrong base version - should be either 0 or 2, operation can't be based on an operation that is
				// in the middle of other delta, because deltas are atomic, not dividable structures.
				deltaB.addOperation(new _nooperation2.default(1));

				expect(() => {
					history.getTransformedDelta(deltaB);
				}).to.throw(_ckeditorerror2.default, /history-wrong-version/);
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
