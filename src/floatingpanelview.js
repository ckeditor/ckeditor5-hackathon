/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import PanelView from '/ckeditor5/ui/panel/panelview.js';

export default class FloatingPanelView extends PanelView {
	constructor( model ) {
		super( model );

		this.template.attributes.class.push( 'ck-floating-panel' );

		this.listenTo( this.model, 'change:isOn', this.position, this );
	}

	position() {
		if ( !this.model.isOn ) {
			return;
		}

		const selRect = document.defaultView.getSelection().getRangeAt( 0 ).getBoundingClientRect();
		const bodyRect = document.body.getBoundingClientRect();

		this.element.style.top = selRect.bottom - bodyRect.top + 'px';
		this.element.style.left = selRect.right - bodyRect.left + 'px';
	}
}
