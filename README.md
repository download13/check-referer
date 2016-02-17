# check-referer

Connect middleware for validating the refering domain of incoming requests. Checks the referer and origin headers to ensure browser requests are initiated from approved domains.

## Example

```javascript
var checkReferer = require('check-referer');

var checkRefererMw = ;

app.post('/api/endpoint', checkReferer('mydomain.com'), function(req, res) {
	// Requests from other platforms will return 403
	res.send('Hi!');
});

// You can also pass an array to allow multiple domains
checkReferer(['mydomain.com', 'anotherdomain.net']);
```
