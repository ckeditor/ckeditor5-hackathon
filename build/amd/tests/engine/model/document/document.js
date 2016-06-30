define('tests', ['/ckeditor5/engine/model/document.js', '/ckeditor5/engine/model/schema.js', '/ckeditor5/engine/model/composer/composer.js', '/ckeditor5/engine/model/rootelement.js', '/ckeditor5/engine/model/batch.js', '/ckeditor5/utils/ckeditorerror.js', '/ckeditor5/utils/count.js'], function (_document, _schema, _composer, _rootelement, _batch, _ckeditorerror, _count) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: model */

	'use strict';

	var _document2 = _interopRequireDefault(_document);

	var _schema2 = _interopRequireDefault(_schema);

	var _composer2 = _interopRequireDefault(_composer);

	var _rootelement2 = _interopRequireDefault(_rootelement);

	var _batch2 = _interopRequireDefault(_batch);

	var _ckeditorerror2 = _interopRequireDefault(_ckeditorerror);

	var _count2 = _interopRequireDefault(_count);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('Document', () => {
		let doc;

		beforeEach(() => {
			doc = new _document2.default();
		});

		describe('constructor', () => {
			it('should create Document with no data, empty graveyard and selection set to default range', () => {
				expect(doc).to.have.property('_roots').that.is.instanceof(Map);
				expect(doc._roots.size).to.equal(1);
				expect(doc.graveyard).to.be.instanceof(_rootelement2.default);
				expect(doc.graveyard.getChildCount()).to.equal(0);
				expect((0, _count2.default)(doc.selection.getRanges())).to.equal(1);

				expect(doc.composer).to.be.instanceof(_composer2.default);
				expect(doc.schema).to.be.instanceof(_schema2.default);
			});
		});

		describe('rootNames', () => {
			it('should return empty iterator if no roots exist', () => {
				expect((0, _count2.default)(doc.rootNames)).to.equal(0);
			});

			it('should return an iterator of all roots without the graveyard', () => {
				doc.createRoot('a');
				doc.createRoot('b');

				expect(Array.from(doc.rootNames)).to.deep.equal(['a', 'b']);
			});
		});

		describe('createRoot', () => {
			it('should create a new RootElement, add it to roots map and return it', () => {
				let root = doc.createRoot('root');

				expect(doc._roots.size).to.equal(2);
				expect(root).to.be.instanceof(_rootelement2.default);
				expect(root.getChildCount()).to.equal(0);
				expect(root).to.have.property('name', '$root');
				expect(root).to.have.property('rootName', 'root');
			});

			it('should create a new RootElement with the specified name', () => {
				let root = doc.createRoot('root', 'foo');

				expect(root).to.have.property('name', 'foo');
				expect(root).to.have.property('rootName', 'root');
			});

			it('should throw an error when trying to create a second root with the same name', () => {
				doc.createRoot('root', 'root');

				expect(() => {
					doc.createRoot('root', 'root');
				}).to.throw(_ckeditorerror2.default, /document-createRoot-name-exists/);
			});
		});

		describe('getRoot', () => {
			it('should return a RootElement previously created with given name', () => {
				let newRoot = doc.createRoot('root');
				let getRoot = doc.getRoot('root');

				expect(getRoot).to.equal(newRoot);
			});

			it('should throw an error when trying to get non-existent root', () => {
				expect(() => {
					doc.getRoot('root');
				}).to.throw(_ckeditorerror2.default, /document-getRoot-root-not-exist/);
			});
		});

		describe('hasRoot', () => {
			it('should return true when Document has RootElement with given name', () => {
				doc.createRoot('root');

				expect(doc.hasRoot('root')).to.be.true;
			});

			it('should return false when Document does not have RootElement with given name', () => {
				expect(doc.hasRoot('noroot')).to.be.false;
			});
		});

		describe('applyOperation', () => {
			it('should increase document version, execute operation and fire event with proper data', () => {
				const changeCallback = sinon.spy();
				const type = 't';
				const data = { data: 'x' };
				const batch = 'batch';

				let operation = {
					type: type,
					delta: { batch: batch },
					baseVersion: 0,
					_execute: sinon.stub().returns(data)
				};

				doc.on('change', changeCallback);
				doc.applyOperation(operation);

				expect(doc.version).to.equal(1);
				sinon.assert.calledOnce(operation._execute);

				sinon.assert.calledOnce(changeCallback);
				expect(changeCallback.args[0][1]).to.equal(type);
				expect(changeCallback.args[0][2]).to.equal(data);
				expect(changeCallback.args[0][3]).to.equal(batch);
			});

			it('should throw an error on the operation base version and the document version is different', () => {
				let operation = {
					baseVersion: 1
				};

				expect(() => {
					doc.applyOperation(operation);
				}).to.throw(_ckeditorerror2.default, /document-applyOperation-wrong-version/);
			});
		});

		describe('batch', () => {
			it('should create a new batch with the document property', () => {
				const batch = doc.batch();

				expect(batch).to.be.instanceof(_batch2.default);
				expect(batch).to.have.property('doc').that.equals(doc);
			});
		});

		describe('enqueue', () => {
			it('should be executed immediately and fire changesDone event', () => {
				let order = [];

				doc.on('changesDone', () => order.push('done'));

				doc.enqueueChanges(() => order.push('enqueue1'));

				expect(order).to.have.length(2);
				expect(order[0]).to.equal('enqueue1');
				expect(order[1]).to.equal('done');
			});

			it('should fire done every time queue is empty', () => {
				let order = [];

				doc.on('changesDone', () => order.push('done'));

				doc.enqueueChanges(() => order.push('enqueue1'));
				doc.enqueueChanges(() => order.push('enqueue2'));

				expect(order).to.have.length(4);
				expect(order[0]).to.equal('enqueue1');
				expect(order[1]).to.equal('done');
				expect(order[2]).to.equal('enqueue2');
				expect(order[3]).to.equal('done');
			});

			it('should put callbacks in the proper order', () => {
				let order = [];

				doc.on('changesDone', () => order.push('done'));

				doc.enqueueChanges(() => {
					order.push('enqueue1 start');
					doc.enqueueChanges(() => {
						order.push('enqueue2 start');
						doc.enqueueChanges(() => order.push('enqueue4'));
						order.push('enqueue2 end');
					});

					doc.enqueueChanges(() => order.push('enqueue3'));

					order.push('enqueue1 end');
				});

				expect(order).to.have.length(7);
				expect(order[0]).to.equal('enqueue1 start');
				expect(order[1]).to.equal('enqueue1 end');
				expect(order[2]).to.equal('enqueue2 start');
				expect(order[3]).to.equal('enqueue2 end');
				expect(order[4]).to.equal('enqueue3');
				expect(order[5]).to.equal('enqueue4');
				expect(order[6]).to.equal('done');
			});
		});

		it('should update selection attributes whenever selection gets updated', () => {
			sinon.spy(doc.selection, '_updateAttributes');

			doc.selection.fire('change:range');

			expect(doc.selection._updateAttributes.called).to.be.true;
		});

		it('should update selection attributes whenever changes to the document are applied', () => {
			sinon.spy(doc.selection, '_updateAttributes');

			doc.fire('changesDone');

			expect(doc.selection._updateAttributes.called).to.be.true;
		});

		describe('_getDefaultRoot', () => {
			it('should return graveyard root if there are no other roots in the document', () => {
				expect(doc._getDefaultRoot()).to.equal(doc.graveyard);
			});

			it('should return the first root added to the document', () => {
				let rootA = doc.createRoot('rootA');
				doc.createRoot('rootB');
				doc.createRoot('rootC');

				expect(doc._getDefaultRoot()).to.equal(rootA);
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
