define(['exports', '../../utils/mix.js', '../../utils/isiterable.js', '../../utils/emittermixin.js'], function (exports, _mix, _isiterable, _emittermixin) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _mix2 = _interopRequireDefault(_mix);

	var _isiterable2 = _interopRequireDefault(_isiterable);

	var _emittermixin2 = _interopRequireDefault(_emittermixin);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * DocumentFragment class.
  *
  * @memberOf engine.view
  */
	class DocumentFragment {
		/**
   * Creates new DocumentFragment instance.
   *
   * @param {engine.view.Node|Iterable.<engine.view.Node>} [children] List of nodes to be inserted into
   * created document fragment.
   */
		constructor(children) {
			/**
    * Array of child nodes.
    *
    * @protected
    * @member {Array.<engine.view.Element>} engine.view.DocumentFragment#_children
    */
			this._children = [];

			if (children) {
				this.insertChildren(0, children);
			}
		}

		/**
   * Iterates over nodes added to this DocumentFragment.
   */
		[Symbol.iterator]() {
			return this._children[Symbol.iterator]();
		}

		/**
   * {@link engine.view.DocumentFragment#insertChildren Insert} a child node or a list of child nodes at the end
   * and sets the parent of these nodes to this fragment.
   *
   * @param {engine.view.Node|Iterable.<engine.view.Node>} nodes Node or the list of nodes to be inserted.
   * @returns {Number} Number of appended nodes.
   */
		appendChildren(nodes) {
			return this.insertChildren(this.getChildCount(), nodes);
		}

		/**
   * Gets child at the given index.
   *
   * @param {Number} index Index of child.
   * @returns {engine.view.Node} Child node.
   */
		getChild(index) {
			return this._children[index];
		}

		/**
   * Gets the number of elements in fragment.
   *
   * @returns {Number} The number of elements.
   */
		getChildCount() {
			return this._children.length;
		}

		/**
   * Gets index of the given child node. Returns `-1` if child node is not found.
   *
   * @param {engine.view.Node} node Child node.
   * @returns {Number} Index of the child node.
   */
		getChildIndex(node) {
			return this._children.indexOf(node);
		}

		/**
   * Gets child nodes iterator.
   *
   * @returns {Iterable.<engine.view.Node>} Child nodes iterator.
   */
		getChildren() {
			return this._children[Symbol.iterator]();
		}

		/**
   * Inserts a child node or a list of child nodes on the given index and sets the parent of these nodes to
   * this fragment.
   *
   * @param {Number} index Position where nodes should be inserted.
   * @param {engine.view.Node|Iterable.<engine.view.Node>} nodes Node or list of nodes to be inserted.
   * @returns {Number} Number of inserted nodes.
   */
		insertChildren(index, nodes) {
			this._fireChange('children', this);
			let count = 0;

			if (!(0, _isiterable2.default)(nodes)) {
				nodes = [nodes];
			}

			for (let node of nodes) {
				node.parent = this;

				this._children.splice(index, 0, node);
				index++;
				count++;
			}

			return count;
		}

		/**
   * Removes number of child nodes starting at the given index and set the parent of these nodes to `null`.
   *
   * @param {Number} index Number of the first node to remove.
   * @param {Number} [howMany=1] Number of nodes to remove.
   * @returns {Array.<engine.view.Node>} The array of removed nodes.
   */
		removeChildren(index, howMany = 1) {
			this._fireChange('children', this);

			for (let i = index; i < index + howMany; i++) {
				this._children[i].parent = null;
			}

			return this._children.splice(index, howMany);
		}

		/**
   * Fires `change` event with given type of the change.
   *
   * @private
   * @param {engine.view.ChangeType} type Type of the change.
   * @param {engine.view.Node} node Changed node.
   * @fires engine.view.Node#change
   */
		_fireChange(type, node) {
			this.fire('change', type, node);
		}
	}

	exports.default = DocumentFragment;
	(0, _mix2.default)(DocumentFragment, _emittermixin2.default);
});