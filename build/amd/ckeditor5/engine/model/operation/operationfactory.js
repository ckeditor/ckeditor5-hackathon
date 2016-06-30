define(['exports', '../operation/attributeoperation.js', '../operation/insertoperation.js', '../operation/moveoperation.js', '../operation/nooperation.js', '../operation/operation.js', '../operation/reinsertoperation.js', '../operation/removeoperation.js', '../operation/rootattributeoperation.js'], function (exports, _attributeoperation, _insertoperation, _moveoperation, _nooperation, _operation, _reinsertoperation, _removeoperation, _rootattributeoperation) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _attributeoperation2 = _interopRequireDefault(_attributeoperation);

	var _insertoperation2 = _interopRequireDefault(_insertoperation);

	var _moveoperation2 = _interopRequireDefault(_moveoperation);

	var _nooperation2 = _interopRequireDefault(_nooperation);

	var _operation2 = _interopRequireDefault(_operation);

	var _reinsertoperation2 = _interopRequireDefault(_reinsertoperation);

	var _removeoperation2 = _interopRequireDefault(_removeoperation);

	var _rootattributeoperation2 = _interopRequireDefault(_rootattributeoperation);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	const operations = {};
	operations[_attributeoperation2.default.className] = _attributeoperation2.default;
	operations[_insertoperation2.default.className] = _insertoperation2.default;
	operations[_moveoperation2.default.className] = _moveoperation2.default;
	operations[_nooperation2.default.className] = _nooperation2.default;
	operations[_operation2.default.className] = _operation2.default;
	operations[_reinsertoperation2.default.className] = _reinsertoperation2.default;
	operations[_removeoperation2.default.className] = _removeoperation2.default;
	operations[_rootattributeoperation2.default.className] = _rootattributeoperation2.default;

	/**
  * A factory class for creating operations.
  *
  * @abstract
  * @memberOf engine.model.operation
  */
	class OperationFactory {
		/**
   * Creates concrete Operation object from deserilized object, i.e. from parsed JSON string.
   *
   * @param {Object} json Deserialized JSON object.
   * @param {engine.model.Document} document Document on which this operation will be applied.
   * @returns {engine.model.operation.Operation}
   */
		static fromJSON(json, document) {
			return operations[json.__className].fromJSON(json, document);
		}
	}
	exports.default = OperationFactory;
});