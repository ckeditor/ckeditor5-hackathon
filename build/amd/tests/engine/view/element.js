define('tests', ['/ckeditor5/utils/count.js', '/ckeditor5/engine/view/node.js', '/ckeditor5/engine/view/element.js'], function (_count, _node, _element) {
	/**
  * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: view */

	'use strict';

	var _count2 = _interopRequireDefault(_count);

	var _node2 = _interopRequireDefault(_node);

	var _element2 = _interopRequireDefault(_element);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('Element', () => {
		describe('constructor', () => {
			it('should create element without attributes', () => {
				const el = new _element2.default('p');

				expect(el).to.be.an.instanceof(_node2.default);
				expect(el).to.have.property('name').that.equals('p');
				expect(el).to.have.property('parent').that.is.null;
				expect((0, _count2.default)(el.getAttributeKeys())).to.equal(0);
			});

			it('should create element with attributes as plain object', () => {
				const el = new _element2.default('p', { foo: 'bar' });

				expect(el).to.have.property('name').that.equals('p');
				expect((0, _count2.default)(el.getAttributeKeys())).to.equal(1);
				expect(el.getAttribute('foo')).to.equal('bar');
			});

			it('should create element with attributes as map', () => {
				const attrs = new Map();
				attrs.set('foo', 'bar');

				const el = new _element2.default('p', attrs);

				expect(el).to.have.property('name').that.equals('p');
				expect((0, _count2.default)(el.getAttributeKeys())).to.equal(1);
				expect(el.getAttribute('foo')).to.equal('bar');
			});

			it('should create element with children', () => {
				const child = new _element2.default('p', { foo: 'bar' });
				const parent = new _element2.default('div', [], [child]);

				expect(parent).to.have.property('name').that.equals('div');
				expect(parent.getChildCount()).to.equal(1);
				expect(parent.getChild(0)).to.have.property('name').that.equals('p');
			});

			it('should move class attribute to class set ', () => {
				const el = new _element2.default('p', { id: 'test', class: 'one two three' });

				expect(el._attrs.has('class')).to.be.false;
				expect(el._attrs.has('id')).to.be.true;
				expect(el._classes.has('one')).to.be.true;
				expect(el._classes.has('two')).to.be.true;
				expect(el._classes.has('three')).to.be.true;
			});

			it('should move style attribute to style map', () => {
				const el = new _element2.default('p', { id: 'test', style: 'one: style1; two:style2 ; three : url(http://ckeditor.com)' });

				expect(el._attrs.has('style')).to.be.false;
				expect(el._attrs.has('id')).to.be.true;
				expect(el._styles.has('one')).to.be.true;
				expect(el._styles.get('one')).to.equal('style1');
				expect(el._styles.has('two')).to.be.true;
				expect(el._styles.get('two')).to.equal('style2');
				expect(el._styles.has('three')).to.be.true;
				expect(el._styles.get('three')).to.equal('url(http://ckeditor.com)');
			});
		});

		describe('clone', () => {
			it('should clone element', () => {
				const el = new _element2.default('p', { attr1: 'foo', attr2: 'bar' });
				const clone = el.clone();

				expect(clone).to.not.equal(el);
				expect(clone.name).to.equal(el.name);
				expect(clone.getAttribute('attr1')).to.equal('foo');
				expect(clone.getAttribute('attr2')).to.equal('bar');
			});

			it('should deeply clone element', () => {
				const el = new _element2.default('p', { attr1: 'foo', attr2: 'bar' }, [new _element2.default('b', { attr: 'baz' }), new _element2.default('span', { attr: 'qux' })]);
				const count = el.getChildCount();
				const clone = el.clone(true);

				expect(clone).to.not.equal(el);
				expect(clone.name).to.equal(el.name);
				expect(clone.getAttribute('attr1')).to.equal('foo');
				expect(clone.getAttribute('attr2')).to.equal('bar');
				expect(clone.getChildCount()).to.equal(count);

				for (let i = 0; i < count; i++) {
					const child = el.getChild(i);
					const clonedChild = clone.getChild(i);

					expect(clonedChild).to.not.equal(child);
					expect(clonedChild.name).to.equal(child.name);
					expect(clonedChild.getAttribute('attr')).to.equal(child.getAttribute('attr'));
				}
			});

			it('shouldn\'t clone any children when deep copy is not performed', () => {
				const el = new _element2.default('p', { attr1: 'foo', attr2: 'bar' }, [new _element2.default('b', { attr: 'baz' }), new _element2.default('span', { attr: 'qux' })]);
				const clone = el.clone(false);

				expect(clone).to.not.equal(el);
				expect(clone.name).to.equal(el.name);
				expect(clone.getAttribute('attr1')).to.equal('foo');
				expect(clone.getAttribute('attr2')).to.equal('bar');
				expect(clone.getChildCount()).to.equal(0);
			});

			it('should clone class attribute', () => {
				const el = new _element2.default('p', { foo: 'bar' });
				el.addClass('baz', 'qux');
				const clone = el.clone(false);

				expect(clone).to.not.equal(el);
				expect(clone.name).to.equal(el.name);
				expect(clone.getAttribute('foo')).to.equal('bar');
				expect(clone.getAttribute('class')).to.equal('baz qux');
			});

			it('should clone style attribute', () => {
				const el = new _element2.default('p', { style: 'color: red; font-size: 12px;' });
				const clone = el.clone(false);

				expect(clone).to.not.equal(el);
				expect(clone.name).to.equal(el.name);
				expect(clone._styles.has('color')).to.be.true;
				expect(clone._styles.get('color')).to.equal('red');
				expect(clone._styles.has('font-size')).to.be.true;
				expect(clone._styles.get('font-size')).to.equal('12px');
			});
		});

		describe('isSimilar', () => {
			const el = new _element2.default('p', { foo: 'bar' });
			it('should return false when comparing to non-element', () => {
				expect(el.isSimilar(null)).to.be.false;
				expect(el.isSimilar({})).to.be.false;
			});

			it('should return true when the same node is provided', () => {
				expect(el.isSimilar(el)).to.be.true;
			});

			it('should return true for element with same attributes and name', () => {
				const other = new _element2.default('p', { foo: 'bar' });
				expect(el.isSimilar(other)).to.be.true;
			});

			it('sould return false when name is not the same', () => {
				const other = el.clone();
				other.name = 'div';

				expect(el.isSimilar(other)).to.be.false;
			});

			it('should return false when attributes are not the same', () => {
				const other1 = el.clone();
				const other2 = el.clone();
				const other3 = el.clone();
				other1.setAttribute('baz', 'qux');
				other2.setAttribute('foo', 'not-bar');
				other3.removeAttribute('foo');
				expect(el.isSimilar(other1)).to.be.false;
				expect(el.isSimilar(other2)).to.be.false;
				expect(el.isSimilar(other3)).to.be.false;
			});

			it('should compare class attribute', () => {
				const el1 = new _element2.default('p');
				const el2 = new _element2.default('p');
				const el3 = new _element2.default('p');
				const el4 = new _element2.default('p');

				el1.addClass('foo', 'bar');
				el2.addClass('bar', 'foo');
				el3.addClass('baz');
				el4.addClass('baz', 'bar');

				expect(el1.isSimilar(el2)).to.be.true;
				expect(el1.isSimilar(el3)).to.be.false;
				expect(el1.isSimilar(el4)).to.be.false;
			});

			it('should compare styles attribute', () => {
				const el1 = new _element2.default('p');
				const el2 = new _element2.default('p');
				const el3 = new _element2.default('p');
				const el4 = new _element2.default('p');

				el1.setStyle('color', 'red');
				el1.setStyle('top', '10px');
				el2.setStyle('top', '20px');
				el3.setStyle('top', '10px');
				el3.setStyle('color', 'red');
				el4.setStyle('color', 'blue');
				el4.setStyle('top', '10px');

				expect(el1.isSimilar(el2)).to.be.false;
				expect(el1.isSimilar(el3)).to.be.true;
				expect(el2.isSimilar(el3)).to.be.false;
				expect(el3.isSimilar(el4)).to.be.false;
			});
		});

		describe('children manipulation methods', () => {
			let parent, el1, el2, el3, el4;

			beforeEach(() => {
				parent = new _element2.default('p');
				el1 = new _element2.default('el1');
				el2 = new _element2.default('el2');
				el3 = new _element2.default('el3');
				el4 = new _element2.default('el4');
			});

			describe('insertion', () => {
				it('should insert children', () => {
					const count1 = parent.insertChildren(0, [el1, el3]);
					const count2 = parent.insertChildren(1, el2);

					expect(parent.getChildCount()).to.equal(3);
					expect(parent.getChild(0)).to.have.property('name').that.equals('el1');
					expect(parent.getChild(1)).to.have.property('name').that.equals('el2');
					expect(parent.getChild(2)).to.have.property('name').that.equals('el3');
					expect(count1).to.equal(2);
					expect(count2).to.equal(1);
				});

				it('should append children', () => {
					const count1 = parent.insertChildren(0, el1);
					const count2 = parent.appendChildren(el2);
					const count3 = parent.appendChildren(el3);

					expect(parent.getChildCount()).to.equal(3);
					expect(parent.getChild(0)).to.have.property('name').that.equals('el1');
					expect(parent.getChild(1)).to.have.property('name').that.equals('el2');
					expect(parent.getChild(2)).to.have.property('name').that.equals('el3');
					expect(count1).to.equal(1);
					expect(count2).to.equal(1);
					expect(count3).to.equal(1);
				});
			});

			describe('getChildIndex', () => {
				it('should return child index', () => {
					parent.appendChildren(el1);
					parent.appendChildren(el2);
					parent.appendChildren(el3);

					expect(parent.getChildCount()).to.equal(3);
					expect(parent.getChildIndex(el1)).to.equal(0);
					expect(parent.getChildIndex(el2)).to.equal(1);
					expect(parent.getChildIndex(el3)).to.equal(2);
				});
			});

			describe('getChildren', () => {
				it('should renturn children iterator', () => {
					parent.appendChildren(el1);
					parent.appendChildren(el2);
					parent.appendChildren(el3);

					const expected = [el1, el2, el3];
					let i = 0;

					for (let child of parent.getChildren()) {
						expect(child).to.equal(expected[i]);
						i++;
					}

					expect(i).to.equal(3);
				});
			});

			describe('removeChildren', () => {
				it('should remove children', () => {
					parent.appendChildren(el1);
					parent.appendChildren(el2);
					parent.appendChildren(el3);
					parent.appendChildren(el4);

					parent.removeChildren(1, 2);

					expect(parent.getChildCount()).to.equal(2);
					expect(parent.getChild(0)).to.have.property('name').that.equals('el1');
					expect(parent.getChild(1)).to.have.property('name').that.equals('el4');

					expect(el1.parent).to.equal(parent);
					expect(el2.parent).to.be.null;
					expect(el3.parent).to.be.null;
					expect(el4.parent).equal(parent);
				});

				it('should remove one child when second parameter is not specified', () => {
					parent.appendChildren(el1);
					parent.appendChildren(el2);
					parent.appendChildren(el3);

					const removed = parent.removeChildren(1);

					expect(parent.getChildCount()).to.equal(2);
					expect(parent.getChild(0)).to.have.property('name').that.equals('el1');
					expect(parent.getChild(1)).to.have.property('name').that.equals('el3');

					expect(removed.length).to.equal(1);
					expect(removed[0]).to.have.property('name').that.equals('el2');
				});
			});
		});

		describe('attributes manipulation methods', () => {
			let el;

			beforeEach(() => {
				el = new _element2.default('p');
			});

			describe('setAttribute', () => {
				it('should set attribute', () => {
					el.setAttribute('foo', 'bar');

					expect(el._attrs.has('foo')).to.be.true;
					expect(el._attrs.get('foo')).to.equal('bar');
				});

				it('should fire change event with attributes type', done => {
					el.once('change:attributes', eventInfo => {
						expect(eventInfo.source).to.equal(el);
						done();
					});

					el.setAttribute('foo', 'bar');
				});

				it('should set class', () => {
					el.setAttribute('class', 'foo bar');

					expect(el._attrs.has('class')).to.be.false;
					expect(el._classes.has('foo')).to.be.true;
					expect(el._classes.has('bar')).to.be.true;
				});

				it('should replace all existing classes', () => {
					el.setAttribute('class', 'foo bar baz');
					el.setAttribute('class', 'qux');

					expect(el._classes.has('foo')).to.be.false;
					expect(el._classes.has('bar')).to.be.false;
					expect(el._classes.has('baz')).to.be.false;
					expect(el._classes.has('qux')).to.be.true;
				});

				it('should replace all styles', () => {
					el.setStyle('color', 'red');
					el.setStyle('top', '10px');
					el.setAttribute('style', 'border:none');

					expect(el.hasStyle('color')).to.be.false;
					expect(el.hasStyle('top')).to.be.false;
					expect(el.hasStyle('border')).to.be.true;
					expect(el.getStyle('border')).to.equal('none');
				});
			});

			describe('getAttribute', () => {
				it('should return attribute', () => {
					el.setAttribute('foo', 'bar');

					expect(el.getAttribute('foo')).to.equal('bar');
					expect(el.getAttribute('bom')).to.not.be.ok;
				});

				it('should return class attribute', () => {
					el.addClass('foo', 'bar');

					expect(el.getAttribute('class')).to.equal('foo bar');
				});

				it('should return undefined if no class attribute', () => {
					expect(el.getAttribute('class')).to.be.undefined;
				});

				it('should return style attribute', () => {
					el.setStyle('color', 'red');
					el.setStyle('top', '10px');

					expect(el.getAttribute('style')).to.equal('color:red;top:10px;');
				});

				it('should return undefined if no style attribute', () => {
					expect(el.getAttribute('style')).to.be.undefined;
				});
			});

			describe('hasAttribute', () => {
				it('should return true if element has attribute', () => {
					el.setAttribute('foo', 'bar');

					expect(el.hasAttribute('foo')).to.be.true;
					expect(el.hasAttribute('bom')).to.be.false;
				});

				it('should return true if element has class attribute', () => {
					expect(el.hasAttribute('class')).to.be.false;
					el.addClass('foo');
					expect(el.hasAttribute('class')).to.be.true;
				});

				it('should return true if element has style attribute', () => {
					expect(el.hasAttribute('style')).to.be.false;
					el.setStyle('border', '1px solid red');
					expect(el.hasAttribute('style')).to.be.true;
				});
			});

			describe('getAttributeKeys', () => {
				it('should return keys', () => {
					el.setAttribute('foo', true);
					el.setAttribute('bar', true);

					const expected = ['foo', 'bar'];
					let i = 0;

					for (let key of el.getAttributeKeys()) {
						expect(key).to.equal(expected[i]);
						i++;
					}

					expect(i).to.equal(2);
				});

				it('should return class key', () => {
					el.addClass('foo');
					el.setAttribute('bar', true);
					const expected = ['class', 'bar'];
					let i = 0;

					for (let key of el.getAttributeKeys()) {
						expect(key).to.equal(expected[i]);
						i++;
					}
				});

				it('should return style key', () => {
					el.setStyle('color', 'black');
					el.setAttribute('bar', true);
					const expected = ['style', 'bar'];
					let i = 0;

					for (let key of el.getAttributeKeys()) {
						expect(key).to.equal(expected[i]);
						i++;
					}
				});
			});

			describe('removeAttribute', () => {
				it('should remove attributes', () => {
					el.setAttribute('foo', true);

					expect(el.hasAttribute('foo')).to.be.true;

					el.removeAttribute('foo');

					expect(el.hasAttribute('foo')).to.be.false;

					expect((0, _count2.default)(el.getAttributeKeys())).to.equal(0);
				});

				it('should fire change event with attributes type', done => {
					el.setAttribute('foo', 'bar');
					el.once('change:attributes', eventInfo => {
						expect(eventInfo.source).to.equal(el);
						done();
					});

					el.removeAttribute('foo');
				});

				it('should remove class attribute', () => {
					el.addClass('foo', 'bar');
					const el2 = new _element2.default('p');
					const removed1 = el.removeAttribute('class');
					const removed2 = el2.removeAttribute('class');

					expect(el.hasAttribute('class')).to.be.false;
					expect(el.hasClass('foo')).to.be.false;
					expect(el.hasClass('bar')).to.be.false;
					expect(removed1).to.be.true;
					expect(removed2).to.be.false;
				});

				it('should remove style attribute', () => {
					el.setStyle('color', 'red');
					el.setStyle('position', 'fixed');
					const el2 = new _element2.default('p');
					const removed1 = el.removeAttribute('style');
					const removed2 = el2.removeAttribute('style');

					expect(el.hasAttribute('style')).to.be.false;
					expect(el.hasStyle('color')).to.be.false;
					expect(el.hasStyle('position')).to.be.false;
					expect(removed1).to.be.true;
					expect(removed2).to.be.false;
				});
			});
		});

		describe('classes manipulation methods', () => {
			let el;

			beforeEach(() => {
				el = new _element2.default('p');
			});

			describe('addClass', () => {
				it('should add single class', () => {
					el.addClass('one');

					expect(el._classes.has('one')).to.be.true;
				});

				it('should fire change event with attributes type', done => {
					el.once('change:attributes', eventInfo => {
						expect(eventInfo.source).to.equal(el);
						done();
					});

					el.addClass('one');
				});

				it('should add multiple classes', () => {
					el.addClass('one', 'two', 'three');

					expect(el._classes.has('one')).to.be.true;
					expect(el._classes.has('two')).to.be.true;
					expect(el._classes.has('three')).to.be.true;
				});
			});

			describe('removeClass', () => {
				it('should remove single class', () => {
					el.addClass('one', 'two', 'three');

					el.removeClass('one');

					expect(el._classes.has('one')).to.be.false;
					expect(el._classes.has('two')).to.be.true;
					expect(el._classes.has('three')).to.be.true;
				});

				it('should fire change event with attributes type', done => {
					el.addClass('one');
					el.once('change:attributes', eventInfo => {
						expect(eventInfo.source).to.equal(el);
						done();
					});

					el.removeClass('one');
				});

				it('should remove multiple classes', () => {
					el.addClass('one', 'two', 'three', 'four');
					el.removeClass('one', 'two', 'three');

					expect(el._classes.has('one')).to.be.false;
					expect(el._classes.has('two')).to.be.false;
					expect(el._classes.has('three')).to.be.false;
					expect(el._classes.has('four')).to.be.true;
				});
			});

			describe('hasClass', () => {
				it('should check if element has a class', () => {
					el.addClass('one', 'two', 'three');

					expect(el.hasClass('one')).to.be.true;
					expect(el.hasClass('two')).to.be.true;
					expect(el.hasClass('three')).to.be.true;
					expect(el.hasClass('four')).to.be.false;
				});

				it('should check if element has multiple classes', () => {
					el.addClass('one', 'two', 'three');

					expect(el.hasClass('one', 'two')).to.be.true;
					expect(el.hasClass('three', 'two')).to.be.true;
					expect(el.hasClass('three', 'one', 'two')).to.be.true;
					expect(el.hasClass('three', 'one', 'two', 'zero')).to.be.false;
				});
			});

			describe('getClassNames', () => {
				it('should return iterator with all class names', () => {
					const names = ['one', 'two', 'three'];
					el.addClass(...names);
					const iterator = el.getClassNames();
					let i = 0;

					for (let name of iterator) {
						expect(name).to.equal(names[i++]);
					}
				});
			});
		});

		describe('styles manipulation methods', () => {
			let el;

			beforeEach(() => {
				el = new _element2.default('p');
			});

			describe('setStyle', () => {
				it('should set element style', () => {
					el.setStyle('color', 'red');

					expect(el._styles.has('color')).to.be.true;
					expect(el._styles.get('color')).to.equal('red');
				});

				it('should fire change event with attributes type', done => {
					el.once('change:attributes', eventInfo => {
						expect(eventInfo.source).to.equal(el);
						done();
					});

					el.setStyle('color', 'red');
				});

				it('should set multiple styles by providing an object', () => {
					el.setStyle({
						color: 'red',
						position: 'fixed'
					});

					expect(el._styles.has('color')).to.be.true;
					expect(el._styles.has('position')).to.be.true;
					expect(el._styles.get('color')).to.equal('red');
					expect(el._styles.get('position')).to.equal('fixed');
				});
			});

			describe('getStyle', () => {
				it('should get style', () => {
					el.setStyle({
						color: 'red',
						border: '1px solid red'
					});

					expect(el.getStyle('color')).to.equal('red');
					expect(el.getStyle('border')).to.equal('1px solid red');
				});
			});

			describe('getStyleNames', () => {
				it('should return iterator with all style names', () => {
					const names = ['color', 'position'];
					el.setStyle({
						color: 'red',
						position: 'absolute'
					});
					const iterator = el.getStyleNames();
					let i = 0;

					for (let name of iterator) {
						expect(name).to.equal(names[i++]);
					}
				});
			});

			describe('hasStyle', () => {
				it('should check if element has a style', () => {
					el.setStyle('padding-top', '10px');

					expect(el.hasStyle('padding-top')).to.be.true;
					expect(el.hasStyle('padding-left')).to.be.false;
				});

				it('should check if element has multiple styles', () => {
					el.setStyle({
						'padding-top': '10px',
						'margin-left': '10px',
						'color': '10px;'
					});

					expect(el.hasStyle('padding-top', 'margin-left')).to.be.true;
					expect(el.hasStyle('padding-top', 'margin-left', 'color')).to.be.true;
					expect(el.hasStyle('padding-top', 'padding-left')).to.be.false;
				});
			});

			describe('removeStyle', () => {
				it('should remove style', () => {
					el.setStyle('padding-top', '10px');
					el.removeStyle('padding-top');

					expect(el.hasStyle('padding-top')).to.be.false;
				});

				it('should fire change event with attributes type', done => {
					el.setStyle('color', 'red');
					el.once('change:attributes', eventInfo => {
						expect(eventInfo.source).to.equal(el);
						done();
					});

					el.removeStyle('color');
				});

				it('should remove multiple styles', () => {
					el.setStyle({
						'padding-top': '10px',
						'margin-top': '10px',
						'color': 'red'
					});
					el.removeStyle('padding-top', 'margin-top');

					expect(el.hasStyle('padding-top')).to.be.false;
					expect(el.hasStyle('margin-top')).to.be.false;
					expect(el.hasStyle('color')).to.be.true;
				});
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
