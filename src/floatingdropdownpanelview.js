/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import DropdownPanelView from '/ckeditor5/ui/dropdown/dropdownpanelview.js';

export default class FloatingDropdownPanelView extends DropdownPanelView {
	position() {
		const selRect = document.defaultView.getSelection().getRangeAt( 0 ).getBoundingClientRect();
		const bodyRect = document.body.getBoundingClientRect();

		this.element.style.top = selRect.bottom - bodyRect.top + 'px';
		this.element.style.left = selRect.right - bodyRect.left + 'px';

		// A hack. I'm too lazy to create another component DropdownPanelView isn't the right one, really.
		this.element.style.transform = 'none';
		this.element.style.bottom = 'auto';
	}
}
