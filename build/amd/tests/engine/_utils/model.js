define(['exports', '/ckeditor5/engine/model/treewalker.js', '/ckeditor5/engine/model/range.js', '/ckeditor5/engine/model/position.js', '/ckeditor5/engine/model/text.js', '/ckeditor5/engine/model/rootelement.js', '/ckeditor5/engine/model/element.js', '/ckeditor5/engine/model/documentfragment.js', '/ckeditor5/engine/model/selection.js', '/ckeditor5/engine/model/document.js'], function (exports, _treewalker, _range, _position, _text, _rootelement, _element, _documentfragment, _selection, _document) {
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

	var _treewalker2 = _interopRequireDefault(_treewalker);

	var _range2 = _interopRequireDefault(_range);

	var _position2 = _interopRequireDefault(_position);

	var _text2 = _interopRequireDefault(_text);

	var _rootelement2 = _interopRequireDefault(_rootelement);

	var _element2 = _interopRequireDefault(_element);

	var _documentfragment2 = _interopRequireDefault(_documentfragment);

	var _selection2 = _interopRequireDefault(_selection);

	var _document2 = _interopRequireDefault(_document);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * Writes the contents of the {@link engine.model.Document Document} to an HTML-like string.
  *
  * @param {engine.model.Document} document
  * @param {Object} [options]
  * @param {Boolean} [options.withoutSelection=false] Whether to write the selection. When set to `true` selection will
  * be not included in returned string.
  * @param {Boolean} [options.rootName='main'] Name of the root from which data should be stringified. If not provided
  * default `main` name will be used.
  * @returns {String} The stringified data.
  */
	function getData(document, options = {}) {
		const withoutSelection = !!options.withoutSelection;
		const rootName = options.rootName || 'main';
		const root = document.getRoot(rootName);

		return withoutSelection ? getData._stringify(root) : getData._stringify(root, document.selection);
	}

	// Set stringify as getData private method - needed for testing/spying.
	getData._stringify = stringify;

	/**
  * Sets the contents of the {@link engine.model.Document Document} provided as HTML-like string.
  *
  * @param {engine.model.Document} document
  * @param {String} data HTML-like string to write into Document.
  * @param {Object} options
  * @param {String} [options.rootName] Root name where parsed data will be stored. If not provided, default `main` name will be
  * used.
  */
	function setData(document, data, options = {}) {
		setData._parse(data, {
			document: document,
			rootName: options.rootName
		});
	}

	// Set parse as setData private method - needed for testing/spying.
	setData._parse = parse;

	/**
  * Converts model nodes to HTML-like string representation.
  *
  * @param {engine.model.RootElement|engine.model.Element|engine.model.Text|
  * engine.model.DocumentFragment} node Node to stringify.
  * @param {engine.model.Selection|engine.model.Position|engine.model.Range} [selectionOrPositionOrRange = null ]
  * Selection instance which ranges will be included in returned string data. If Range instance is provided - it will be
  * converted to selection containing this range. If Position instance is provided - it will be converted to selection
  * containing one range collapsed at this position.
  * @returns {String} HTML-like string representing the model.
  */
	function stringify(node, selectionOrPositionOrRange = null) {
		let selection;
		let document;

		if (node instanceof _rootelement2.default) {
			document = node.document;
		} else if (node instanceof _element2.default || node instanceof _text2.default) {
			// If root is Element or Text - wrap it with DocumentFragment.
			node = new _documentfragment2.default(node);
		}

		document = document || new _document2.default();

		const walker = new _treewalker2.default({
			boundaries: _range2.default.createFromElement(node)
		});

		if (selectionOrPositionOrRange instanceof _selection2.default) {
			selection = selectionOrPositionOrRange;
		} else if (selectionOrPositionOrRange instanceof _range2.default) {
			selection = document.selection;
			selection.addRange(selectionOrPositionOrRange);
		} else if (selectionOrPositionOrRange instanceof _position2.default) {
			selection = document.selection;
			selection.addRange(new _range2.default(selectionOrPositionOrRange, selectionOrPositionOrRange));
		}

		let ret = '';
		let lastPosition = _position2.default.createFromParentAndOffset(node, 0);
		const withSelection = !!selection;

		for (let value of walker) {
			if (withSelection) {
				ret += writeSelection(value.previousPosition, selection);
			}

			ret += writeItem(value, selection, { selection: withSelection });

			lastPosition = value.nextPosition;
		}

		if (withSelection) {
			ret += writeSelection(lastPosition, selection);
		}

		return ret;
	}

	/**
  * Parses HTML-like string and returns model {@link engine.model.RootElement rootElement}.
  *
  * @param {String} data HTML-like string to be parsed.
  * @param {Object} options
  * @param {engine.model.Document} [options.document] Document from which root element and selection will be used. If
  * not provided new {engine.model.Document document} instance will be created.
  * @param {String} [options.rootName='main'] When `document` option is provided this root name will be used to create
  * {engine.model.RootElement RootElement} instance.
  * @returns {engine.model.RootElement|Object} Returns parsed RootElement or object with two fields `model`
  * and `selection` when selection ranges were included in data to parse.
  */
	function parse(data, options = {}) {
		let document, root;
		let withSelection = false;
		const rootName = options.rootName || 'main';

		if (options.document) {
			document = options.document;
			root = document.getRoot(rootName);
			root.removeChildren(0, root.getChildCount());
		} else {
			document = new _document2.default();
			root = document.createRoot(rootName);
		}

		const path = [];
		let selectionStart, selectionEnd, selectionAttributes, textAttributes;

		const handlers = {
			text(token) {
				root.appendChildren(new _text2.default(token.text, textAttributes));
			},

			textStart(token) {
				textAttributes = token.attributes;
				path.push('$text');
			},

			textEnd() {
				if (path.pop() != '$text') {
					throw new Error('Parse error - unexpected closing tag.');
				}

				textAttributes = null;
			},

			openingTag(token) {
				let el = new _element2.default(token.name, token.attributes);
				root.appendChildren(el);

				root = el;

				path.push(token.name);
			},

			closingTag(token) {
				if (path.pop() != token.name) {
					throw new Error('Parse error - unexpected closing tag.');
				}

				root = root.parent;
			},

			collapsedSelection(token) {
				withSelection = true;
				document.selection.collapse(root, 'END');
				document.selection.setAttributesTo(token.attributes);
			},

			selectionStart(token) {
				selectionStart = _position2.default.createFromParentAndOffset(root, root.getChildCount());
				selectionAttributes = token.attributes;
			},

			selectionEnd() {
				if (!selectionStart) {
					throw new Error('Parse error - missing selection start.');
				}

				withSelection = true;
				selectionEnd = _position2.default.createFromParentAndOffset(root, root.getChildCount());

				document.selection.setRanges([new _range2.default(selectionStart, selectionEnd)], selectionAttributes.backward);

				delete selectionAttributes.backward;

				document.selection.setAttributesTo(selectionAttributes);
			}
		};

		for (let token of tokenize(data)) {
			handlers[token.type](token);
		}

		if (path.length) {
			throw new Error('Parse error - missing closing tags: ' + path.join(', ') + '.');
		}

		if (selectionStart && !selectionEnd) {
			throw new Error('Parse error - missing selection end.');
		}

		if (withSelection) {
			return {
				model: root,
				selection: document.selection
			};
		}

		return root;
	}

	// -- getData helpers ---------------------------------------------------------

	function writeItem(walkerValue, selection, options) {
		const type = walkerValue.type;
		const item = walkerValue.item;

		if (type == 'ELEMENT_START') {
			let attrs = writeAttributes(item.getAttributes());

			if (attrs) {
				return `<${ item.name } ${ attrs }>`;
			}

			return `<${ item.name }>`;
		}

		if (type == 'ELEMENT_END') {
			return `</${ item.name }>`;
		}

		return writeText(walkerValue, selection, options);
	}

	function writeText(walkerValue, selection, options) {
		const item = walkerValue.item;
		const attrs = writeAttributes(item.getAttributes());
		let text = Array.from(item.text);

		if (options.selection) {
			const startIndex = walkerValue.previousPosition.offset + 1;
			const endIndex = walkerValue.nextPosition.offset - 1;
			let index = startIndex;

			while (index <= endIndex) {
				// Add the selection marker without changing any indexes, so if second marker must be added
				// in the same loop it does not blow up.
				text[index - startIndex] += writeSelection(_position2.default.createFromParentAndOffset(item.commonParent, index), selection);

				index++;
			}
		}

		text = text.join('');

		if (attrs) {
			return `<$text ${ attrs }>${ text }</$text>`;
		}

		return text;
	}

	function writeAttributes(attrs) {
		attrs = Array.from(attrs);

		return attrs.map(attr => attr[0] + '=' + JSON.stringify(attr[1])).sort().join(' ');
	}

	function writeSelection(currentPosition, selection) {
		// TODO: This function obviously handles only the first range.
		const range = selection.getFirstRange();

		// Handle end of the selection.
		if (!selection.isCollapsed && range.end.compareWith(currentPosition) == 'SAME') {
			return '</selection>';
		}

		// Handle no match.
		if (range.start.compareWith(currentPosition) != 'SAME') {
			return '';
		}

		// Handle beginning of the selection.

		let ret = '<selection';
		const attrs = writeAttributes(selection.getAttributes());

		// TODO: Once we'll support multiple ranges this will need to check which range it is.
		if (selection.isBackward) {
			ret += ' backward';
		}

		if (attrs) {
			ret += ' ' + attrs;
		}

		ret += selection.isCollapsed ? ' />' : '>';

		return ret;
	}

	// -- setData helpers ---------------------------------------------------------

	const patterns = {
		selection: /^<(\/?selection)( [^>]*)?>/,
		tag: /^<([^>]+)>/,
		text: /^[^<]+/
	};

	const handlers = {
		selection(match) {
			const tagName = match[1];
			const tagExtension = match[2] || '';

			if (tagName[0] == '/') {
				return {
					type: 'selectionEnd'
				};
			}

			if (tagExtension.endsWith(' /')) {
				return {
					type: 'collapsedSelection',
					attributes: parseAttributes(tagExtension.slice(1, -2))
				};
			}

			return {
				type: 'selectionStart',
				attributes: parseAttributes(tagExtension.slice(1))
			};
		},

		tag(match) {
			const tagContents = match[1].split(/\s+/);
			const tagName = tagContents.shift();
			const attrs = tagContents.join(' ');

			if (tagName == '/$text') {
				return {
					type: 'textEnd'
				};
			}

			if (tagName == '$text') {
				return {
					type: 'textStart',
					attributes: parseAttributes(attrs)
				};
			}

			if (tagName[0] == '/') {
				return {
					type: 'closingTag',
					name: tagName.slice(1)
				};
			}

			return {
				type: 'openingTag',
				name: tagName,
				attributes: parseAttributes(attrs)
			};
		},

		text(match) {
			return {
				type: 'text',
				text: match[0]
			};
		}
	};

	function* tokenize(data) {
		while (data) {
			const consumed = consumeNextToken(data);

			data = consumed.data;
			yield consumed.token;
		}
	}

	function consumeNextToken(data) {
		let match;

		for (let patternName in patterns) {
			match = data.match(patterns[patternName]);

			if (match) {
				data = data.slice(match[0].length);

				return {
					token: handlers[patternName](match),
					data
				};
			}
		}

		throw new Error('Parse error - unexpected token: ' + data + '.');
	}

	function parseAttributes(attrsString) {
		attrsString = attrsString.trim();

		if (!attrsString) {
			return {};
		}

		const pattern = /(?:backward|(\w+)=("[^"]+"|[^\s]+))\s*/;
		const attrs = {};

		while (attrsString) {
			let match = attrsString.match(pattern);

			if (!match) {
				throw new Error('Parse error - unexpected token: ' + attrsString + '.');
			}

			if (match[0].trim() == 'backward') {
				attrs.backward = true;
			} else {
				attrs[match[1]] = JSON.parse(match[2]);
			}

			attrsString = attrsString.slice(match[0].length);
		}

		return attrs;
	}
});