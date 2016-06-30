define(['exports', './basichtmlwriter.js'], function (exports, _basichtmlwriter) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _basichtmlwriter2 = _interopRequireDefault(_basichtmlwriter);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * HtmlDataProcessor class.
  * This data processor implementation uses HTML as input/output data.
  *
  * @memberOf engine.dataProcessor
  * @implements engine.dataProcessor.DataProcessor
  */
	class HtmlDataProcessor {
		/**
   * Creates a new instance of the HtmlDataProcessor class.
   */
		constructor() {
			/**
    * DOMParser instance used to parse HTML string to HTMLDocument.
    *
    * @private
    * @member {DOMParser} engine.dataProcessor.HtmlDataProcessor#_domParser
    */
			this._domParser = new DOMParser();

			/**
    * BasicHtmlWriter instance used to convert DOM elements to HTML string.
    *
    * @private
    * @member {engine.dataProcessor.BasicHtmlWriter} engine.dataProcessor.HtmlDataProcessor#_htmlWriter
    */
			this._htmlWriter = new _basichtmlwriter2.default();
		}

		/**
   * Converts provided document fragment to data format - in this case HTML string.
   *
   * @param {DocumentFragment} fragment
   * @returns {String}
   */
		toData(fragment) {
			return this._htmlWriter.getHtml(fragment);
		}

		/**
   * Converts HTML String to its DOM representation. Returns DocumentFragment, containing nodes parsed from
   * provided data.
   *
   * @param {String} data
   * @returns {DocumentFragment}
   */
		toDom(data) {
			const document = this._domParser.parseFromString(data, 'text/html');
			const fragment = document.createDocumentFragment();
			const nodes = document.body.childNodes;

			while (nodes.length > 0) {
				fragment.appendChild(nodes[0]);
			}

			return fragment;
		}
	}
	exports.default = HtmlDataProcessor;
});