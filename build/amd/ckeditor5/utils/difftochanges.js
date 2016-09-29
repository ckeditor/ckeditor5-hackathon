define(['exports'], function (exports) {
	/**
  * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	/**
  * Creates a set of changes which need to be applied to the input in order to transform
  * it into the output. This function can be used with strings or arrays.
  *
  *		const input = Array.from( 'abc' );
  *		const output = Array.from( 'xaby' );
  *		const changes = diffToChanges( diff( input, output ), output );
  *
  *		changes.forEach( change => {
  *			if ( change.type == 'INSERT' ) {
  *				input.splice( change.index, 0, ...change.values );
  *			} else if ( change.type == 'DELETE' ) {
  *				input.splice( change.index, change.howMany );
  *			}
  *		} );
  *
  *		input.join( '' ) == output.join( '' ); // -> true
  *
  * @method utils.diffToChanges
  * @param {Array.<'EQUAL'|'INSERT'|'DELETE'>} diff Result of {@link utils.diff}.
  * @param {String|Array} output The string or array which was passed as diff's output.
  * @returns {Array.<Object>} Set of changes (insert or delete) which need to be applied to the input
  * in order to transform it into the output.
  */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = diffToChanges;
	function diffToChanges(diff, output) {
		const changes = [];
		let index = 0;
		let lastOperation;

		diff.forEach(change => {
			if (change == 'EQUAL') {
				pushLast();

				index++;
			} else if (change == 'INSERT') {
				if (isContinuationOf('INSERT')) {
					lastOperation.values.push(output[index]);
				} else {
					pushLast();

					lastOperation = {
						type: 'INSERT',
						index: index,
						values: [output[index]]
					};
				}

				index++;
			} else /* if ( change == 'DELETE' ) */{
					if (isContinuationOf('DELETE')) {
						lastOperation.howMany++;
					} else {
						pushLast();

						lastOperation = {
							type: 'DELETE',
							index: index,
							howMany: 1
						};
					}
				}
		});

		pushLast();

		return changes;

		function pushLast() {
			if (lastOperation) {
				changes.push(lastOperation);
				lastOperation = null;
			}
		}

		function isContinuationOf(expected) {
			return lastOperation && lastOperation.type == expected;
		}
	}
});