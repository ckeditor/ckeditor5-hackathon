define(['exports', './toString.js', './_unescapeHtmlChar.js'], function (exports, _toString, _unescapeHtmlChar) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _toString2 = _interopRequireDefault(_toString);

    var _unescapeHtmlChar2 = _interopRequireDefault(_unescapeHtmlChar);

    function _interopRequireDefault(obj) {
        /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    /** Used to match HTML entities and HTML characters. */
    var reEscapedHtml = /&(?:amp|lt|gt|quot|#39|#96);/g,
        reHasEscapedHtml = RegExp(reEscapedHtml.source);

    /**
     * The inverse of `_.escape`; this method converts the HTML entities
     * `&amp;`, `&lt;`, `&gt;`, `&quot;`, `&#39;`, and `&#96;` in `string` to
     * their corresponding characters.
     *
     * **Note:** No other HTML entities are unescaped. To unescape additional
     * HTML entities use a third-party library like [_he_](https://mths.be/he).
     *
     * @static
     * @memberOf _
     * @since 0.6.0
     * @category String
     * @param {string} [string=''] The string to unescape.
     * @returns {string} Returns the unescaped string.
     * @example
     *
     * _.unescape('fred, barney, &amp; pebbles');
     * // => 'fred, barney, & pebbles'
     */
    function unescape(string) {
        string = (0, _toString2.default)(string);
        return string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, _unescapeHtmlChar2.default) : string;
    }

    exports.default = unescape;
});