define('tests', ['/ckeditor5/engine/view/matcher.js', '/ckeditor5/engine/view/element.js'], function (_matcher, _element) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: view */

	'use strict';

	var _matcher2 = _interopRequireDefault(_matcher);

	var _element2 = _interopRequireDefault(_element);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('Matcher', () => {
		describe('add', () => {
			it('should allow to add pattern to matcher', () => {
				const matcher = new _matcher2.default('div');
				const el = new _element2.default('p', { title: 'foobar' });

				expect(matcher.match(el)).to.be.null;
				const pattern = { name: 'p', attribute: { title: 'foobar' } };
				matcher.add(pattern);
				const result = matcher.match(el);
				expect(result).to.have.property('pattern').that.equal(pattern);
				expect(result).to.have.property('element').that.equal(el);
				expect(result).to.have.property('match').that.has.property('name').that.is.true;
				expect(result.match).to.have.property('attribute').that.is.an('array');
				expect(result.match.attribute[0]).to.equal('title');
				expect(result).to.be.an('object');
			});

			it('should allow to add more than one pattern', () => {
				const matcher = new _matcher2.default();
				const el1 = new _element2.default('p');
				const el2 = new _element2.default('div');

				matcher.add('p', 'div');

				let result = matcher.match(el1);
				expect(result).to.be.an('object');
				expect(result).to.have.property('element').that.equal(el1);
				expect(result).to.have.property('pattern').that.have.property('name').that.equal('p');

				result = matcher.match(el2);
				expect(result).to.be.an('object');
				expect(result).to.have.property('element').that.equal(el2);
				expect(result).to.have.property('pattern').that.have.property('name').that.equal('div');
			});
		});

		describe('match', () => {
			it('should match element name', () => {
				const matcher = new _matcher2.default('p');
				const el = new _element2.default('p');
				const el2 = new _element2.default('div');

				const result = matcher.match(el);

				expect(result).to.be.an('object');
				expect(result).to.have.property('element').and.equal(el);
				expect(result).to.have.property('pattern');
				expect(result.pattern.name).to.equal('p');
				expect(result).to.have.property('match');
				expect(result.match.name).to.be.true;
				expect(matcher.match(el2)).to.be.null;
			});

			it('should match element name with RegExp', () => {
				const pattern = /^text...a$/;
				const matcher = new _matcher2.default(pattern);
				const el1 = new _element2.default('textarea');
				const el2 = new _element2.default('div');

				const result = matcher.match(el1);

				expect(result).to.be.an('object');
				expect(result).to.have.property('element').that.equal(el1);
				expect(result).to.have.property('pattern').that.has.property('name').that.equal(pattern);
				expect(result).to.have.property('match').that.has.property('name').that.is.true;
				expect(matcher.match(el2)).to.be.null;
			});

			it('should match element attributes', () => {
				const pattern = {
					attribute: {
						title: 'foobar'
					}
				};
				const matcher = new _matcher2.default(pattern);
				const el1 = new _element2.default('p', { title: 'foobar' });
				const el2 = new _element2.default('p', { title: 'foobaz' });
				const el3 = new _element2.default('p', { name: 'foobar' });

				const result = matcher.match(el1);

				expect(result).to.be.an('object');
				expect(result).to.have.property('element').and.equal(el1);
				expect(result).to.have.property('pattern').that.equal(pattern);

				expect(result).to.have.property('match').that.has.property('attribute').that.is.an('array');

				expect(result.match.attribute[0]).equal('title');
				expect(matcher.match(el2)).to.be.null;
				expect(matcher.match(el3)).to.be.null;
			});

			it('should match element attributes using RegExp', () => {
				const pattern = {
					attribute: {
						title: /fooba./
					}
				};
				const matcher = new _matcher2.default(pattern);
				const el1 = new _element2.default('p', { title: 'foobar' });
				const el2 = new _element2.default('p', { title: 'foobaz' });
				const el3 = new _element2.default('p', { title: 'qux' });

				let result = matcher.match(el1);
				expect(result).to.be.an('object');
				expect(result).to.have.property('element').that.equal(el1);
				expect(result).to.have.property('pattern').that.equal(pattern);
				expect(result).to.have.property('match').that.has.property('attribute').that.is.an('array');
				expect(result.match.attribute[0]).equal('title');

				result = matcher.match(el2);
				expect(result).to.be.an('object');
				expect(result).to.have.property('element').that.equal(el2);
				expect(result).to.have.property('pattern').that.equal(pattern);
				expect(result).to.have.property('match').that.has.property('attribute').that.is.an('array');
				expect(result.match.attribute[0]).equal('title');
				expect(matcher.match(el3)).to.be.null;
			});

			it('should match element class names', () => {
				const pattern = { class: 'foobar' };
				const matcher = new _matcher2.default(pattern);
				const el1 = new _element2.default('p', { class: 'foobar' });

				const result = matcher.match(el1);
				expect(result).to.be.an('object');
				expect(result).to.have.property('element').that.equal(el1);
				expect(result).to.have.property('pattern').that.equal(pattern);
				expect(result).to.have.property('match').that.has.property('class').that.is.an('array');
				expect(result.match.class[0]).equal('foobar');
				expect(new _matcher2.default({ class: 'baz' }).match(el1)).to.be.null;
			});

			it('should match element class names using RegExp', () => {
				const pattern = { class: /fooba./ };
				const matcher = new _matcher2.default(pattern);
				const el1 = new _element2.default('p', { class: 'foobar' });
				const el2 = new _element2.default('p', { class: 'foobaz' });
				const el3 = new _element2.default('p', { class: 'qux' });

				let result = matcher.match(el1);
				expect(result).to.be.an('object');
				expect(result).to.have.property('element').that.equal(el1);
				expect(result).to.have.property('pattern').that.equal(pattern);
				expect(result).to.have.property('match').that.has.property('class').that.is.an('array');
				expect(result.match.class[0]).equal('foobar');

				result = matcher.match(el2);
				expect(result).to.be.an('object');
				expect(result).to.have.property('element').that.equal(el2);
				expect(result).to.have.property('pattern').that.equal(pattern);
				expect(result).to.have.property('match').that.has.property('class').that.is.an('array');
				expect(result.match.class[0]).equal('foobaz');
				expect(matcher.match(el3)).to.be.null;
			});

			it('should match element styles', () => {
				const pattern = {
					style: {
						color: 'red'
					}
				};
				const matcher = new _matcher2.default(pattern);
				const el1 = new _element2.default('p', { style: 'color: red' });
				const el2 = new _element2.default('p', { style: 'position: absolute' });

				const result = matcher.match(el1);
				expect(result).to.be.an('object');
				expect(result).to.have.property('element').that.equal(el1);
				expect(result).to.have.property('pattern').that.equal(pattern);
				expect(result).to.have.property('match').that.has.property('style').that.is.an('array');
				expect(result.match.style[0]).equal('color');
				expect(matcher.match(el2)).to.be.null;
				expect(new _matcher2.default({ style: { color: 'blue' } }).match(el1)).to.be.null;
			});

			it('should match element styles using RegExp', () => {
				const pattern = {
					style: {
						color: /^.*blue$/
					}
				};
				const matcher = new _matcher2.default(pattern);
				const el1 = new _element2.default('p', { style: 'color: blue' });
				const el2 = new _element2.default('p', { style: 'color: darkblue' });
				const el3 = new _element2.default('p', { style: 'color: red' });

				let result = matcher.match(el1);
				expect(result).to.be.an('object');
				expect(result).to.have.property('element').that.equal(el1);
				expect(result).to.have.property('pattern').that.equal(pattern);
				expect(result).to.have.property('match').that.has.property('style').that.is.an('array');
				expect(result.match.style[0]).to.equal('color');

				result = matcher.match(el2);
				expect(result).to.be.an('object');
				expect(result).to.have.property('element').that.equal(el2);
				expect(result).to.have.property('pattern').that.equal(pattern);
				expect(result).to.have.property('match').that.has.property('style').that.is.an('array');
				expect(result.match.style[0]).to.equal('color');
				expect(matcher.match(el3)).to.be.null;
			});

			it('should allow to use function as a pattern', () => {
				const match = { name: true };
				const pattern = element => {
					if (element.name === 'div' && element.getChildCount() > 0) {
						return match;
					}

					return null;
				};
				const matcher = new _matcher2.default(pattern);
				const el1 = new _element2.default('p');
				const el2 = new _element2.default('div', null, [el1]);

				expect(matcher.match(el1)).to.be.null;
				const result = matcher.match(el2);
				expect(result).to.be.an('object');
				expect(result).to.have.property('element').that.equal(el2);
				expect(result).to.have.property('match').that.equal(match);
			});

			it('should return first matched element', () => {
				const pattern = {
					name: 'p'
				};
				const el1 = new _element2.default('div');
				const el2 = new _element2.default('p');
				const el3 = new _element2.default('span');
				const matcher = new _matcher2.default(pattern);

				const result = matcher.match(el1, el2, el3);
				expect(result).to.be.an('object');
				expect(result).to.have.property('element').that.equal(el2);
				expect(result).to.have.property('pattern').that.equal(pattern);
				expect(result).to.have.property('match').that.is.an('object');
				expect(result.match).to.have.property('name').that.is.true;
			});

			it('should match multiple attributes', () => {
				const pattern = {
					name: 'a',
					attribute: {
						name: 'foo',
						title: 'bar'
					}
				};
				const matcher = new _matcher2.default(pattern);
				const el = new _element2.default('a', {
					name: 'foo',
					title: 'bar'
				});

				const result = matcher.match(el);
				expect(result).to.be.an('object');
				expect(result).to.have.property('element').that.equal(el);
				expect(result).to.have.property('pattern').that.equal(pattern);
				expect(result).to.have.property('match').that.is.an('object');
				expect(result.match).to.have.property('attribute').that.is.an('array');
				expect(result.match.attribute[0]).to.equal('name');
				expect(result.match.attribute[1]).to.equal('title');
			});

			it('should match multiple classes', () => {
				const pattern = {
					name: 'a',
					class: ['foo', 'bar']
				};
				const matcher = new _matcher2.default(pattern);
				const el = new _element2.default('a');
				el.addClass('foo', 'bar', 'baz');

				const result = matcher.match(el);
				expect(result).to.be.an('object');
				expect(result).to.have.property('element').that.equal(el);
				expect(result).to.have.property('pattern').that.equal(pattern);
				expect(result).to.have.property('match').that.is.an('object');
				expect(result.match).to.have.property('class').that.is.an('array');
				expect(result.match.class[0]).to.equal('foo');
				expect(result.match.class[1]).to.equal('bar');
			});

			it('should match multiple styles', () => {
				const pattern = {
					name: 'a',
					style: {
						color: 'red',
						position: 'relative'
					}
				};
				const matcher = new _matcher2.default(pattern);
				const el = new _element2.default('a');
				el.setStyle({
					color: 'red',
					position: 'relative'
				});

				const result = matcher.match(el);
				expect(result).to.be.an('object');
				expect(result).to.have.property('element').that.equal(el);
				expect(result).to.have.property('pattern').that.equal(pattern);
				expect(result).to.have.property('match').that.is.an('object');
				expect(result.match).to.have.property('style').that.is.an('array');
				expect(result.match.style[0]).to.equal('color');
				expect(result.match.style[1]).to.equal('position');
			});
		});

		describe('matchAll', () => {
			it('should return all matched elements with correct patterns', () => {
				const matcher = new _matcher2.default('p', 'div');
				const el1 = new _element2.default('p');
				const el2 = new _element2.default('div');
				const el3 = new _element2.default('span');

				const result = matcher.matchAll(el1, el2, el3);
				expect(result).to.be.an('array');
				expect(result.length).to.equal(2);
				expect(result[0]).to.have.property('element').that.equal(el1);
				expect(result[0]).to.have.property('pattern').that.is.an('object');
				expect(result[0].pattern).to.have.property('name').that.is.equal('p');
				expect(result[0]).to.have.property('match').that.is.an('object');
				expect(result[0].match).to.have.property('name').that.is.true;

				expect(result[1]).to.have.property('element').that.equal(el2);
				expect(result[1]).to.have.property('pattern').that.is.an('object');
				expect(result[1].pattern).to.have.property('name').that.is.equal('div');
				expect(result[1]).to.have.property('match').that.is.an('object');
				expect(result[1].match).to.have.property('name').that.is.true;

				expect(matcher.matchAll(el3)).to.be.null;
			});

			it('should return all matched elements when using RegExp pattern', () => {
				const pattern = { class: /^red-.*/ };
				const matcher = new _matcher2.default(pattern);
				const el1 = new _element2.default('p');
				const el2 = new _element2.default('p');
				const el3 = new _element2.default('p');

				el1.addClass('red-foreground');
				el2.addClass('red-background');
				el3.addClass('blue-text');

				const result = matcher.matchAll(el1, el2, el3);
				expect(result).to.be.an('array');
				expect(result.length).to.equal(2);
				expect(result[0]).to.have.property('element').that.equal(el1);
				expect(result[0]).to.have.property('pattern').that.is.equal(pattern);
				expect(result[0]).to.have.property('match').that.is.an('object');
				expect(result[0].match).to.have.property('class').that.is.an('array');
				expect(result[0].match.class[0]).to.equal('red-foreground');

				expect(result[1]).to.have.property('element').that.equal(el2);
				expect(result[1]).to.have.property('pattern').that.is.equal(pattern);
				expect(result[1]).to.have.property('match').that.is.an('object');
				expect(result[1].match).to.have.property('class').that.is.an('array');
				expect(result[1].match.class[0]).to.equal('red-background');

				expect(matcher.matchAll(el3)).to.be.null;
			});
		});

		describe('getElementName', () => {
			it('should return null if there are no patterns in the matcher instance', () => {
				const matcher = new _matcher2.default();

				expect(matcher.getElementName()).to.be.null;
			});

			it('should return null if pattern has no name property', () => {
				const matcher = new _matcher2.default({ class: 'foo' });

				expect(matcher.getElementName()).to.be.null;
			});

			it('should return null if pattern has name property specified as RegExp', () => {
				const matcher = new _matcher2.default({ name: /foo.*/ });

				expect(matcher.getElementName()).to.be.null;
			});

			it('should return element name if matcher has one patter with name property specified as string', () => {
				const matcher = new _matcher2.default({ name: 'div' });

				expect(matcher.getElementName()).to.equal('div');
			});

			it('should return null if matcher has more than one pattern', () => {
				const matcher = new _matcher2.default({ name: 'div' }, { class: 'foo' });

				expect(matcher.getElementName()).to.be.null;
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
