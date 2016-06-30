define('tests', ['/ckeditor5/engine/conversion/mapper.js', '/ckeditor5/engine/model/element.js', '/ckeditor5/engine/model/rootelement.js', '/ckeditor5/engine/model/text.js', '/ckeditor5/engine/model/position.js', '/ckeditor5/engine/model/range.js', '/ckeditor5/engine/view/element.js', '/ckeditor5/engine/view/text.js', '/ckeditor5/engine/view/position.js', '/ckeditor5/engine/view/range.js'], function (_mapper, _element, _rootelement, _text, _position, _range, _element3, _text3, _position3, _range3) {
	/**
  * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: conversion */

	'use strict';

	var _mapper2 = _interopRequireDefault(_mapper);

	var _element2 = _interopRequireDefault(_element);

	var _rootelement2 = _interopRequireDefault(_rootelement);

	var _text2 = _interopRequireDefault(_text);

	var _position2 = _interopRequireDefault(_position);

	var _range2 = _interopRequireDefault(_range);

	var _element4 = _interopRequireDefault(_element3);

	var _text4 = _interopRequireDefault(_text3);

	var _position4 = _interopRequireDefault(_position3);

	var _range4 = _interopRequireDefault(_range3);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('Mapper', () => {
		describe('clearBindings', () => {
			it('should remove all mapping', () => {
				const viewA = new _element4.default('a');
				const viewB = new _element4.default('b');
				const viewC = new _element4.default('c');

				const modelA = new _element2.default('a');
				const modelB = new _element2.default('b');
				const modelC = new _element2.default('c');

				const mapper = new _mapper2.default();
				mapper.bindElements(modelA, viewA);
				mapper.bindElements(modelB, viewB);
				mapper.bindElements(modelC, viewC);

				expect(mapper.toModelElement(viewA)).to.equal(modelA);
				expect(mapper.toModelElement(viewB)).to.equal(modelB);
				expect(mapper.toModelElement(viewC)).to.equal(modelC);

				expect(mapper.toViewElement(modelA)).to.equal(viewA);
				expect(mapper.toViewElement(modelB)).to.equal(viewB);
				expect(mapper.toViewElement(modelC)).to.equal(viewC);

				mapper.clearBindings();

				expect(mapper.toModelElement(viewA)).to.be.undefined;
				expect(mapper.toModelElement(viewB)).to.be.undefined;
				expect(mapper.toModelElement(viewC)).to.be.undefined;

				expect(mapper.toViewElement(modelA)).to.be.undefined;
				expect(mapper.toViewElement(modelB)).to.be.undefined;
				expect(mapper.toViewElement(modelC)).to.be.undefined;
			});
		});

		describe('Standard mapping', () => {
			let modelDiv, modelP, modelImg;

			let viewDiv, viewP, viewB, viewI, viewU, viewSup, viewImg;
			let viewTextB, viewTextO, viewTextM, viewTextX, viewTextY, viewTextZZ, viewTextFOO, viewTextBAR;

			let mapper;

			before(() => {
				// Tree Model:
				//
				// <div>             ---> modelDiv
				//   ├─ x
				//   ├─ <p>          ---> modelP
				//   │   ├─ y
				//   │   ├─ f {b,i}
				//   │   ├─ o {b,i}
				//   │   ├─ o {b,i}
				//   │   ├─ b
				//   │   ├─ a
				//   │   ├─ r
				//   │   ├─ <img>    ---> modelImg
				//   │   ├─ b {u}
				//   │   ├─ o {u,sup}
				//   │   └─ m {u}
				//   ├─ z
				//   └─ z
				//
				// Tree View:
				//
				// <div>                 ---> viewDiv
				//   ├─ x                ---> viewTextX
				//   ├─ <p>              ---> viewP
				//   │   ├─ y            ---> viewTextY
				//   │   ├─ <b>          ---> viewB
				//   │   │   └─ <i>      ---> viewI
				//   │   │       └─ foo  ---> viewTextFOO
				//   │   ├─ bar          ---> viewTextBAR
				//   │   ├─ <img>        ---> viewImg
				//   │   └─ <u>          ---> viewU
				//   │       ├─ b        ---> viewTextB
				//   │       ├─ <sup>    ---> viewSup
				//   │       │    └─ o   ---> viewTextO
				//   │       └─ m        ---> viewTextM
				//   └─ zz               ---> viewTextZZ

				modelImg = new _element2.default('img');
				modelP = new _element2.default('p', {}, ['y', new _text2.default('foo', { b: true, i: true }), 'bar', modelImg, new _text2.default('b', { u: true }), new _text2.default('o', { u: true, sup: true }), new _text2.default('m', { u: true })]);

				modelDiv = new _rootelement2.default();
				modelDiv.appendChildren(['x', modelP, 'zz']);

				viewTextB = new _text4.default('b');
				viewTextO = new _text4.default('o');
				viewTextM = new _text4.default('m');
				viewTextX = new _text4.default('x');
				viewTextY = new _text4.default('y');
				viewTextZZ = new _text4.default('zz');
				viewTextFOO = new _text4.default('foo');
				viewTextBAR = new _text4.default('bar');
				viewImg = new _element4.default('img');
				viewSup = new _element4.default('sup', {}, [viewTextO]);
				viewU = new _element4.default('u', {}, [viewTextB, viewSup, viewTextM]);
				viewI = new _element4.default('i', {}, [viewTextFOO]);
				viewB = new _element4.default('b', {}, [viewI]);
				viewP = new _element4.default('p', {}, [viewTextY, viewB, viewTextBAR, viewImg, viewU]);
				viewDiv = new _element4.default('div', {}, [viewTextX, viewP, viewTextZZ]);

				mapper = new _mapper2.default();
				mapper.bindElements(modelP, viewP);
				mapper.bindElements(modelDiv, viewDiv);
				mapper.bindElements(modelImg, viewImg);
			});

			describe('toModelElement', () => {
				it('should return corresponding model element', () => {
					expect(mapper.toModelElement(viewP)).to.equal(modelP);
					expect(mapper.toModelElement(viewDiv)).to.equal(modelDiv);
					expect(mapper.toModelElement(viewImg)).to.equal(modelImg);
				});
			});

			describe('toViewElement', () => {
				it('should return corresponding view element', () => {
					expect(mapper.toViewElement(modelP)).to.equal(viewP);
					expect(mapper.toViewElement(modelDiv)).to.equal(viewDiv);
					expect(mapper.toViewElement(modelImg)).to.equal(viewImg);
				});
			});

			describe('toModelPosition', () => {
				function createToModelTest(viewElement, viewOffset, modelElement, modelOffset) {
					const viewPosition = new _position4.default(viewElement, viewOffset);
					const modelPosition = mapper.toModelPosition(viewPosition);
					expect(modelPosition.parent).to.equal(modelElement);
					expect(modelPosition.offset).to.equal(modelOffset);
				}

				it('should transform viewDiv 0', () => createToModelTest(viewDiv, 0, modelDiv, 0));
				it('should transform viewDiv 1', () => createToModelTest(viewDiv, 1, modelDiv, 1));
				it('should transform viewDiv 2', () => createToModelTest(viewDiv, 2, modelDiv, 2));
				it('should transform viewDiv 3', () => createToModelTest(viewDiv, 3, modelDiv, 4));

				it('should transform viewTextX 0', () => createToModelTest(viewTextX, 0, modelDiv, 0));
				it('should transform viewTextX 1', () => createToModelTest(viewTextX, 1, modelDiv, 1));

				it('should transform viewP 0', () => createToModelTest(viewP, 0, modelP, 0));
				it('should transform viewP 1', () => createToModelTest(viewP, 1, modelP, 1));
				it('should transform viewP 2', () => createToModelTest(viewP, 2, modelP, 4));
				it('should transform viewP 3', () => createToModelTest(viewP, 3, modelP, 7));
				it('should transform viewP 4', () => createToModelTest(viewP, 4, modelP, 8));
				it('should transform viewP 5', () => createToModelTest(viewP, 5, modelP, 11));

				it('should transform viewTextY 0', () => createToModelTest(viewTextY, 0, modelP, 0));
				it('should transform viewTextY 1', () => createToModelTest(viewTextY, 1, modelP, 1));

				it('should transform viewB 0', () => createToModelTest(viewB, 0, modelP, 1));
				it('should transform viewB 1', () => createToModelTest(viewB, 1, modelP, 4));

				it('should transform viewI 0', () => createToModelTest(viewI, 0, modelP, 1));
				it('should transform viewI 1', () => createToModelTest(viewI, 1, modelP, 4));

				it('should transform viewTextFOO 0', () => createToModelTest(viewTextFOO, 0, modelP, 1));
				it('should transform viewTextFOO 1', () => createToModelTest(viewTextFOO, 1, modelP, 2));
				it('should transform viewTextFOO 2', () => createToModelTest(viewTextFOO, 2, modelP, 3));
				it('should transform viewTextFOO 3', () => createToModelTest(viewTextFOO, 3, modelP, 4));

				it('should transform viewTextBAR 0', () => createToModelTest(viewTextBAR, 0, modelP, 4));
				it('should transform viewTextBAR 1', () => createToModelTest(viewTextBAR, 1, modelP, 5));
				it('should transform viewTextBAR 2', () => createToModelTest(viewTextBAR, 2, modelP, 6));
				it('should transform viewTextBAR 3', () => createToModelTest(viewTextBAR, 3, modelP, 7));

				it('should transform viewU 0', () => createToModelTest(viewU, 0, modelP, 8));
				it('should transform viewU 1', () => createToModelTest(viewU, 1, modelP, 9));
				it('should transform viewU 2', () => createToModelTest(viewU, 2, modelP, 10));
				it('should transform viewU 3', () => createToModelTest(viewU, 3, modelP, 11));

				it('should transform viewTextB 0', () => createToModelTest(viewTextB, 0, modelP, 8));
				it('should transform viewTextB 1', () => createToModelTest(viewTextB, 1, modelP, 9));

				it('should transform viewSup 0', () => createToModelTest(viewSup, 0, modelP, 9));
				it('should transform viewSup 1', () => createToModelTest(viewSup, 1, modelP, 10));

				it('should transform viewTextO 0', () => createToModelTest(viewTextO, 0, modelP, 9));
				it('should transform viewTextO 1', () => createToModelTest(viewTextO, 1, modelP, 10));

				it('should transform viewTextM 0', () => createToModelTest(viewTextM, 0, modelP, 10));
				it('should transform viewTextM 1', () => createToModelTest(viewTextM, 1, modelP, 11));

				it('should transform viewTextZZ 0', () => createToModelTest(viewTextZZ, 0, modelDiv, 2));
				it('should transform viewTextZZ 1', () => createToModelTest(viewTextZZ, 1, modelDiv, 3));
				it('should transform viewTextZZ 2', () => createToModelTest(viewTextZZ, 2, modelDiv, 4));
			});

			describe('toViewPosition', () => {
				function createToViewTest(modelElement, modelOffset, viewElement, viewOffset) {
					const modelPosition = _position2.default.createFromParentAndOffset(modelElement, modelOffset);
					const viewPosition = mapper.toViewPosition(modelPosition);
					expect(viewPosition.parent).to.equal(viewElement);
					expect(viewPosition.offset).to.equal(viewOffset);
				}

				it('should transform modelDiv 0', () => createToViewTest(modelDiv, 0, viewTextX, 0));
				it('should transform modelDiv 1', () => createToViewTest(modelDiv, 1, viewTextX, 1));
				it('should transform modelDiv 2', () => createToViewTest(modelDiv, 2, viewTextZZ, 0));
				it('should transform modelDiv 3', () => createToViewTest(modelDiv, 3, viewTextZZ, 1));
				it('should transform modelDiv 4', () => createToViewTest(modelDiv, 4, viewTextZZ, 2));

				it('should transform modelP 0', () => createToViewTest(modelP, 0, viewTextY, 0));
				it('should transform modelP 1', () => createToViewTest(modelP, 1, viewTextY, 1));
				it('should transform modelP 2', () => createToViewTest(modelP, 2, viewTextFOO, 1));
				it('should transform modelP 3', () => createToViewTest(modelP, 3, viewTextFOO, 2));
				it('should transform modelP 4', () => createToViewTest(modelP, 4, viewTextBAR, 0));
				it('should transform modelP 5', () => createToViewTest(modelP, 5, viewTextBAR, 1));
				it('should transform modelP 6', () => createToViewTest(modelP, 6, viewTextBAR, 2));
				it('should transform modelP 7', () => createToViewTest(modelP, 7, viewTextBAR, 3));
				it('should transform modelP 8', () => createToViewTest(modelP, 8, viewP, 4));
				it('should transform modelP 9', () => createToViewTest(modelP, 9, viewTextB, 1));
				it('should transform modelP 10', () => createToViewTest(modelP, 10, viewTextM, 0));
				it('should transform modelP 11', () => createToViewTest(modelP, 11, viewP, 5));
			});

			describe('toModelRange', () => {
				it('should transform range', () => {
					const viewRange = _range4.default.createFromParentsAndOffsets(viewDiv, 0, viewTextFOO, 2);
					const modelRange = mapper.toModelRange(viewRange);
					expect(modelRange.start.parent).to.equal(modelDiv);
					expect(modelRange.start.offset).to.equal(0);
					expect(modelRange.end.parent).to.equal(modelP);
					expect(modelRange.end.offset).to.equal(3);
				});
			});

			describe('toViewRange', () => {
				it('should transform range', () => {
					const modelRange = _range2.default.createFromParentsAndOffsets(modelDiv, 0, modelP, 3);
					const viewRange = mapper.toViewRange(modelRange);
					expect(viewRange.start.parent).to.equal(viewTextX);
					expect(viewRange.start.offset).to.equal(0);
					expect(viewRange.end.parent).to.equal(viewTextFOO);
					expect(viewRange.end.offset).to.equal(2);
				});
			});
		});

		describe('Widget mapping', () => {
			let modelDiv, modelWidget, modelImg, modelCaption;

			let viewDiv, viewWidget, viewMask, viewWrapper, viewImg, viewCaption;
			let viewTextX, viewTextFOO, viewTextZZ, viewTextLABEL;

			let mapper;

			before(() => {
				// Tree Model:
				//
				// <div>                 ---> modelDiv
				//   ├─ x
				//   ├─ <widget>         ---> modelWidget
				//   │   ├─ <img>        ---> modelImg
				//   │   └─ <caption>    ---> modelCaption
				//   │       ├─ f
				//   │       ├─ o
				//   │       └─ o
				//   ├─ z
				//   └─ z
				//
				// Tree View:
				//
				// <div>                     ---> viewDiv
				//   ├─ x                    ---> viewTextX
				//   ├─ <widget>             ---> viewWidget
				//   │   ├─ <mask>           ---> viewMask
				//   │   │   └─ label        ---> viewTextLABEL
				//   │   └─ <wrapper>        ---> viewWrapper
				//   │       ├─ <img>        ---> viewImg
				//   │       └─ <caption>    ---> viewCaption
				//   │           └─ foo      ---> viewTextFOO
				//   └─ zz                   ---> viewTextZZ

				modelImg = new _element2.default('img');
				modelCaption = new _element2.default('caption', {}, 'foo');
				modelWidget = new _element2.default('widget', {}, [modelImg, modelCaption]);
				modelDiv = new _rootelement2.default();
				modelDiv.appendChildren(['x', modelWidget, 'zz']);

				viewTextX = new _text4.default('y');
				viewTextZZ = new _text4.default('zz');
				viewTextFOO = new _text4.default('foo');
				viewTextLABEL = new _text4.default('label');

				viewImg = new _element4.default('img');
				viewMask = new _element4.default('mask', {}, [viewTextLABEL]);
				viewCaption = new _element4.default('caption', {}, [viewTextFOO]);
				viewWrapper = new _element4.default('wrapper', {}, [viewImg, viewCaption]);
				viewWidget = new _element4.default('widget', [viewMask, viewWrapper]);
				viewDiv = new _element4.default('div', {}, [viewTextX, viewWidget, viewTextZZ]);

				mapper = new _mapper2.default();
				mapper.bindElements(modelDiv, viewDiv);
				mapper.bindElements(modelWidget, viewWidget);
				mapper.bindElements(modelImg, viewImg);
				mapper.bindElements(modelCaption, viewCaption);
			});

			describe('toModelElement', () => {
				it('should return corresponding model element', () => {
					expect(mapper.toModelElement(viewDiv)).to.equal(modelDiv);
					expect(mapper.toModelElement(viewWidget)).to.equal(modelWidget);
					expect(mapper.toModelElement(viewImg)).to.equal(modelImg);
					expect(mapper.toModelElement(viewCaption)).to.equal(modelCaption);
				});
			});

			describe('toViewElement', () => {
				it('should return corresponding view element', () => {
					expect(mapper.toViewElement(modelDiv)).to.equal(viewDiv);
					expect(mapper.toViewElement(modelWidget)).to.equal(viewWidget);
					expect(mapper.toViewElement(modelImg)).to.equal(viewImg);
					expect(mapper.toViewElement(modelCaption)).to.equal(viewCaption);
				});
			});

			describe('toModelPosition', () => {
				function createToModelTest(viewElement, viewOffset, modelElement, modelOffset) {
					const viewPosition = new _position4.default(viewElement, viewOffset);
					const modelPosition = mapper.toModelPosition(viewPosition);
					expect(modelPosition.parent).to.equal(modelElement);
					expect(modelPosition.offset).to.equal(modelOffset);
				}

				it('should transform viewDiv 0', () => createToModelTest(viewDiv, 0, modelDiv, 0));
				it('should transform viewDiv 1', () => createToModelTest(viewDiv, 1, modelDiv, 1));
				it('should transform viewDiv 2', () => createToModelTest(viewDiv, 2, modelDiv, 2));
				it('should transform viewDiv 3', () => createToModelTest(viewDiv, 3, modelDiv, 4));

				it('should transform viewTextX 0', () => createToModelTest(viewTextX, 0, modelDiv, 0));
				it('should transform viewTextX 1', () => createToModelTest(viewTextX, 1, modelDiv, 1));

				it('should transform viewTextZZ 0', () => createToModelTest(viewTextZZ, 0, modelDiv, 2));
				it('should transform viewTextZZ 1', () => createToModelTest(viewTextZZ, 1, modelDiv, 3));
				it('should transform viewTextZZ 2', () => createToModelTest(viewTextZZ, 2, modelDiv, 4));

				it('should transform viewImg 0', () => createToModelTest(viewImg, 0, modelImg, 0));

				it('should transform viewCaption 0', () => createToModelTest(viewCaption, 0, modelCaption, 0));
				it('should transform viewCaption 1', () => createToModelTest(viewCaption, 1, modelCaption, 3));

				it('should transform viewTextFOO 0', () => createToModelTest(viewTextFOO, 0, modelCaption, 0));
				it('should transform viewTextFOO 1', () => createToModelTest(viewTextFOO, 1, modelCaption, 1));
				it('should transform viewTextFOO 2', () => createToModelTest(viewTextFOO, 2, modelCaption, 2));
				it('should transform viewTextFOO 3', () => createToModelTest(viewTextFOO, 3, modelCaption, 3));
			});

			describe('toViewPosition', () => {
				function createToViewTest(modelElement, modelOffset, viewElement, viewOffset) {
					const modelPosition = _position2.default.createFromParentAndOffset(modelElement, modelOffset);
					const viewPosition = mapper.toViewPosition(modelPosition);
					expect(viewPosition.parent).to.equal(viewElement);
					expect(viewPosition.offset).to.equal(viewOffset);
				}

				it('should transform modelDiv 0', () => createToViewTest(modelDiv, 0, viewTextX, 0));
				it('should transform modelDiv 1', () => createToViewTest(modelDiv, 1, viewTextX, 1));
				it('should transform modelDiv 2', () => createToViewTest(modelDiv, 2, viewTextZZ, 0));
				it('should transform modelDiv 3', () => createToViewTest(modelDiv, 3, viewTextZZ, 1));
				it('should transform modelDiv 4', () => createToViewTest(modelDiv, 4, viewTextZZ, 2));

				it('should transform modelImg 0', () => createToViewTest(modelImg, 0, viewImg, 0));

				it('should transform modelCaption 0', () => createToViewTest(modelCaption, 0, viewTextFOO, 0));
				it('should transform modelCaption 1', () => createToViewTest(modelCaption, 1, viewTextFOO, 1));
				it('should transform modelCaption 2', () => createToViewTest(modelCaption, 2, viewTextFOO, 2));
				it('should transform modelCaption 3', () => createToViewTest(modelCaption, 3, viewTextFOO, 3));
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
