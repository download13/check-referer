var checkReferer = require('../');

var request = require('supertest');

var compose = require('mw-compose');

var assert = require('assert');


describe('check-referer', function() {
	it('takes a string as an argument', function() {
		checkReferer('example.org');
	});

	it('takes an array of strings as an argument', function() {
		checkReferer(['example.org', 'www.example.org']);
	});

	it('does not take an object as an argument', function() {
		assert.throws(function() {
			checkReferer({});
		});
	});

	it('does not take a number as an argument', function() {
		assert.throws(function() {
			checkReferer(2);
		});
	});

	it('does not take a boolean as an argument', function() {
		assert.throws(function() {
			checkReferer(true);
		});
	});

	it('recognizes referer header', function() {
		var mw = checkReferer('example.org');

		request(compose(mw, end))
			.get('/')
			.set('Referer', 'http://example.org')
			.expect(200, 'Ended');
	});

	it('recognizes https referers', function() {
		var mw = checkReferer('example.org');

		request(compose(mw, end))
			.get('/')
			.set('Referer', 'https://example.org')
			.expect(200, 'Ended');
	});

	it('recognizes referrer header', function() {
		var mw = checkReferer('example.org');

		request(compose(mw, end))
			.get('/')
			.set('Referrer', 'http://example.org')
			.expect(200, 'Ended');
	});

	it('recognizes origin header', function() {
		var mw = checkReferer('example.org');

		request(compose(mw, end))
			.get('/')
			.set('Origin', 'http://example.org')
			.expect(200, 'Ended');
	});

	it('blocks non http referers', function() {
		var mw = checkReferer('example.org');

		request(compose(mw, end))
			.get('/')
			.set('Referer', 'ftp://example.org')
			.expect(403, 'Referer must have scheme http:// or https://');
	});

	it('blocks unrecognized referers', function() {
		var mw = checkReferer('example.org');

		request(compose(mw, end))
			.get('/')
			.set('Referer', 'http://www.example.org')
			.expect(403, 'Referer not allowed');
	});
});


function end(req, res) {
	res.end('Ended');
}
