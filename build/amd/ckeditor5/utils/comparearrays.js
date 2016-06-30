define(['exports'], function (exports) {
  /**
   * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
   * For licensing, see LICENSE.md.
   */

  'use strict';

  /**
   * Compares how given arrays relate to each other. One array can be: same as another array, prefix of another array
   * or completely different. If arrays are different, first index at which they differ is returned. Otherwise,
   * a flag specifying the relation is returned. Flags are negative numbers, so whenever a number >= 0 is returned
   * it means that arrays differ.
   *
   *		compareArrays( [ 0, 2 ], [ 0, 2 ] );		// 'SAME'
   *		compareArrays( [ 0, 2 ], [ 0, 2, 1 ] );		// 'PREFIX'
   *		compareArrays( [ 0, 2 ], [ 0 ] );			// 'EXTENSION'
   *		compareArrays( [ 0, 2 ], [ 1, 2 ] );		// 0
   *		compareArrays( [ 0, 2 ], [ 0, 1 ] );		// 1
   *
   * @memberOf utils
   * @param {Array} a Array that is compared.
   * @param {Array} b Array to compare with.
   * @returns {utils.ArrayRelation} How array `a` is related to `b`.
   */

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = compareArrays;
  function compareArrays(a, b) {
    const minLen = Math.min(a.length, b.length);

    for (let i = 0; i < minLen; i++) {
      if (a[i] != b[i]) {
        // The arrays are different.
        return i;
      }
    }

    // Both arrays were same at all points.
    if (a.length == b.length) {
      // If their length is also same, they are the same.
      return 'SAME';
    } else if (a.length < b.length) {
      // Compared array is shorter so it is a prefix of the other array.
      return 'PREFIX';
    } else {
      // Compared array is longer so it is an extension of the other array.
      return 'EXTENSION';
    }
  }
});