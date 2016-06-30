define(['exports', '/ckeditor5/engine/view/documentfragment.js', '/ckeditor5/engine/dataprocessor/htmldataprocessor.js', '/ckeditor5/engine/view/element.js', '/ckeditor5/engine/view/selection.js', '/ckeditor5/engine/view/range.js', '/ckeditor5/engine/view/position.js', '/ckeditor5/engine/view/attributeelement.js', '/ckeditor5/engine/view/containerelement.js', '/ckeditor5/engine/view/text.js'], function (exports, _documentfragment, _htmldataprocessor, _element, _selection, _range, _position, _attributeelement, _containerelement, _text) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.getData = getData;
	exports.setData = setData;
	exports.stringify = stringify;
	exports.parse = parse;

	var _documentfragment2 = _interopRequireDefault(_documentfragment);

	var _htmldataprocessor2 = _interopRequireDefault(_htmldataprocessor);

	var _element2 = _interopRequireDefault(_element);

	var _selection2 = _interopRequireDefault(_selection);

	var _range2 = _interopRequireDefault(_range);

	var _position2 = _interopRequireDefault(_position);

	var _attributeelement2 = _interopRequireDefault(_attributeelement);

	var _containerelement2 = _interopRequireDefault(_containerelement);

	var _text2 = _interopRequireDefault(_text);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	const ELEMENT_RANGE_START_TOKEN = '[';
	const ELEMENT_RANGE_END_TOKEN = ']';
	const TEXT_RANGE_START_TOKEN = '{';
	const TEXT_RANGE_END_TOKEN = '}';

	/**
  * Writes the contents of the {@link engine.view.Document Document} to an HTML-like string.
  *
  * @param {engine.view.Document} document
  * @param {Object} [options]
  * @param {Boolean} [options.withoutSelection=false] Whether to write the selection. When set to `true` selection will
  * be not included in returned string.
  * @param {Boolean} [options.rootName='main'] Name of the root from which data should be stringified. If not provided
  * default `main` name will be used.
  * @param {Boolean} [options.showType=false] When set to `true` type of elements will be printed (`<container:p>`
  * instead of `<p>` and `<attribute:b>` instead of `<b>`).
  * @param {Boolean} [options.showPriority=false] When set to `true` AttributeElement's priority will be printed
  * (`<span:12>`, `<b:10>`).
  * @returns {String} The stringified data.
  */
	function getData(document, options = {}) {
		const withoutSelection = !!options.withoutSelection;
		const rootName = options.rootName || 'main';
		const root = document.getRoot(rootName);
		const stringifyOptions = {
			showType: options.showType,
			showPriority: options.showPriority,
			ignoreRoot: true
		};

		return withoutSelection ? getData._stringify(root, null, stringifyOptions) : getData._stringify(root, document.selection, stringifyOptions);
	}

	// Set stringify as getData private method - needed for testing/spying.
	getData._stringify = stringify;

	/**
  * Sets the contents of the {@link engine.view.Document Document} provided as HTML-like string.
  *
  * @param {engine.view.Document} document
  * @param {String} data HTML-like string to write into Document.
  * @param {Object} options
  * @param {String} [rootName] Root name where parsed data will be stored. If not provided, default `main` name will be
  * used.
  */
	function setData(document, data, options = {}) {
		const rootName = options.rootName || 'main';
		const root = document.getRoot(rootName);
		const result = setData._parse(data, { rootElement: root });

		if (result.view && result.selection) {
			document.selection.setTo(result.selection);
		}
	}

	// Set parse as setData private method - needed for testing/spying.
	setData._parse = parse;

	/**
  * Converts view elements to HTML-like string representation.
  * Root element can be provided as {@link engine.view.Text Text}:
  *
  *		const text = new Text( 'foobar' );
  *		stringify( text ); // 'foobar'
  *
  * or as {@link engine.view.Element Element}:
  *
  *		const element = new Element( 'p', null, new Text( 'foobar' ) );
  *		stringify( element ); // '<p>foobar</p>'
  *
  * or as {@link engine.view.DocumentFragment DocumentFragment}:
  *
  *		const text = new Text( 'foobar' );
  *		const b = new Element( 'b', { name: 'test' }, text );
  *		const p = new Element( 'p', { style: 'color:red;' } );
  *		const fragment = new DocumentFragment( [ p, b ] );
  *
  *		stringify( fragment ); // '<p style="color:red;"></p><b name="test">foobar</b>'
  *
  * Additionally {@link engine.view.Selection Selection} instance can be provided, then ranges from that selection
  * will be included in output data.
  * If range position is placed inside element node, it will be represented with `[` and `]`:
  *
  *		const text = new Text( 'foobar' );
  *		const b = new Element( 'b', null, text );
  *		const p = new Element( 'p', null, b );
  *		const selection = new Selection();
  *		selection.addRange( Range.createFromParentsAndOffsets( p, 0, p, 1 ) );
  *
  *		stringify( p, selection ); // '<p>[<b>foobar</b>]</p>'
  *
  * If range is placed inside text node, it will be represented with `{` and `}`:
  *
  *		const text = new Text( 'foobar' );
  *		const b = new Element( 'b', null, text );
  *		const p = new Element( 'p', null, b );
  *		const selection = new Selection();
  *		selection.addRange( Range.createFromParentsAndOffsets( text, 1, text, 5 ) );
  *
  *		stringify( p, selection ); // '<p><b>f{ooba}r</b></p>'
  *
  * Multiple ranges are supported:
  *
  *		const text = new Text( 'foobar' );
  *		const selection = new Selection();
  *		selection.addRange( Range.createFromParentsAndOffsets( text, 0, text, 1 ) );
  *		selection.addRange( Range.createFromParentsAndOffsets( text, 3, text, 5 ) );
  *
  *		stringify( text, selection ); // '{f}oo{ba}r'
  *
  * Instead of {@link engine.view.Selection Selection} instance {@link engine.view.Range Range} or
  * {@link engine.view.Position Position} instance can be provided. If Range instance is provided - it will be
  * converted to selection containing this range. If Position instance is provided - it will be converted to selection
  * containing one range collapsed at this position.
  *
  *		const text = new Text( 'foobar' );
  *		const range = Range.createFromParentsAndOffsets( text, 0, text, 1 );
  *		const position = new Position( text, 3 );
  *
  *		stringify( text, range ); // '{f}oobar'
  *		stringify( text, position ); // 'foo{}bar'
  *
  * Additional options object can be provided.
  * If `options.showType` is set to `true`, element's types will be
  * presented for {@link engine.view.AttributeElement AttributeElements} and {@link engine.view.ContainerElement
  * ContainerElements}:
  *
  *		const attribute = new AttributeElement( 'b' );
  *		const container = new ContainerElement( 'p' );
  *		getData( attribute, null, { showType: true } ); // '<attribute:b></attribute:b>'
  *		getData( container, null, { showType: true } ); // '<container:p></container:p>'
  *
  * If `options.showPriority` is set to `true`, priority will be displayed for all
  * {@link engine.view.AttributeElement AttributeElements}.
  *
  *		const attribute = new AttributeElement( 'b' );
  *		attribute.priority = 20;
  *		getData( attribute, null, { showPriority: true } ); // <b:20></b:20>
  *
  * @param {engine.view.Text|engine.view.Element|engine.view.DocumentFragment} node Node to stringify.
  * @param {engine.view.Selection|engine.view.Position|engine.view.Range} [selectionOrPositionOrRange = null ]
  * Selection instance which ranges will be included in returned string data. If Range instance is provided - it will be
  * converted to selection containing this range. If Position instance is provided - it will be converted to selection
  * containing one range collapsed at this position.
  * @param {Object} [options] Object with additional options.
  * @param {Boolean} [options.showType=false] When set to `true` type of elements will be printed (`<container:p>`
  * instead of `<p>` and `<attribute:b>` instead of `<b>`).
  * @param {Boolean} [options.showPriority=false] When set to `true` AttributeElement's priority will be printed
  * (`<span:12>`, `<b:10>`).
  * @param {Boolean} [options.ignoreRoot=false] When set to `true` root's element opening and closing will not be printed.
  * Mainly used by `getData` function to ignore {@link engine.view.Document Document's} root element.
  * @returns {String} HTML-like string representing the view.
  */
	function stringify(node, selectionOrPositionOrRange = null, options = {}) {
		let selection;

		if (selectionOrPositionOrRange instanceof _position2.default) {
			selection = new _selection2.default();
			selection.addRange(new _range2.default(selectionOrPositionOrRange, selectionOrPositionOrRange));
		} else if (selectionOrPositionOrRange instanceof _range2.default) {
			selection = new _selection2.default();
			selection.addRange(selectionOrPositionOrRange);
		} else {
			selection = selectionOrPositionOrRange;
		}

		const viewStringify = new ViewStringify(node, selection, options);

		return viewStringify.stringify();
	}

	/**
  * Parses HTML-like string and returns view tree nodes.
  * Simple string will be converted to {@link engine.view.Text Text} node:
  *
  *		parse( 'foobar' ); // Returns instance of Text.
  *
  * {@link engine.view.Element Elements} will be parsed with attributes an children:
  *
  *		parse( '<b name="baz">foobar</b>' ); // Returns instance of Element with `baz` attribute and text child node.
  *
  * Multiple nodes provided on root level will be converted to {@link engine.view.DocumentFragment DocumentFragment}:
  *
  *		parse( '<b>foo</b><i>bar</i>' ); // Returns DocumentFragment with two child elements.
  *
  * Method can parse multiple {@link engine.view.Range ranges} provided in string data and return
  * {@link engine.view.Selection Selection} instance containing these ranges. Ranges placed inside
  * {@link engine.view.Text Text} nodes should be marked using `{` and `}` brackets:
  *
  *		const { text, selection } = parse( 'f{ooba}r' );
  *
  * Ranges placed outside text nodes should be marked using `[` and `]` brackets:
  *
  *		const { root, selection } = parse( '<p>[<b>foobar</b>]</p>' );
  *
  * Sometimes there is a need for defining order of ranges inside created selection. This can be achieved by providing
  * ranges order array as additional parameter:
  *
  *		const { root, selection } = parse( '{fo}ob{ar}{ba}z', { order: [ 2, 3, 1 ] } );
  *
  * In above example first range (`{fo}`) will be added to selection as second one, second range (`{ar}`) will be added
  * as third and third range (`{ba}`) will be added as first one.
  *
  * If selection's last range should be added as backward one (so the {@link engine.view.Selection#anchor selection
  * anchor} is represented by `end` position and {@link engine.view.Selection#focus selection focus} is
  * represented by `start` position) use `lastRangeBackward` flag:
  *
  *		const { root, selection } = parse( `{foo}bar{baz}`, { lastRangeBackward: true } );
  *
  * @param {String} data HTML-like string to be parsed.
  * @param {Object} options
  * @param {Array.<Number>} [options.order] Array with order of parsed ranges added to returned
  * {@link engine.view.Selection Selection} instance. Each element should represent desired position of each range in
  * selection instance. For example: `[2, 3, 1]` means that first range will be placed as second, second as third and third as first.
  * @param {Boolean} [options.lastRangeBackward=false] If set to true last range will be added as backward to the returned
  * {@link engine.view.Selection Selection} instance.
  * @param {engine.view.Element|engine.view.DocumentFragment} [options.rootElement=null] Default root to use when parsing elements.
  * When set to `null` root element will be created automatically. If set to
  * {@link engine.view.Element Element} or {@link engine.view.DocumentFragment DocumentFragment} - this node
  * will be used as root for all parsed nodes.
  * @returns {engine.view.Text|engine.view.Element|engine.view.DocumentFragment|Object} Returns parsed view node
  * or object with two fields `view` and `selection` when selection ranges were included in data to parse.
  */
	function parse(data, options = {}) {
		options.order = options.order || [];
		const viewParser = new ViewParser();
		const rangeParser = new RangeParser();

		const view = viewParser.parse(data, options.rootElement);
		const ranges = rangeParser.parse(view, options.order);

		// When ranges are present - return object containing view, and selection.
		if (ranges.length) {
			const selection = new _selection2.default();
			selection.setRanges(ranges, !!options.lastRangeBackward);

			return {
				view: view,
				selection: selection
			};
		}

		return view;
	}

	/**
  * Private helper class used for converting ranges represented as text inside view {@link engine.view.Text Text nodes}.
  *
  * @private
  */
	class RangeParser {
		/**
   * Parses the view, and returns ranges represented inside {@link engine.view.Text Text nodes}.
   * Method will remove all occurrences of `{`, `}`, `[` and `]` from found text nodes. If text node is empty after
   * the process - it will be removed too.
   *
   * @param {engine.view.Node} node Starting node.
   * @param {Array.<Number>} order Ranges order. Each element should represent desired position of the range after
   * sorting. For example: `[2, 3, 1]` means that first range will be placed as second, second as third and third as first.
   * @returns {Array.<engine.view.Range>} Array with ranges found.
   */
		parse(node, order) {
			this._positions = [];

			// Remove all range brackets from view nodes and save their positions.
			this._getPositions(node);

			// Create ranges using gathered positions.
			let ranges = this._createRanges();

			// Sort ranges if needed.
			if (order.length) {
				if (order.length != ranges.length) {
					throw new Error(`Parse error - there are ${ ranges.length } ranges found, but ranges order array contains ${ order.length } elements.`);
				}

				ranges = this._sortRanges(ranges, order);
			}

			return ranges;
		}

		/**
   * Gathers positions of brackets inside view tree starting from provided node. Method will remove all occurrences of
   * `{`, `}`, `[` and `]` from found text nodes. If text node is empty after the process - it will be removed
   * too.
   *
   * @private
   * @param {engine.view.Node} node Staring node.
   */
		_getPositions(node) {
			if (node instanceof _documentfragment2.default || node instanceof _element2.default) {
				// Copy elements into the array, when nodes will be removed from parent node this array will still have all the
				// items needed for iteration.
				const children = [...node.getChildren()];

				for (let child of children) {
					this._getPositions(child);
				}
			}

			if (node instanceof _text2.default) {
				const regexp = new RegExp(`[ ${ TEXT_RANGE_START_TOKEN }${ TEXT_RANGE_END_TOKEN }\\${ ELEMENT_RANGE_END_TOKEN }\\${ ELEMENT_RANGE_START_TOKEN } ]`, 'g');
				let text = node.data;
				let match;
				let offset = 0;
				const brackets = [];

				// Remove brackets from text and store info about offset inside text node.
				while (match = regexp.exec(text)) {
					const index = match.index;
					const bracket = match[0];

					brackets.push({
						bracket: bracket,
						textOffset: index - offset
					});

					offset++;
				}
				text = text.replace(regexp, '');
				node.data = text;
				const index = node.getIndex();
				const parent = node.parent;

				// Remove empty text nodes.
				if (!text) {
					node.remove();
				}

				for (let item of brackets) {
					// Non-empty text node.
					if (text) {
						if (item.bracket == TEXT_RANGE_START_TOKEN || item.bracket == TEXT_RANGE_END_TOKEN) {
							// Store information about text range delimiter.
							this._positions.push({
								bracket: item.bracket,
								position: new _position2.default(node, item.textOffset)
							});
						} else {
							// Check if element range delimiter is not placed inside text node.
							if (item.textOffset !== 0 && item.textOffset !== text.length) {
								throw new Error(`Parse error - range delimiter '${ item.bracket }' is placed inside text node.`);
							}

							// If bracket is placed at the end of the text node - it should be positioned after it.
							const offset = item.textOffset === 0 ? index : index + 1;

							// Store information about element range delimiter.
							this._positions.push({
								bracket: item.bracket,
								position: new _position2.default(parent, offset)
							});
						}
					} else {
						if (item.bracket == TEXT_RANGE_START_TOKEN || item.bracket == TEXT_RANGE_END_TOKEN) {
							throw new Error(`Parse error - text range delimiter '${ item.bracket }' is placed inside empty text node. `);
						}

						// Store information about element range delimiter.
						this._positions.push({
							bracket: item.bracket,
							position: new _position2.default(parent, index)
						});
					}
				}
			}
		}

		/**
   * Sort ranges in given order. Ranges order should be an array, each element should represent desired position
   * of the range after sorting.
   * For example: `[2, 3, 1]` means that first range will be placed as second, second as third and third as first.
   *
   * @private
   * @param {Array.<engine.view.Range>} ranges Ranges to sort.
   * @param {Array.<Number>} rangesOrder Array with new ranges order.
   * @returns {Array} Sorted ranges array.
   */
		_sortRanges(ranges, rangesOrder) {
			const sortedRanges = [];
			let index = 0;

			for (let newPosition of rangesOrder) {
				if (ranges[newPosition - 1] === undefined) {
					throw new Error('Parse error - provided ranges order is invalid.');
				}

				sortedRanges[newPosition - 1] = ranges[index];
				index++;
			}

			return sortedRanges;
		}

		/**
   * Uses all found bracket positions to create ranges from them.
   *
   * @private
   * @returns {Array.<engine.view.Range}
   */
		_createRanges() {
			const ranges = [];
			let range = null;

			for (let item of this._positions) {
				// When end of range is found without opening.
				if (!range && (item.bracket == ELEMENT_RANGE_END_TOKEN || item.bracket == TEXT_RANGE_END_TOKEN)) {
					throw new Error(`Parse error - end of range was found '${ item.bracket }' but range was not started before.`);
				}

				// When second start of range is found when one is already opened - selection does not allow intersecting
				// ranges.
				if (range && (item.bracket == ELEMENT_RANGE_START_TOKEN || item.bracket == TEXT_RANGE_START_TOKEN)) {
					throw new Error(`Parse error - start of range was found '${ item.bracket }' but one range is already started.`);
				}

				if (item.bracket == ELEMENT_RANGE_START_TOKEN || item.bracket == TEXT_RANGE_START_TOKEN) {
					range = new _range2.default(item.position, item.position);
				} else {
					range.end = item.position;
					ranges.push(range);
					range = null;
				}
			}

			// Check if all ranges have proper ending.
			if (range !== null) {
				throw new Error('Parse error - range was started but no end delimiter was found.');
			}

			return ranges;
		}
	}

	/**
  * Private helper class used to convert given HTML-like string to view tree.
  *
  * @private
  */
	class ViewParser {
		/**
   * Parses HTML-like string to view tree elements.
   *
   * @param {String} data
   * @param {engine.view.Element|engine.view.DocumentFragment} [rootElement=null] Default root to use when parsing elements.
   * When set to `null` root element will be created automatically. If set to
   * {@link engine.view.Element Element} or {@link engine.view.DocumentFragment DocumentFragment} - this node
   * will be used as root for all parsed nodes.
   * @returns {engine.view.Node|engine.view.DocumentFragment}
   */
		parse(data, rootElement = null) {
			const htmlProcessor = new _htmldataprocessor2.default();

			// Convert HTML string to DOM.
			const domRoot = htmlProcessor.toDom(data);

			// If root element is provided - remove all children from it.
			if (rootElement) {
				rootElement.removeChildren(0, rootElement.getChildCount());
			}

			// Convert DOM to View.
			return this._walkDom(domRoot, rootElement);
		}

		/**
   * Walks through DOM elements and converts them to tree view elements.
   *
   * @private
   * @param {Node} domNode
   * @param {engine.view.Element|engine.view.DocumentFragment} [rootElement=null] Default root element to use
   * when parsing elements.
   * @returns {engine.view.Node|engine.view.DocumentFragment}
   */
		_walkDom(domNode, rootElement = null) {
			const isDomElement = domNode instanceof window.Element;

			if (isDomElement || domNode instanceof window.DocumentFragment) {
				const children = domNode.childNodes;
				const length = children.length;

				// If there is only one element inside DOM DocumentFragment - use it as root.
				if (!isDomElement && length == 1) {
					return this._walkDom(domNode.childNodes[0], rootElement);
				}

				let viewElement;

				if (isDomElement) {
					viewElement = this._convertElement(domNode);

					if (rootElement) {
						rootElement.appendChildren(viewElement);
					}
				} else {
					viewElement = rootElement ? rootElement : new _documentfragment2.default();
				}

				for (let i = 0; i < children.length; i++) {
					const child = children[i];
					viewElement.appendChildren(this._walkDom(child));
				}

				return rootElement ? rootElement : viewElement;
			}

			return new _text2.default(domNode.textContent);
		}

		/**
   * Converts DOM Element to {engine.view.Element view Element}.
   *
   * @private
   * @param {Element} domElement DOM element to convert.
   * @returns {engine.view.Element|engine.view.AttributeElement|engine.view.ContainerElement} Tree view
   * element converted from DOM element.
   */
		_convertElement(domElement) {
			const info = this._convertElementName(domElement);
			let viewElement;

			if (info.type == 'attribute') {
				viewElement = new _attributeelement2.default(info.name);

				if (info.priority !== null) {
					viewElement.priority = info.priority;
				}
			} else if (info.type == 'container') {
				viewElement = new _containerelement2.default(info.name);
			} else {
				viewElement = new _element2.default(info.name);
			}

			const attributes = domElement.attributes;
			const attributesCount = attributes.length;

			for (let i = 0; i < attributesCount; i++) {
				const attribute = attributes[i];
				viewElement.setAttribute(attribute.name, attribute.value);
			}

			return viewElement;
		}

		/**
   * Converts DOM element tag name to information needed for creating {@link engine.view.Element view Element} instance.
   * Name can be provided in couple formats: as a simple element's name (`div`), as a type and name (`container:div`,
   * `attribute:span`), as a name and priority (`span:12`) and as a type, priority, name trio (`attribute:span:12`);
   *
   * @private
   * @param {Element} element DOM Element which tag name should be converted.
   * @returns {Object} info Object with parsed information.
   * @returns {String} info.name Parsed name of the element.
   * @returns {String|null} info.type Parsed type of the element, can be `attribute` or `container`.
   * @returns {Number|null} info.priority Parsed priority of the element.
   */
		_convertElementName(element) {
			const parts = element.tagName.toLowerCase().split(':');

			if (parts.length == 1) {
				return {
					name: parts[0],
					type: null,
					priority: null
				};
			}

			if (parts.length == 2) {
				// Check if type and name: container:div.
				const type = this._convertType(parts[0]);

				if (type) {
					return {
						name: parts[1],
						type: type,
						priority: null
					};
				}

				// Check if name and priority: span:10.
				const priority = this._convertPriority(parts[1]);

				if (priority !== null) {
					return {
						name: parts[0],
						type: 'attribute',
						priority: priority
					};
				}

				throw new Error(`Parse error - cannot parse element's tag name: ${ element.tagName.toLowerCase() }.`);
			}

			// Check if name is in format type:name:priority.
			if (parts.length === 3) {
				const type = this._convertType(parts[0]);
				const priority = this._convertPriority(parts[2]);

				if (type && priority !== null) {
					return {
						name: parts[1],
						type: type,
						priority: priority
					};
				}
			}

			throw new Error(`Parse error - cannot parse element's tag name: ${ element.tagName.toLowerCase() }.`);
		}

		/**
   * Checks if element's type is allowed. Returns `attribute`, `container` or `null`.
   *
   * @private
   * @param {String} type
   * @returns {String|null}
   */
		_convertType(type) {
			if (type == 'container' || type == 'attribute') {
				return type;
			}

			return null;
		}

		/**
   * Checks if given priority is allowed. Returns null if priority cannot be converted.
   *
   * @private
   * @param {String} priorityString
   * @returns {Number|Null}
   */
		_convertPriority(priorityString) {
			const priority = parseInt(priorityString, 10);

			if (!isNaN(priority)) {
				return priority;
			}

			return null;
		}

	}

	/**
  * Private helper class used for converting view tree to string.
  *
  * @private
  */
	class ViewStringify {
		/**
   * Creates ViewStringify instance.
   *
   * @param root
   * @param {engine.view.Selection} [selection=null] Selection which ranges should be also converted to string.
   * @param {Object} [options] Options object.
   * @param {Boolean} [options.showType=false] When set to `true` type of elements will be printed ( `<container:p>`
   * instead of `<p>` and `<attribute:b>` instead of `<b>`.
   * @param {Boolean} [options.showPriority=false] When set to `true` AttributeElement's priority will be printed.
   * @param {Boolean} [options.ignoreRoot=false] When set to `true` root's element opening and closing tag will not
   * be outputted.
   */
		constructor(root, selection = null, options = {}) {
			this.root = root;
			this.selection = selection;
			this.ranges = [];

			if (this.selection) {
				this.ranges = [...selection.getRanges()];
			}

			this.showType = !!options.showType;
			this.showPriority = !!options.showPriority;
			this.ignoreRoot = !!options.ignoreRoot;
		}

		/**
   * Converts view to string.
   *
   * @returns {String} String representation of the view elements.
   */
		stringify() {
			let result = '';
			this._walkView(this.root, chunk => {
				result += chunk;
			});

			return result;
		}

		/**
   * Executes simple walker that iterates over all elements in the view tree starting from root element.
   * Calls `callback` with parsed chunks of string data.
   *
   * @private
   * @param {engine.view.DocumentFragment|engine.view.Element|engine.view.Text} root
   * @param {Function} callback
   */
		_walkView(root, callback) {
			const isElement = root instanceof _element2.default;
			const ignore = this.ignoreRoot && this.root === root;

			if (isElement || root instanceof _documentfragment2.default) {
				if (isElement && !ignore) {
					callback(this._stringifyElementOpen(root));
				}

				let offset = 0;
				callback(this._stringifyElementRanges(root, offset));

				for (let child of root.getChildren()) {
					this._walkView(child, callback);
					offset++;
					callback(this._stringifyElementRanges(root, offset));
				}

				if (isElement && !ignore) {
					callback(this._stringifyElementClose(root));
				}
			}

			if (root instanceof _text2.default) {
				callback(this._stringifyTextRanges(root));
			}
		}

		/**
   * Checks if given {@link engine.view.Element Element} has {@link engine.view.Range#start range start} or
   * {@link engine.view.Range#start range end} placed at given offset and returns its string representation.
   *
   * @private
   * @param {engine.view.Element} element
   * @param {Number} offset
   */
		_stringifyElementRanges(element, offset) {
			let start = '';
			let end = '';
			let collapsed = '';

			for (let range of this.ranges) {
				if (range.start.parent == element && range.start.offset === offset) {
					if (range.isCollapsed) {
						collapsed += ELEMENT_RANGE_START_TOKEN + ELEMENT_RANGE_END_TOKEN;
					} else {
						start += ELEMENT_RANGE_START_TOKEN;
					}
				}

				if (range.end.parent === element && range.end.offset === offset && !range.isCollapsed) {
					end += ELEMENT_RANGE_END_TOKEN;
				}
			}

			return end + collapsed + start;
		}

		/**
   * Checks if given {@link engine.view.Element Text node} has {@link engine.view.Range#start range start} or
   * {@link engine.view.Range#start range end} placed somewhere inside. Returns string representation of text
   * with range delimiters placed inside.
   *
   * @private
   * @param {engine.view.Text} node
   */
		_stringifyTextRanges(node) {
			const length = node.data.length;
			let result = node.data.split('');

			// Add one more element for ranges ending after last character in text.
			result[length] = '';

			// Represent each letter as object with information about opening/closing ranges at each offset.
			result = result.map(letter => {
				return {
					letter: letter,
					start: '',
					end: '',
					collapsed: ''
				};
			});

			for (let range of this.ranges) {
				const start = range.start;
				const end = range.end;

				if (start.parent == node && start.offset >= 0 && start.offset <= length) {
					if (range.isCollapsed) {
						result[end.offset].collapsed += TEXT_RANGE_START_TOKEN + TEXT_RANGE_END_TOKEN;
					} else {
						result[start.offset].start += TEXT_RANGE_START_TOKEN;
					}
				}

				if (end.parent == node && end.offset >= 0 && end.offset <= length && !range.isCollapsed) {
					result[end.offset].end += TEXT_RANGE_END_TOKEN;
				}
			}

			return result.map(item => item.end + item.collapsed + item.start + item.letter).join('');
		}

		/**
   * Converts passed {@link engine.view.Element Element} to opening tag.
   * Depending on current configuration opening tag can be simple (`<a>`), contain type prefix (`<container:p>` or
   * `<attribute:a>`), contain priority information ( `<attribute:a priority=20>` ). Element's attributes also
   * will be included (`<a href="http://ckeditor.com" name="foobar">`).
   *
   * @private
   * @param {engine.view.Element} element
   * @returns {String}
   */
		_stringifyElementOpen(element) {
			const priority = this._stringifyElementPriority(element);
			const type = this._stringifyElementType(element);
			const name = [type, element.name, priority].filter(i => i !== '').join(':');
			const attributes = this._stringifyElementAttributes(element);
			const parts = [name, attributes];

			return `<${ parts.filter(i => i !== '').join(' ') }>`;
		}

		/**
   * Converts passed {@link engine.view.Element Element} to closing tag.
   * Depending on current configuration opening tag can be simple (`</a>`) or contain type prefix (`</container:p>` or
   * `</attribute:a>`).
   *
   * @private
   * @param {engine.view.Element} element
   * @returns {String}
   */
		_stringifyElementClose(element) {
			const priority = this._stringifyElementPriority(element);
			const type = this._stringifyElementType(element);
			const name = [type, element.name, priority].filter(i => i !== '').join(':');

			return `</${ name }>`;
		}

		/**
   * Converts passed {@link engine.view.Element Element's} type to its string representation
   * Returns 'attribute' for {@link engine.view.AttributeElement AttributeElements} and
   * 'container' for {@link engine.view.ContainerElement ContainerElements}. Returns empty string when current
   * configuration is preventing showing elements' types.
   *
   * @private
   * @param {engine.view.Element} element
   * @returns {String}
   */
		_stringifyElementType(element) {
			if (this.showType) {
				if (element instanceof _attributeelement2.default) {
					return 'attribute';
				}

				if (element instanceof _containerelement2.default) {
					return 'container';
				}
			}

			return '';
		}

		/**
   * Converts passed {@link engine.view.Element Element} to its priority representation.
   * Priority string representation will be returned when passed element is an instance of
   * {@link engine.view.AttributeElement AttributeElement} and current configuration allow to show priority.
   * Otherwise returns empty string.
   *
   * @private
   * @param {engine.view.Element} element
   * @returns {String}
   */
		_stringifyElementPriority(element) {
			if (this.showPriority && element instanceof _attributeelement2.default) {
				return element.priority;
			}

			return '';
		}

		/**
   * Converts passed {@link engine.view.Element Element} attributes to their string representation.
   * If element has no attributes - empty string is returned.
   *
   * @private
   * @param {engine.view.Element} element
   * @returns {String}
   */
		_stringifyElementAttributes(element) {
			const attributes = [];
			const keys = [...element.getAttributeKeys()].sort();

			for (let attribute of keys) {
				attributes.push(`${ attribute }="${ element.getAttribute(attribute) }"`);
			}

			return attributes.join(' ');
		}
	}
});