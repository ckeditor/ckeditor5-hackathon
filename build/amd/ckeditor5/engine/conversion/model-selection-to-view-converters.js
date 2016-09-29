define(['exports', '../view/element.js', '../view/range.js'], function (exports, _element, _range) {
  /**
   * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
   * For licensing, see LICENSE.md.
   */

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.convertRangeSelection = convertRangeSelection;
  exports.convertCollapsedSelection = convertCollapsedSelection;
  exports.convertSelectionAttribute = convertSelectionAttribute;
  exports.clearAttributes = clearAttributes;

  var _element2 = _interopRequireDefault(_element);

  var _range2 = _interopRequireDefault(_range);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Contains {@link engine.model.Selection model selection} to {@link engine.view.Selection view selection} converters for
   * {@link engine.conversion.ModelConversionDispatcher}.
   *
   * @namespace engine.conversion.modelSelectionToView
   */

  /**
   * Function factory, creates a converter that converts non-collapsed {@link engine.model.Selection model selection} to
   * {@link engine.view.Selection view selection}. The converter consumes appropriate value from `consumable` object
   * and maps model positions from selection to view positions.
   *
   *		modelDispatcher.on( 'selection', convertRangeSelection() );
   *
   * @external engine.conversion.modelSelectionToView
   * @function engine.conversion.modelSelectionToView.convertRangeSelection
   * @returns {Function} Selection converter.
   */
  function convertRangeSelection() {
    return (evt, data, consumable, conversionApi) => {
      const selection = data.selection;

      if (selection.isCollapsed) {
        return;
      }

      if (!consumable.consume(selection, 'selection')) {
        return;
      }

      conversionApi.viewSelection.removeAllRanges();

      for (let range of selection.getRanges()) {
        const viewRange = conversionApi.mapper.toViewRange(range);

        if (viewRange) {
          conversionApi.viewSelection.addRange(viewRange, selection.isBackward);
        }
      }
    };
  }

  /**
   * Function factory, creates a converter that converts collapsed {@link engine.model.Selection model selection} to
   * {@link engine.view.Selection view selection}. The converter consumes appropriate value from `consumable` object,
   * maps model selection position to view position and breaks {@link engine.view.AttributeElement attribute elements}
   * at the selection position.
   *
   *		modelDispatcher.on( 'selection', convertCollapsedSelection() );
   *
   * Example of view state before and after converting collapsed selection:
   *
   *		<p><strong>f^oo<strong>bar</p>
   *		-> <p><strong>f</strong>^<strong>oo</strong>bar</p>
   *
   * By breaking attribute elements like `<strong>` selection is in correct elements. See also complementary
   * {@link engine.conversion.modelSelectionToView.convertSelectionAttribute attribute converter} for selection attributes,
   * which wraps collapsed selection into view elements. Those converters together ensure, that selection ends up in
   * appropriate elements.
   *
   * See also {@link engine.conversion.modelSelectionToView.clearAttributes} which do the clean-up by merging attributes.
   *
   * @external engine.conversion.modelSelectionToView
   * @function engine.conversion.modelSelectionToView.convertCollapsedSelection
   * @returns {Function} Selection converter.
   */
  function convertCollapsedSelection() {
    return (evt, data, consumable, conversionApi) => {
      const selection = data.selection;

      if (!selection.isCollapsed) {
        return;
      }

      if (!consumable.consume(selection, 'selection')) {
        return;
      }

      const modelPosition = selection.getFirstPosition();
      const viewPosition = conversionApi.mapper.toViewPosition(modelPosition);

      if (!viewPosition) {
        return;
      }

      const brokenPosition = conversionApi.writer.breakAttributes(viewPosition);
      conversionApi.viewSelection.removeAllRanges();
      conversionApi.viewSelection.addRange(new _range2.default(brokenPosition, brokenPosition));
    };
  }

  /**
   * Function factory, creates a converter that converts {@link engine.model.Selection model selection} attributes to
   * {@link engine.view.AttributeElement view attribute elements}. The converter works only for collapsed selection.
   * The converter consumes appropriate value from `consumable` object, maps model selection position to view position and
   * wraps that position into a view attribute element.
   *
   * The wrapping node depends on passed parameter. If {@link engine.view.Element} was passed, it will be cloned and
   * the copy will become the wrapping element. If `Function` is provided, it is passed all the parameters of the
   * {@link engine.conversion.ModelConversionDispatcher#event:selectionAttribute selectionAttribute event}. It's expected that
   * the function returns a {@link engine.view.AttributeElement}. The result of the function will be the wrapping element.
   *
   *		modelDispatcher.on( 'selectionAttribute:italic', convertSelectionAttribute( new ViewAttributeElement( 'em' ) ) );
   *
   *		function styleElementCreator( styleValue ) {
   *			if ( styleValue == 'important' ) {
   *				return new ViewAttributeElement( 'strong', { style: 'text-transform:uppercase;' } );
   *			} else if ( styleValue == 'gold' ) {
   *				return new ViewAttributeElement( 'span', { style: 'color:yellow;' } );
   *			}
   *		}
   *		modelDispatcher.on( 'selectionAttribute:style', convertSelectionAttribute( styleCreator ) );
   *
   * **Note:** You can use the same `elementCreator` function for this converter factory and {@link engine.conversion.modelToView.wrap}
   * model to view converter, as long as the `elementCreator` function uses only the first parameter (attribute value).
   *
   * Example of view state after converting collapsed selection. The scenario is: selection is inside bold text (`<strong>` element)
   * but it does not have bold attribute itself, but has italic attribute instead (let's assume that user turned off bold and turned
   * on italic with selection collapsed):
   *
   *		modelDispatcher.on( 'selection', convertCollapsedSelection() );
   *		modelDispatcher.on( 'selectionAttribute:italic', convertSelectionAttribute( new ViewAttributeElement( 'em' ) ) );
   *
   * Example of view states before and after converting collapsed selection:
   *
   *		<p><em>f^oo</em>bar</p>
   *		-> <p><em>f</em>^<em>oo</em>bar</p>
   *		-> <p><em>f^oo</em>bar</p>
   *
   *		<p><strong>f^oo<strong>bar</p>
   *		-> <p><strong>f</strong>^<strong>oo<strong>bar</p>
   *		-> <p><strong>f</strong><em>^</em><strong>oo</strong>bar</p>
   *
   * In first example, nothing has changed, because first `<em>` element got broken by `convertCollapsedSelection()` converter,
   * but then it got wrapped-back by `convertSelectionAttribute()` converter. In second example, notice how `<strong>` element
   * is broken to prevent putting selection in it, since selection has no `bold` attribute.
   *
   * @external engine.conversion.modelSelectionToView
   * @function engine.conversion.modelSelectionToView.convertCollapsedSelection
   * @param {engine.view.AttributeElement|Function} elementCreator View element, or function returning a view element, which will
   * be used for wrapping.
   * @returns {Function} Selection converter.
   */
  function convertSelectionAttribute(elementCreator) {
    return (evt, data, consumable, conversionApi) => {
      const selection = data.selection;

      if (!selection.isCollapsed) {
        return;
      }

      if (!consumable.consume(selection, 'selectionAttribute:' + data.key)) {
        return;
      }

      let viewPosition = conversionApi.viewSelection.getFirstPosition();
      conversionApi.viewSelection.removeAllRanges();

      const viewElement = elementCreator instanceof _element2.default ? elementCreator.clone(true) : elementCreator(data.value, selection, consumable, conversionApi);

      viewPosition = conversionApi.writer.wrapPosition(viewPosition, viewElement);

      conversionApi.viewSelection.addRange(new _range2.default(viewPosition, viewPosition));
    };
  }

  /**
   * Function factory, creates a converter that clears artifacts after the previous
   * {@link engine.model.Selection model selection} conversion. It removes all empty
   * {@link engine.view.AttributeElement view attribute elements} and merge sibling attributes at all start and end
   * positions of all ranges.
   *
   *		<p><strong>^</strong></p>
   *		-> <p>^</p>
   *
   *		<p><strong>foo</strong>^<strong>bar</strong>bar</p>
   *		-> <p><strong>foo^bar<strong>bar</p>
   *
   *		<p><strong>foo</strong><em>^</em><strong>bar</strong>bar</p>
   *		-> <p><strong>foo^bar<strong>bar</p>
   *
   * This listener should be assigned before any converter for the new selection:
   *
   *		modelDispatcher.on( 'selection', clearAttributes() );
   *
   * See {@link engine.conversion.modelSelectionToView.convertCollapsedSelection} which do the opposite by breaking
   * attributes in the selection position.
   *
   * @external engine.conversion.modelSelectionToView
   * @function engine.conversion.modelSelectionToView.clearAttributes
   * @returns {Function} Selection converter.
   */
  function clearAttributes() {
    return (evt, data, consumable, conversionApi) => {
      for (let range of conversionApi.viewSelection.getRanges()) {
        // Not collapsed selection should not have artifacts.
        if (range.isCollapsed) {
          // Position might be in the node removed by the Writer.
          if (range.end.parent.getDocument()) {
            conversionApi.writer.mergeAttributes(range.start);
          }
        }
      }
      conversionApi.viewSelection.removeAllRanges();
    };
  }
});