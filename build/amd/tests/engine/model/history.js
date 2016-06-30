define('tests', ['/ckeditor5/engine/model/history.js', '/ckeditor5/engine/model/delta/delta.js', '/ckeditor5/engine/model/operation/operation.js', '/ckeditor5/engine/model/operation/nooperation.js', '/ckeditor5/utils/ckeditorerror.js'], function (_history, _delta, _operation, _nooperation, _ckeditorerror) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	var _history2 = _interopRequireDefault(_history);

	var _delta2 = _interopRequireDefault(_delta);

	var _operation2 = _interopRequireDefault(_operation);

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
				expect(Array.from(history.getHistoryItems()).length).to.equal(0);
			});
		});

		describe('addOperation', () => {
			it('should save delta containing passed operation in the history', () => {
				let delta = new _delta2.default();
				let operation = new _operation2.default(0);

				delta.addOperation(operation);
				history.addOperation(operation);

				const historyItems = Array.from(history.getHistoryItems());
				expect(historyItems.length).to.equal(1);
				expect(historyItems[0].delta).to.equal(delta);
			});

			it('should save each delta only once', () => {
				let delta = new _delta2.default();

				delta.addOperation(new _operation2.default(0));
				delta.addOperation(new _operation2.default(1));
				delta.addOperation(new _operation2.default(2));

				for (let operation of delta.operations) {
					history.addOperation(operation);
				}

				const historyItems = Array.from(history.getHistoryItems());
				expect(historyItems.length).to.equal(1);
				expect(historyItems[0].delta).to.equal(delta);
			});

			it('should save multiple deltas and keep their order', () => {
				let deltas = getDeltaSet();
				addDeltasToHistory(deltas, history);

				const historyItems = Array.from(history.getHistoryItems());
				expect(historyItems.map(item => item.delta)).to.deep.equal(deltas);
			});
		});

		describe('getHistoryItems', () => {
			it('should return only part of history, if history point is given', () => {
				let deltas = getDeltaSet();
				addDeltasToHistory(deltas, history);

				const historyItems = Array.from(history.getHistoryItems(6));
				expect(historyItems.length).to.equal(1);
			});

			it('should return empty iterator if given history point is too high', () => {
				let deltas = getDeltaSet();
				addDeltasToHistory(deltas, history);

				const historyItems = Array.from(history.getHistoryItems(20));
				expect(historyItems.length).to.equal(0);
			});

			it('should throw if given history point is "inside" delta', () => {
				let deltas = getDeltaSet();
				addDeltasToHistory(deltas, history);

				expect(() => {
					Array.from(history.getHistoryItems(2));
				}).to.throw(_ckeditorerror2.default, /history-wrong-version/);
			});
		});

		describe('markInactiveDelta', () => {
			it('marked delta should be visible as a delta containing only NoOperations', () => {
				let deltas = getDeltaSet();
				addDeltasToHistory(deltas, history);
				history.markInactiveDelta(deltas[1]);

				const historyItems = Array.from(history.getHistoryItems());
				const markedHistoryDelta = historyItems[1].delta;

				for (let operation of markedHistoryDelta.operations) {
					expect(operation).to.be.instanceof(_nooperation2.default);
				}
			});
		});

		describe('updateDelta', () => {
			it('updated delta should be visible in updated version', () => {
				let deltas = getDeltaSet();
				addDeltasToHistory(deltas, history);

				const updatedDelta = new _delta2.default();
				history.updateDelta(1, [updatedDelta]);

				const historyItems = Array.from(history.getHistoryItems());
				const updatedHistoryDelta = historyItems[1].delta;

				expect(updatedHistoryDelta).to.equal(updatedDelta);
			});
		});
	});

	function getDeltaSet() {
		const deltas = [];

		deltas.push(getDelta(0));
		deltas.push(getDelta(3));
		deltas.push(getDelta(6));

		return deltas;
	}

	function getDelta(baseVersion) {
		const delta = new _delta2.default();

		for (let i = 0; i < 3; i++) {
			delta.addOperation(new _operation2.default(i + baseVersion));
			delta.addOperation(new _operation2.default(i + baseVersion));
		}

		return delta;
	}

	function addDeltasToHistory(deltas, history) {
		for (let delta of deltas) {
			for (let operation of delta.operations) {
				history.addOperation(operation);
			}
		}
	}
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
