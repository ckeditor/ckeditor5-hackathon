define(['./attributedelta.js', './insertdelta.js', './mergedelta.js', './movedelta.js', './removedelta.js', './renamedelta.js', './splitdelta.js', './unwrapdelta.js', './weakinsertdelta.js', './wrapdelta.js'], function (_attributedelta, _insertdelta, _mergedelta, _movedelta, _removedelta, _renamedelta, _splitdelta, _unwrapdelta, _weakinsertdelta, _wrapdelta) {
  /**
   * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
   * For licensing, see LICENSE.md.
   */

  'use strict';

  // Deltas require `register` method that require `Batch` class and is defined in batch-base.js.
  // We would like to group all deltas files in one place, so we would only have to include batch.js
  // which would already have all default deltas registered.

  // Import default suite of deltas so a feature have to include only Batch class file.

  var _attributedelta2 = _interopRequireDefault(_attributedelta);

  var _insertdelta2 = _interopRequireDefault(_insertdelta);

  var _mergedelta2 = _interopRequireDefault(_mergedelta);

  var _movedelta2 = _interopRequireDefault(_movedelta);

  var _removedelta2 = _interopRequireDefault(_removedelta);

  var _renamedelta2 = _interopRequireDefault(_renamedelta);

  var _splitdelta2 = _interopRequireDefault(_splitdelta);

  var _unwrapdelta2 = _interopRequireDefault(_unwrapdelta);

  var _weakinsertdelta2 = _interopRequireDefault(_weakinsertdelta);

  var _wrapdelta2 = _interopRequireDefault(_wrapdelta);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
});