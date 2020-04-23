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

//const winston = require('winston');
//const { LoggingWinston } = require('@google-cloud/logging-winston');
//const loggingWinston = new LoggingWinston();
//const logger = winston.createLogger({
//    level: 'info',
//    transports: [new winston.transports.Console(),
//        loggingWinston,
//    new winston.transports.File({ filename: '/logF.log' })
//    ]
//});

http.createServer(function (request, response) {
    if (request.url.includes('form')) {
        recordMessage(request, response);
    } else if (request.url.includes('.html')) {
    sendHTML(request.url, 'text/html', response);
    } else if (request.url.includes('.css')) {
        sendHTML(request.url, 'text/css', response);
    } else if (request.url.includes('.jpg')) {
        sendHTML(request.url, 'image/jpg', response);
    } else if (request.url.includes('.png')) {
        sendHTML(request.url, 'image/png', response);
    } else if (request.url.includes('.js')) {
        sendHTML(request.url, 'application/x-javascript', response);
    } else if (request.url.includes('.xml')) {
        sendHTML(request.url, 'text/xml', response);
    } else {
        sendHTML('/index.html', 'text/html', response);
    }
}).listen(port);

function sendHTML(urlName, contentType, response) {
    response.writeHead(200, { 'Content-Type': contentType });
    fs.readFile('.' + urlName, function (error, data) {
        if (error) {
           // logger.error('File error for ' + urlName);
            response.writeHead(404);
            response.write('File not found.');
            response.end();
        } else {
            //logger.info('Response = ' + urlName);
            response.end(data);
        }
    });
}

function recordMessage(request, response) {
    var entry = url.parse(request.url, true).query;
    
    var xmlFile = fs.readFileSync('./messages/' + entry.form + '/index.xml', 'utf8');
    var content = "  <topic>" + '\r\n' + "  <date>" + Date() + "</date>" + '\r\n'
        + "  <category>" + entry.form + "</category>" + '\r\n' + "  <message>" + entry.message
        + "</message>" + '\r\n' + "  <author>" + entry.uname + "</author>" + '\r\n'
        + "  </topic>" + '\r\n';
    var newXmlFile = xmlFile.replace('</topics>', '') + content + '</topics>';

    fs.writeFileSync('./messages/' + entry.form + '/index.xml', newXmlFile);

    var item = 0;
    
    xmlFile = fs.readFileSync('./messages/topics.xml', 'utf8');

    var x = xmlFile.indexOf(entry.form);
    var y = x;
    while (xmlFile.substring(x, x + 7) !== '<topic>') --x;
    while (xmlFile.substring(y, y + 8) !== '</topic>') ++y;
    var newXmlTopics = xmlFile.substring(0, x) + content + xmlFile.substring(y + 8);
    fs.writeFileSync('./messages/topics.xml', newXmlTopics);
    
    var reread = fs.readFileSync('./messages/' + entry.form + '/index.html', 'utf8');
    response.end(reread);
}