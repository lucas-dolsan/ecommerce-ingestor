"use strict";
const express = require('express');
const app = express();
const port = 4000;
function setupRoute({ method, route, middleware, handler }) {
    app[method](route, middleware, handler);
}
function start() {
    app.listen(port, () => {
        console.log(`Ingestion API server is running on port ${port}`);
    });
}
module.exports = {
    start,
    setupRoute,
};
