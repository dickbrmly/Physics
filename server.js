/*******************************************************************************************************
 *                                             Bromley Solutions 
 *                                             Server JavaScript
 *                                             
 *   It will have online example programs for physics topics
 *  
 * 
 * 
 * Date:  11-22-2019
 * Author: Richard Bromley
 *******************************************************************************************************/
'use strict';
const http = require('http');
const fs = require('fs');
var url = require('url');
require('dotenv').config(); //load .env variables.
var port = process.env.PORT || 8080;

const winston = require('winston');
const { LoggingWinston } = require('@google-cloud/logging-winston');
const loggingWinston = new LoggingWinston();
const logger = winston.createLogger({
    level: 'info',
    transports: [new winston.transports.Console(),
        loggingWinston,
    new winston.transports.File({ filename: '/logF.log' })
    ]
});

http.createServer(function (request, response) {

    if (request.url.includes('.html')) {
        sendHTML(request.url, 'text/html', response);
    } else if (request.url.includes('.css')) {
        sendHTML(request.url, 'text/css', response);
    } else if (request.url.includes('.jpg')) {
        sendHTML(request.url, 'image/jpg', response);
    } else if (request.url.includes('.png')) {
        sendHTML(request.url, 'image/png', response);
    } else if (request.url.includes('.js')) {
        sendHTML(request.url, 'application/x-javascript', response);
    } else {
        sendHTML('/index.html', 'text/html', response);
    }
}).listen(port);

function sendHTML(urlName, contentType, response) {
    response.writeHead(200, { 'Content-Type': contentType });
    fs.readFile('.' + urlName, function (error, data, fields) {
        if (error) {
            logger.error('File error for ' + urlName);
            response.writeHead(404);
            response.write('File not found.');
            response.end();
        } else {
            logger.info('Response = ' + urlName);
            response.end(data);
        }
    });
}