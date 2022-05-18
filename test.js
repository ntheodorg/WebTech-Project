const http = require('http');
const pathModule = require('path');
const fs = require('fs');
const url = require('url');
const express = require('express');

var app = express();

app.get('/', (req, res) => {
    res.send("this is a message");
});

app.listen(3000);
var x = 10;