const proxy = require('http-proxy-middleware');

module.exports = app => {
    app.use('/api', proxy({ target: 'http://localhost:4600' }));
    app.use('/media', proxy({ target: 'http://localhost:4600' }));
    app.use('/session', proxy({ target: 'http://localhost:4600' }));
    app.use('/auth/callback', proxy({ target: 'http://localhost:4600' }));
}