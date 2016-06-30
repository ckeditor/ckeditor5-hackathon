define(['exports', './insertoperation.js', './attributeoperation.js', './rootattributeoperation.js', './moveoperation.js', './removeoperation.js', './nooperation.js', '../range.js', '../../../utils/lib/lodash/isEqual.js', '../../../utils/comparearrays.js'], function (exports, _insertoperation, _attributeoperation, _rootattributeoperation, _moveoperation, _removeoperation, _nooperation, _range, _isEqual, _comparearrays) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _insertoperation2 = _interopRequireDefault(_insertoperation);

	var _attributeoperation2 = _interopRequireDefault(_attributeoperation);

	var _rootattributeoperation2 = _interopRequireDefault(_rootattributeoperation);

	var _moveoperation2 = _interopRequireDefault(_moveoperation);

	var _removeoperation2 = _interopRequireDefault(_removeoperation);

	var _nooperation2 = _interopRequireDefault(_nooperation);

	var _range2 = _interopRequireDefault(_range);

	var _isEqual2 = _interopRequireDefault(_isEqual);

	var _comparearrays2 = _interopRequireDefault(_comparearrays);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	exports.default = transform;


	const ot = {
		InsertOperation: {
			// Transforms InsertOperation `a` by InsertOperation `b`. Accepts a flag stating whether `a` is more important
			// than `b` when it comes to resolving conflicts. Returns results as an array of operations.
			InsertOperation(a, b, isStrong) {
				// Transformed operations are always new instances, not references to the original operations.
				const transformed = a.clone();

				// Transform insert position by the other operation position.
				transformed.position = transformed.position.getTransformedByInsertion(b.position, b.nodeList.length, !isStrong);

				return [transformed];
			},

			AttributeOperation: doNotUpdate,

			RootAttributeOperation: doNotUpdate,

			// Transforms InsertOperation `a` by MoveOperation `b`. Accepts a flag stating whether `a` is more important
			// than `b` when it comes to resolving conflicts. Returns results as an array of operations.
			MoveOperation(a, b, isStrong) {
				const transformed = a.clone();

				// Transform insert position by the other operation parameters.
				transformed.position = a.position.getTransformedByMove(b.sourcePosition, b.targetPosition, b.howMany, !isStrong, b.isSticky);

				return [transformed];
			}
		},

		AttributeOperation: {
			// Transforms AttributeOperation `a` by InsertOperation `b`. Returns results as an array of operations.
			InsertOperation(a, b) {
				// Transform this operation's range.
				const ranges = a.range.getTransformedByInsertion(b.position, b.nodeList.length, true, false);

				// Map transformed range(s) to operations and return them.
				return ranges.reverse().map(range => {
					return new _attributeoperation2.default(range, a.key, a.oldValue, a.newValue, a.baseVersion);
				});
			},

			// Transforms AttributeOperation `a` by AttributeOperation `b`. Accepts a flag stating whether `a` is more important
			// than `b` when it comes to resolving conflicts. Returns results as an array of operations.
			AttributeOperation(a, b, isStrong) {
				if (a.key === b.key) {
					// If operations attributes are in conflict, check if their ranges intersect and manage them properly.

					// First, we want to apply change to the part of a range that has not been changed by the other operation.
					let operations = a.range.getDifference(b.range).map(range => {
						return new _attributeoperation2.default(range, a.key, a.oldValue, a.newValue, a.baseVersion);
					});

					// Then we take care of the common part of ranges, but only if operations has different `newValue`.
					if (isStrong && !(0, _isEqual2.default)(a.newValue, b.newValue)) {
						// If this operation is more important, we also want to apply change to the part of the
						// original range that has already been changed by the other operation. Since that range
						// got changed we also have to update `oldValue`.
						const common = a.range.getIntersection(b.range);

						if (common !== null) {
							operations.push(new _attributeoperation2.default(common, b.key, b.oldValue, a.newValue, a.baseVersion));
						}
					}

					// If no operations has been added nothing should get updated, but since we need to return
					// an instance of Operation we add NoOperation to the array.
					if (operations.length === 0) {
						operations.push(new _nooperation2.default(a.baseVersion));
					}

					return operations;
				} else {
					// If operations don't conflict, simply return an array containing just a clone of this operation.
					return [a.clone()];
				}
			},

			RootAttributeOperation: doNotUpdate,

			// Transforms AttributeOperation `a` by MoveOperation `b`. Returns results as an array of operations.
			MoveOperation(a, b) {
				// Convert MoveOperation properties into a range.
				const rangeB = _range2.default.createFromPositionAndShift(b.sourcePosition, b.howMany);

				// This will aggregate transformed ranges.
				let ranges = [];

				// Difference is a part of changed range that is modified by AttributeOperation but is not affected
				// by MoveOperation. This can be zero, one or two ranges (if moved range is inside changed range).
				// Right now we will make a simplification and join difference ranges and transform them as one. We will cover rangeB later.
				const difference = joinRanges(a.range.getDifference(rangeB));

				// Common is a range of nodes that is affected by MoveOperation. So it got moved to other place.
				const common = a.range.getIntersection(rangeB);

				if (difference !== null) {
					// MoveOperation removes nodes from their original position. We acknowledge this by proper transformation.
					// Take the start and the end of the range and transform them by deletion of moved nodes.
					// Note that if rangeB was inside AttributeOperation range, only difference.end will be transformed.
					// This nicely covers the joining simplification we did in the previous step.
					difference.start = difference.start.getTransformedByDeletion(b.sourcePosition, b.howMany);
					difference.end = difference.end.getTransformedByDeletion(b.sourcePosition, b.howMany);

					// MoveOperation pastes nodes into target position. We acknowledge this by proper transformation.
					// Note that since we operate on transformed difference range, we should transform by
					// previously transformed target position.
					// Note that we do not use Position.getTransformedByMove on range boundaries because we need to
					// transform by insertion a range as a whole, since newTargetPosition might be inside that range.
					ranges = difference.getTransformedByInsertion(b.movedRangeStart, b.howMany, true, false).reverse();
				}

				if (common !== null) {
					// Here we do not need to worry that newTargetPosition is inside moved range, because that
					// would mean that the MoveOperation targets into itself, and that is incorrect operation.
					// Instead, we calculate the new position of that part of original range.
					common.start = common.start._getCombined(b.sourcePosition, b.movedRangeStart);
					common.end = common.end._getCombined(b.sourcePosition, b.movedRangeStart);

					ranges.push(common);
				}

				// Map transformed range(s) to operations and return them.
				return ranges.map(range => {
					return new _attributeoperation2.default(range, a.key, a.oldValue, a.newValue, a.baseVersion);
				});
			}
		},

		RootAttributeOperation: {
			InsertOperation: doNotUpdate,

			AttributeOperation: doNotUpdate,

			// Transforms RootAttributeOperation `a` by RootAttributeOperation `b`. Accepts a flag stating whether `a` is more important
			// than `b` when it comes to resolving conflicts. Returns results as an array of operations.
			RootAttributeOperation(a, b, isStrong) {
				if (a.root === b.root && a.key === b.key) {
					if (a.newValue !== b.newValue && !isStrong || a.newValue === b.newValue) {
						return [new _nooperation2.default(a.baseVersion)];
					}
				}

				return [a.clone()];
			},

			MoveOperation: doNotUpdate
		},

		MoveOperation: {
			// Transforms MoveOperation `a` by InsertOperation `b`. Accepts a flag stating whether `a` is more important
			// than `b` when it comes to resolving conflicts. Returns results as an array of operations.
			InsertOperation(a, b, isStrong) {
				// Create range from MoveOperation properties and transform it by insertion.
				let range = _range2.default.createFromPositionAndShift(a.sourcePosition, a.howMany);
				range = range.getTransformedByInsertion(b.position, b.nodeList.length, false, a.isSticky)[0];

				let result = new a.constructor(range.start, range.end.offset - range.start.offset, a instanceof _removeoperation2.default ? a.baseVersion : a.targetPosition.getTransformedByInsertion(b.position, b.nodeList.length, !isStrong), a instanceof _removeoperation2.default ? undefined : a.baseVersion);

				result.isSticky = a.isSticky;

				return [result];
			},

			AttributeOperation: doNotUpdate,

			RootAttributeOperation: doNotUpdate,

			// Transforms MoveOperation `a` by MoveOperation `b`. Accepts a flag stating whether `a` is more important
			// than `b` when it comes to resolving conflicts. Returns results as an array of operations.
			MoveOperation(a, b, isStrong) {
				// Special case when both move operations' target positions are inside nodes that are
				// being moved by the other move operation. So in other words, we move ranges into inside of each other.
				// This case can't be solved reasonably (on the other hand, it should not happen often).
				if (moveTargetIntoMovedRange(a, b) && moveTargetIntoMovedRange(b, a)) {
					// Instead of transforming operation, we return a reverse of the operation that we transform by.
					// So when the results of this "transformation" will be applied, `b` MoveOperation will get reversed.
					return [b.getReversed()];
				}

				// If one of operations is actually a remove operation, we force remove operation to be the "stronger" one
				// to provide more expected results.
				if (a instanceof _removeoperation2.default && !(b instanceof _removeoperation2.default)) {
					isStrong = true;
				} else if (!(a instanceof _removeoperation2.default) && b instanceof _removeoperation2.default) {
					isStrong = false;
				}

				// Create ranges from MoveOperations properties.
				const rangeA = _range2.default.createFromPositionAndShift(a.sourcePosition, a.howMany);
				const rangeB = _range2.default.createFromPositionAndShift(b.sourcePosition, b.howMany);

				// This will aggregate transformed ranges.
				let ranges = [];

				// All the other non-special cases are treated by generic algorithm below.
				let difference = joinRanges(rangeA.getDifference(rangeB));

				if (difference) {
					difference.start = difference.start.getTransformedByMove(b.sourcePosition, b.targetPosition, b.howMany, !a.isSticky, false);
					difference.end = difference.end.getTransformedByMove(b.sourcePosition, b.targetPosition, b.howMany, a.isSticky, false);

					ranges.push(difference);
				}

				// Then, we have to manage the common part of both move ranges.
				const common = rangeA.getIntersection(rangeB);

				// If MoveOperations has common range it can be one of two:
				// * on the same tree level - it means that we move the same nodes into different places
				// * on deeper tree level - it means that we move nodes that are inside moved nodes
				// The operations are conflicting only if they try to move exactly same nodes, so only in the first case.
				// That means that we transform common part in two cases:
				// * `rangeA` is "deeper" than `rangeB` so it does not collide
				// * `rangeA` is at the same level but is stronger than `rangeB`.
				let aCompB = (0, _comparearrays2.default)(a.sourcePosition.getParentPath(), b.sourcePosition.getParentPath());

				// If the `b` MoveOperation points inside the `a` MoveOperation range, the common part will be included in
				// range(s) that (is) are results of processing `difference`. If that's the case, we cannot include it again.
				let bTargetsToA = rangeA.containsPosition(b.targetPosition) || rangeA.start.isEqual(b.targetPosition) && a.isSticky || rangeA.end.isEqual(b.targetPosition) && a.isSticky;

				// If the `b` MoveOperation range contains both whole `a` range and target position we do an exception and
				// transform `a` operation. Normally, when same nodes are moved, we stick with stronger operation's target.
				// Here it is a move inside larger range so there is no conflict because after all, all nodes from
				// smaller range will be moved to larger range target. The effect of this transformation feels natural.
				let aIsInside = rangeB.containsRange(rangeA) && rangeB.containsPosition(a.targetPosition);

				if (common !== null && (aCompB === 'EXTENSION' || aCompB === 'SAME' && isStrong || aIsInside) && !bTargetsToA) {
					// Here we do not need to worry that newTargetPosition is inside moved range, because that
					// would mean that the MoveOperation targets into itself, and that is incorrect operation.
					// Instead, we calculate the new position of that part of original range.
					common.start = common.start._getCombined(b.sourcePosition, b.movedRangeStart);
					common.end = common.end._getCombined(b.sourcePosition, b.movedRangeStart);

					// We have to take care of proper range order.
					if (difference && difference.start.isBefore(common.start)) {
						ranges.push(common);
					} else {
						ranges.unshift(common);
					}
				}

				// At this point we transformed this operation's source ranges it means that nothing should be changed.
				// But since we need to return an instance of Operation we return an array with NoOperation.
				if (ranges.length === 0) {
					return [new _nooperation2.default(a.baseVersion)];
				}

				// Target position also could be affected by the other MoveOperation. We will transform it.
				let newTargetPosition = a.targetPosition.getTransformedByMove(b.sourcePosition, b.targetPosition, b.howMany, !isStrong, b.isSticky);

				// Map transformed range(s) to operations and return them.
				return ranges.reverse().map(range => {
					// We want to keep correct operation class.
					let result = new a.constructor(range.start, range.end.offset - range.start.offset, a instanceof _removeoperation2.default ? a.baseVersion : newTargetPosition, a instanceof _removeoperation2.default ? undefined : a.baseVersion);

					result.isSticky = a.isSticky;

					return result;
				});
			}
		}
	};

	function transform(a, b, isStrong) {
		let group;
		let algorithm;

		if (a instanceof _insertoperation2.default) {
			group = ot.InsertOperation;
		} else if (a instanceof _attributeoperation2.default) {
			group = ot.AttributeOperation;
		} else if (a instanceof _rootattributeoperation2.default) {
			group = ot.RootAttributeOperation;
		} else if (a instanceof _moveoperation2.default) {
			group = ot.MoveOperation;
		} else {
			algorithm = doNotUpdate;
		}

		if (group) {
			if (b instanceof _insertoperation2.default) {
				algorithm = group.InsertOperation;
			} else if (b instanceof _attributeoperation2.default) {
				algorithm = group.AttributeOperation;
			} else if (b instanceof _rootattributeoperation2.default) {
				algorithm = group.RootAttributeOperation;
			} else if (b instanceof _moveoperation2.default) {
				algorithm = group.MoveOperation;
			} else {
				algorithm = doNotUpdate;
			}
		}

		let transformed = algorithm(a, b, isStrong);

		return updateBaseVersions(a.baseVersion, transformed);
	}

	// When we don't want to update an operation, we create and return a clone of it.
	// Returns the operation in "unified format" - wrapped in an Array.
	function doNotUpdate(operation) {
		return [operation.clone()];
	}

	// Takes an Array of operations and sets consecutive base versions for them, starting from given base version.
	// Returns the passed array.
	function updateBaseVersions(baseVersion, operations) {
		for (let i = 0; i < operations.length; i++) {
			operations[i].baseVersion = baseVersion + i + 1;
		}

		return operations;
	}

	// Checks whether MoveOperation targetPosition is inside a node from the moved range of the other MoveOperation.
	function moveTargetIntoMovedRange(a, b) {
		return a.targetPosition.getTransformedByDeletion(b.sourcePosition, b.howMany) === null;
	}

	// Gets an array of Ranges and produces one Range out of it. The root of a new range will be same as
	// the root of the first range in the array. If any of given ranges has different root than the first range,
	// it will be discarded.
	function joinRanges(ranges) {
		if (ranges.length === 0) {
			return null;
		} else if (ranges.length == 1) {
			return ranges[0];
		} else {
			ranges[0].end = ranges[ranges.length - 1].end;

			return ranges[0];
		}
	}
});