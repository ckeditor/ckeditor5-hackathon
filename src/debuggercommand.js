/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import Command from '../command/command.js';

export default class DebuggerCommand extends Command {
	constructor( editor ) {
		super( editor );

		this.set( 'value', true );
	}

	_doExecute() {
		this.value = !this.value;
	}
}
