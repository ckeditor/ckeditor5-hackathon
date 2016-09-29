define(['exports', './delta.js', './deltafactory.js', '../batch.js', '../operation/insertoperation.js', '../operation/removeoperation.js', '../operation/moveoperation.js', '../element.js', '../position.js'], function (exports, _delta, _deltafactory, _batch, _insertoperation, _removeoperation, _moveoperation, _element, _position) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _delta2 = _interopRequireDefault(_delta);

	var _deltafactory2 = _interopRequireDefault(_deltafactory);

	var _insertoperation2 = _interopRequireDefault(_insertoperation);

	var _removeoperation2 = _interopRequireDefault(_removeoperation);

	var _moveoperation2 = _interopRequireDefault(_moveoperation);

	var _element2 = _interopRequireDefault(_element);

	var _position2 = _interopRequireDefault(_position);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * To provide specific OT behavior and better collisions solving, the {@link engine.model.Batch#rename Batch#rename} method
  * uses the `RenameDelta` class which inherits from the `Delta` class and may overwrite some methods.
  *
  * @memberOf engine.model.delta
  */
	class RenameDelta extends _delta2.default {
		get _reverseDeltaClass() {
			return RenameDelta;
		}

		/**
   * @inheritDoc
   */
		static get className() {
			return 'engine.model.delta.RenameDelta';
		}
	}

	exports.default = RenameDelta;
	function apply(batch, delta, operation) {
		batch.addDelta(delta);
		delta.addOperation(operation);
		batch.doc.applyOperation(operation);
	}

	/**
  * Renames the given element.
  *
  * @chainable
  * @method engine.model.Batch#rename
  * @param {String} newName New element name.
  * @param {engine.model.Element} element The element to rename.
  */
	(0, _batch.register)('rename', function (newName, element) {
		const delta = new RenameDelta();
		const newElement = new _element2.default(newName);

		apply(this, delta, new _insertoperation2.default(_position2.default.createAfter(element), newElement, this.doc.version));

		apply(this, delta, new _moveoperation2.default(_position2.default.createAt(element), element.getChildCount(), _position2.default.createAt(newElement), this.doc.version));

		apply(this, delta, new _removeoperation2.default(_position2.default.createBefore(element), 1, this.doc.version));

		return this;
	});

	_deltafactory2.default.register(RenameDelta);
});