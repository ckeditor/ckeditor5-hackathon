define(['exports', '../dropdown.js', '../../list/list.js', '../../list/listview.js'], function (exports, _dropdown, _list, _listview) {
  /**
   * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
   * For licensing, see LICENSE.md.
   */

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _dropdown2 = _interopRequireDefault(_dropdown);

  var _list2 = _interopRequireDefault(_list);

  var _listview2 = _interopRequireDefault(_listview);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * The basic list dropdown controller class.
   *
   * @memberOf ui.dropdown.list
   * @extends ui.dropdown.Dropdown
   */
  class ListDropdown extends _dropdown2.default {
    constructor(model, view) {
      super(model, view);

      const content = this.model.content;

      // Collapse the dropdown when an item in the panel is clicked.
      this.listenTo(content, 'execute', () => {
        this.model.isOn = false;
      });

      this.panel.add('content', new _list2.default(content, new _listview2.default(content)));
    }
  }

  exports.default = ListDropdown;
});