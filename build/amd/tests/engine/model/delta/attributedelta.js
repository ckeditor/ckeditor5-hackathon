define('tests', ['/ckeditor5/utils/count.js', '/ckeditor5/engine/model/document.js', '/ckeditor5/engine/model/text.js', '/ckeditor5/engine/model/range.js', '/ckeditor5/engine/model/position.js', '/ckeditor5/engine/model/element.js', '/ckeditor5/engine/model/delta/attributedelta.js', '/ckeditor5/engine/model/operation/attributeoperation.js'], function (_count, _document, _text, _range, _position, _element, _attributedelta, _attributeoperation) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: model, delta */

	'use strict';

	var _count2 = _interopRequireDefault(_count);

	var _document2 = _interopRequireDefault(_document);

	var _text2 = _interopRequireDefault(_text);

	var _range2 = _interopRequireDefault(_range);

	var _position2 = _interopRequireDefault(_position);

	var _element2 = _interopRequireDefault(_element);

	var _attributedelta2 = _interopRequireDefault(_attributedelta);

	var _attributeoperation2 = _interopRequireDefault(_attributeoperation);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	let doc, root;

	beforeEach(() => {
		doc = new _document2.default();
		root = doc.createRoot('root');
	});

	describe('Batch', () => {
		let batch;

		const correctDeltaMatcher = sinon.match(operation => {
			return operation.delta && operation.delta.batch && operation.delta.batch == batch;
		});

		beforeEach(() => {
			batch = doc.batch();
		});

		function getOperationsCount() {
			let totalNumber = 0;

			for (let delta of batch.deltas) {
				totalNumber += (0, _count2.default)(delta.operations);
			}

			return totalNumber;
		}

		describe('change attribute on node', () => {
			let node, text, char;

			beforeEach(() => {
				node = new _element2.default('p', { a: 1 });
				text = new _text2.default('c', { a: 1 });

				root.insertChildren(0, [node, text]);

				char = root.getChild(1);
			});

			describe('setAttr', () => {
				it('should create the attribute on element', () => {
					batch.setAttr('b', 2, node);
					expect(getOperationsCount()).to.equal(1);
					expect(node.getAttribute('b')).to.equal(2);
				});

				it('should change the attribute of element', () => {
					batch.setAttr('a', 2, node);
					expect(getOperationsCount()).to.equal(1);
					expect(node.getAttribute('a')).to.equal(2);
				});

				it('should create the attribute on text node', () => {
					batch.setAttr('b', 2, char);
					expect(getOperationsCount()).to.equal(1);
					expect(root.getChild(1).getAttribute('b')).to.equal(2);
				});

				it('should change the attribute of text node', () => {
					batch.setAttr('a', 2, char);
					expect(getOperationsCount()).to.equal(1);
					expect(root.getChild(1).getAttribute('a')).to.equal(2);
				});

				it('should do nothing if the attribute value is the same', () => {
					batch.setAttr('a', 1, node);
					expect(getOperationsCount()).to.equal(0);
					expect(node.getAttribute('a')).to.equal(1);
				});

				it('should be chainable', () => {
					const chain = batch.setAttr('b', 2, node);
					expect(chain).to.equal(batch);
				});

				it('should add delta to batch and operation to delta before applying operation', () => {
					sinon.spy(doc, 'applyOperation');
					batch.setAttr('b', 2, node);

					expect(doc.applyOperation.calledWith(correctDeltaMatcher)).to.be.true;
				});
			});

			describe('removeAttr', () => {
				it('should remove the attribute from element', () => {
					batch.removeAttr('a', node);
					expect(getOperationsCount()).to.equal(1);
					expect(node.getAttribute('a')).to.be.undefined;
				});

				it('should remove the attribute from character', () => {
					batch.removeAttr('a', char);
					expect(getOperationsCount()).to.equal(1);
					expect(root.getChild(1).getAttribute('a')).to.be.undefined;
				});

				it('should do nothing if the attribute is not set', () => {
					batch.removeAttr('b', node);
					expect(getOperationsCount()).to.equal(0);
				});

				it('should be chainable', () => {
					const chain = batch.removeAttr('a', node);
					expect(chain).to.equal(batch);
				});

				it('should add delta to batch and operation to delta before applying operation', () => {
					sinon.spy(doc, 'applyOperation');
					batch.removeAttr('a', node);

					expect(doc.applyOperation.calledWith(correctDeltaMatcher)).to.be.true;
				});
			});
		});

		describe('change attribute on range', () => {
			beforeEach(() => {
				root.insertChildren(0, [new _text2.default('xxx', { a: 1 }), 'xxx', new _text2.default('xxx', { a: 1 }), new _text2.default('xxx', { a: 2 }), 'xxx', new _text2.default('xxx', { a: 1 }), new _element2.default('e', { a: 2 }, 'xxx'), 'xxx']);
			});

			function getRange(startIndex, endIndex) {
				return new _range2.default(_position2.default.createFromParentAndOffset(root, startIndex), _position2.default.createFromParentAndOffset(root, endIndex));
			}

			function getChangesAttrsCount() {
				let totalNumber = 0;

				for (let delta of batch.deltas) {
					for (let operation of delta.operations) {
						totalNumber += (0, _count2.default)(operation.range.getItems({ singleCharacters: true }));
					}
				}

				return totalNumber;
			}

			function getCompressedAttrs() {
				// default: 111---111222---1112------
				const range = _range2.default.createFromElement(root);

				return Array.from(range.getItems({ singleCharacters: true })).map(item => item.getAttribute('a') || '-').join('');
			}

			describe('setAttr', () => {
				it('should set the attribute on the range', () => {
					batch.setAttr('a', 3, getRange(3, 6));
					expect(getOperationsCount()).to.equal(1);
					expect(getChangesAttrsCount()).to.equal(3);
					expect(getCompressedAttrs()).to.equal('111333111222---1112------');
				});

				it('should split the operations if parts of the range have different attributes', () => {
					batch.setAttr('a', 3, getRange(4, 14));
					expect(getOperationsCount()).to.equal(4);
					expect(getChangesAttrsCount()).to.equal(10);
					expect(getCompressedAttrs()).to.equal('111-3333333333-1112------');
				});

				it('should split the operations if parts of the part of the range have the attribute', () => {
					batch.setAttr('a', 2, getRange(4, 14));
					expect(getOperationsCount()).to.equal(3);
					expect(getChangesAttrsCount()).to.equal(7);
					expect(getCompressedAttrs()).to.equal('111-2222222222-1112------');
				});

				it('should strip the range if the beginning have the attribute', () => {
					batch.setAttr('a', 1, getRange(1, 5));
					expect(getOperationsCount()).to.equal(1);
					expect(getChangesAttrsCount()).to.equal(2);
					expect(getCompressedAttrs()).to.equal('11111-111222---1112------');
				});

				it('should strip the range if the ending have the attribute', () => {
					batch.setAttr('a', 1, getRange(13, 17));
					expect(getOperationsCount()).to.equal(1);
					expect(getChangesAttrsCount()).to.equal(2);
					expect(getCompressedAttrs()).to.equal('111---111222-111112------');
				});

				it('should do nothing if the range has attribute', () => {
					batch.setAttr('a', 1, getRange(0, 3));
					expect(getOperationsCount()).to.equal(0);
					expect(getCompressedAttrs()).to.equal('111---111222---1112------');
				});

				it('should not check range\'s start position node when creating operations', () => {
					let range = new _range2.default(new _position2.default(root, [18, 1]), new _position2.default(root, [19]));

					batch.setAttr('a', 1, range);
					expect(getOperationsCount()).to.equal(1);
					expect(getChangesAttrsCount()).to.equal(2);
					expect(getCompressedAttrs()).to.equal('111---111222---1112-11---');
				});

				it('should not change elements attribute if range contains closing tag', () => {
					let range = new _range2.default(new _position2.default(root, [18, 1]), new _position2.default(root, [21]));

					batch.setAttr('a', 1, range);
					expect(getOperationsCount()).to.equal(1);
					expect(getChangesAttrsCount()).to.equal(4);
					expect(getCompressedAttrs()).to.equal('111---111222---1112-1111-');
				});

				it('should not create an operation if the range contains only closing tag', () => {
					let range = new _range2.default(new _position2.default(root, [18, 3]), new _position2.default(root, [19]));

					batch.setAttr('a', 3, range);
					expect(getOperationsCount()).to.equal(0);
					expect(getCompressedAttrs()).to.equal('111---111222---1112------');
				});

				it('should not create an operation if is collapsed', () => {
					batch.setAttr('a', 1, getRange(3, 3));
					expect(getOperationsCount()).to.equal(0);
					expect(getCompressedAttrs()).to.equal('111---111222---1112------');
				});

				it('should create a proper operations for the mixed range', () => {
					batch.setAttr('a', 1, getRange(0, 20));
					expect(getOperationsCount()).to.equal(5);
					expect(getChangesAttrsCount()).to.equal(14);
					expect(getCompressedAttrs()).to.equal('11111111111111111111111--');
				});

				it('should be chainable', () => {
					const chain = batch.setAttr('a', 3, getRange(3, 6));
					expect(chain).to.equal(batch);
				});

				it('should add delta to batch and operation to delta before applying operation', () => {
					sinon.spy(doc, 'applyOperation');
					batch.setAttr('a', 3, getRange(3, 6));

					expect(doc.applyOperation.calledWith(correctDeltaMatcher)).to.be.true;
				});
			});

			describe('removeAttr', () => {
				it('should remove the attribute on the range', () => {
					batch.removeAttr('a', getRange(0, 2));
					expect(getOperationsCount()).to.equal(1);
					expect(getChangesAttrsCount()).to.equal(2);
					expect(getCompressedAttrs()).to.equal('--1---111222---1112------');
				});

				it('should split the operations if parts of the range have different attributes', () => {
					batch.removeAttr('a', getRange(7, 11));
					expect(getOperationsCount()).to.equal(2);
					expect(getChangesAttrsCount()).to.equal(4);
					expect(getCompressedAttrs()).to.equal('111---1----2---1112------');
				});

				it('should split the operations if parts of the part of the range have no attribute', () => {
					batch.removeAttr('a', getRange(1, 7));
					expect(getOperationsCount()).to.equal(2);
					expect(getChangesAttrsCount()).to.equal(3);
					expect(getCompressedAttrs()).to.equal('1------11222---1112------');
				});

				it('should strip the range if the beginning have no attribute', () => {
					batch.removeAttr('a', getRange(4, 12));
					expect(getOperationsCount()).to.equal(2);
					expect(getChangesAttrsCount()).to.equal(6);
					expect(getCompressedAttrs()).to.equal('111------------1112------');
				});

				it('should strip the range if the ending have no attribute', () => {
					batch.removeAttr('a', getRange(7, 15));
					expect(getOperationsCount()).to.equal(2);
					expect(getChangesAttrsCount()).to.equal(5);
					expect(getCompressedAttrs()).to.equal('111---1--------1112------');
				});

				it('should do nothing if the range has no attribute', () => {
					batch.removeAttr('a', getRange(4, 5));
					expect(getOperationsCount()).to.equal(0);
					expect(getCompressedAttrs()).to.equal('111---111222---1112------');
				});

				it('should not check range\'s start position node when creating operations', () => {
					let range = new _range2.default(new _position2.default(root, [18, 3]), new _position2.default(root, [19]));

					batch.removeAttr('a', range);
					expect(getOperationsCount()).to.equal(0);
					expect(getChangesAttrsCount()).to.equal(0);
					expect(getCompressedAttrs()).to.equal('111---111222---1112------');
				});

				it('should not apply operation twice in the range contains opening and closing tags', () => {
					batch.removeAttr('a', getRange(18, 22));
					expect(getOperationsCount()).to.equal(1);
					expect(getChangesAttrsCount()).to.equal(1);
					expect(getCompressedAttrs()).to.equal('111---111222---111-------');
				});

				it('should not create an operation if range is collapsed', () => {
					batch.removeAttr('a', getRange(3, 3));
					expect(getOperationsCount()).to.equal(0);
					expect(getCompressedAttrs()).to.equal('111---111222---1112------');
				});

				it('should create a proper operations for the mixed range', () => {
					batch.removeAttr('a', getRange(3, 15));
					expect(getOperationsCount()).to.equal(2);
					expect(getChangesAttrsCount()).to.equal(6);
					expect(getCompressedAttrs()).to.equal('111------------1112------');
				});

				it('should be chainable', () => {
					const chain = batch.removeAttr('a', getRange(0, 2));
					expect(chain).to.equal(batch);
				});

				it('should add delta to batch and operation to delta before applying operation', () => {
					sinon.spy(doc, 'applyOperation');
					batch.removeAttr('a', getRange(0, 2));

					expect(doc.applyOperation.calledWith(correctDeltaMatcher)).to.be.true;
				});
			});
		});

		describe('change attribute on root element', () => {
			describe('setAttr', () => {
				it('should create the attribute on root', () => {
					batch.setAttr('b', 2, root);
					expect(getOperationsCount()).to.equal(1);
					expect(root.getAttribute('b')).to.equal(2);
				});

				it('should change the attribute of root', () => {
					batch.setAttr('a', 2, root);
					expect(getOperationsCount()).to.equal(1);
					expect(root.getAttribute('a')).to.equal(2);
				});

				it('should do nothing if the attribute value is the same', () => {
					batch.setAttr('a', 1, root);
					expect(getOperationsCount()).to.equal(1);
					batch.setAttr('a', 1, root);
					expect(getOperationsCount()).to.equal(1);
					expect(root.getAttribute('a')).to.equal(1);
				});
			});

			describe('removeAttr', () => {
				it('should remove the attribute from root', () => {
					batch.setAttr('a', 1, root);
					batch.removeAttr('a', root);
					expect(getOperationsCount()).to.equal(2);
					expect(root.getAttribute('a')).to.be.undefined;
				});

				it('should do nothing if the attribute is not set', () => {
					batch.removeAttr('b', root);
					expect(getOperationsCount()).to.equal(0);
				});
			});
		});
	});

	describe('AttributeDelta', () => {
		let delta;

		beforeEach(() => {
			delta = new _attributedelta2.default();
		});

		describe('key', () => {
			it('should be null if there are no operations in delta', () => {
				expect(delta.key).to.be.null;
			});

			it('should be equal to attribute operations key that are in delta', () => {
				let range = new _range2.default(new _position2.default(root, [1]), new _position2.default(root, [2]));
				delta.addOperation(new _attributeoperation2.default(range, 'key', 'old', 'new', 0));

				expect(delta.key).to.equal('key');
			});
		});

		describe('value', () => {
			it('should be null if there are no operations in delta', () => {
				expect(delta.value).to.be.null;
			});

			it('should be equal to the value set by the delta operations', () => {
				let range = new _range2.default(new _position2.default(root, [1]), new _position2.default(root, [2]));
				delta.addOperation(new _attributeoperation2.default(range, 'key', 'old', 'new', 0));

				expect(delta.value).to.equal('new');
			});
		});

		describe('range', () => {
			it('should be null if there are no operations in delta', () => {
				expect(delta.range).to.be.null;
			});

			it('should be equal to the range on which delta operates', () => {
				// Delta operates on range [ 1 ] to [ 6 ] but omits [ 4 ] - [ 5 ] for "a reason".
				// Still the range should be from [ 1 ] to [ 6 ]. Delta may not apply anything on [ 4 ] - [ 5 ]
				// because it already has proper attribute.
				let rangeA = new _range2.default(new _position2.default(root, [1]), new _position2.default(root, [2]));
				let rangeB = new _range2.default(new _position2.default(root, [2]), new _position2.default(root, [4]));
				let rangeC = new _range2.default(new _position2.default(root, [5]), new _position2.default(root, [6]));

				delta.addOperation(new _attributeoperation2.default(rangeA, 'key', 'oldA', 'new', 0));
				delta.addOperation(new _attributeoperation2.default(rangeB, 'key', 'oldB', 'new', 1));
				delta.addOperation(new _attributeoperation2.default(rangeC, 'key', 'oldC', 'new', 2));

				expect(delta.range.start.path).to.deep.equal([1]);
				expect(delta.range.end.path).to.deep.equal([6]);
			});
		});

		describe('getReversed', () => {
			it('should return empty AttributeDelta if there are no operations in delta', () => {
				let reversed = delta.getReversed();

				expect(reversed).to.be.instanceof(_attributedelta2.default);
				expect(reversed.operations.length).to.equal(0);
			});

			it('should return correct AttributeDelta', () => {
				let rangeA = new _range2.default(new _position2.default(root, [1]), new _position2.default(root, [2]));
				let rangeB = new _range2.default(new _position2.default(root, [2]), new _position2.default(root, [4]));

				delta.addOperation(new _attributeoperation2.default(rangeA, 'key', 'oldA', 'new', 0));
				delta.addOperation(new _attributeoperation2.default(rangeB, 'key', 'oldB', 'new', 1));

				let reversed = delta.getReversed();

				expect(reversed).to.be.instanceof(_attributedelta2.default);
				expect(reversed.operations.length).to.equal(2);

				// Remember about reversed operations order.
				expect(reversed.operations[0]).to.be.instanceof(_attributeoperation2.default);
				expect(reversed.operations[0].range.isEqual(rangeB)).to.be.true;
				expect(reversed.operations[0].key).to.equal('key');
				expect(reversed.operations[0].oldValue).to.equal('new');
				expect(reversed.operations[0].newValue).to.equal('oldB');

				expect(reversed.operations[1]).to.be.instanceof(_attributeoperation2.default);
				expect(reversed.operations[1].range.isEqual(rangeA)).to.be.true;
				expect(reversed.operations[1].key).to.equal('key');
				expect(reversed.operations[1].oldValue).to.equal('new');
				expect(reversed.operations[1].newValue).to.equal('oldA');
			});
		});

		it('should provide proper className', () => {
			expect(_attributedelta2.default.className).to.equal('engine.model.delta.AttributeDelta');
		});
	});

	describe('RootAttributeDelta', () => {
		it('should provide proper className', () => {
			expect(_attributedelta.RootAttributeDelta.className).to.equal('engine.model.delta.RootAttributeDelta');
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
