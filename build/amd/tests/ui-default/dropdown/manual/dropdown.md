@bender-ui: collapsed
@bender-tags: ui dropdown

1. Make sure each dropdown opens when clicked.
2. The panel that shows up should be positioned precisely below and to the left edge of the parent dropdown.
4. The panel that shows up should float **over** the rest of the page.

## ListDropdown

1. `ListDropdown` should close when any of the dropdown items is clicked. Clicked item's model should be logged in console.
2. `ListDropdown` should close when clicked beyond the dropdown like page body or other elements.

### Notes:

* Play with `listDropdownModel.isOn` to control visibility of the panel.
* Play with `listDropdownModel.isEnabled` to control dropdown state.
* Play with `listDropdownModel.label` to control dropdown label.
* Play with `listDropdownCollection`, i.e. add new item
```
listDropdownCollection.add(
	new window.Model( {
		label: '2.5em',
		style: 'font-size: 2.5em'
	} )
);
```
