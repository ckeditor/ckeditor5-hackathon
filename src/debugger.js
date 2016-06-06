/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import Feature from '../feature.js';
import DebuggerEngine from './debuggerengine';

/**
 * A debugger feature for editor.
 * Allows to preview model data in a graphical tree.
 *
 * @memberOf debugger
 * @extends ckeditor5.Feature
 */
export default class Debugger extends Feature {

	static get requires() {
		return [ DebuggerEngine ];
	}

	/**
	 * @inheritDoc
	 */
	init() {
		// todo: some logic will be there
	}
}
