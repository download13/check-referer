var url = require('url');


module.exports = function(domains_arg) {
	if(typeof domains_arg === 'string') {
		domains_arg = [domains_arg];
	}

	if(!Array.isArray(domains_arg)) {
		throw new Error('domain(s) required');
	}

	var domains = {};
	domains_arg.forEach(function(domain) {
		if(typeof domain !== 'string') {
			throw new Error('a domain must be a string, ' + domain + ' is a' + typeof domain);
		}

		domains[domain] = 1;
	});

	return function(req, res, next) {
		var parts = url.parse(
			req.headers.origin ||
			req.headers.referer ||
			req.headers.referrer ||
			''
		);

		if(parts.protocol !== 'http:' && parts.protocol !== 'https:') {
			return res.status(403).send('Referer must have scheme http:// or https://');
		}

		if(parts.host in domains) {
			next();
		} else {
			res.status(403).send('Referer not allowed');
		}
	};
};
