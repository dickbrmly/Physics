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
//'use strict';

const http = require('http');
//const https = require('https');
const fs = require('fs');
var url = require('url');
var mysql = require('mysql');

/* var options = {
    key: fs.readFileSync('./keys/multisan.key'),
    ca: [fs.readFileSync('./keys/347375790repl_1.ca-bundle')],
    cert: fs.readFileSync('./keys/347375790repl_1.crt'),
    requestCert: false,
    rejectUnaithorized: false
}; */

var user =
{
    "userName":'Dick',
    "authorize":false
};

var json = JSON;

var port = process.env.PORT || 8080;

loadSql();

/* http.createServer(function (request, response) {
    response.writeHead(301, { "Location": "https://www.interactive-physics.org/index.html" });
    response.end();
 }).listen(80); */

http.createServer(function (request, response) {
    if (request.url.includes('form')) {
        let entry = url.parse(request.url, true).query;
        if(entry.form.includes('newUser')) recordMessage(request, response);
        else if (entry.form.includes('login')) {
            loadSql();
            let found = false;

            for (let i = 0; i < Object.keys(json).length; i++) {
                if (json[i].userName === entry.uname && json[i].psw === entry.password) {
                    user.userName = entry.uname;
                    user.authorize = json[i].authorize;
                    if (user.authorize) found = true;
                    break;
                }
            }
            if (!found) {
                if (request.headers.host === 'www.interactive-physics.org') sendHTML('/Physics/userNot.html', 'text/html', response);
                else sendHTML('/userNot.html', 'text/html', response);
                console.log('Unknown user failed login.');
                user.authorize = false;
            }
            else {
                if (request.headers.host === 'www.interactive-physics.org') sendHTML('/logged.html', 'text/html', response);
                else sendHTML('/logged.html', 'text/html', response);
                console.log('logging in ' + entry.uname);
                user.authorize = true;
            }
        }
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
    if (xmlFile.length < 6000) {
        var content = "<topic>" + '\r\n' + "  <date>" + Date() + "</date>" + '\r\n'
            + "  <category>" + entry.form + "</category>" + '\r\n' + "  <message>" + entry.message
            + "</message>" + '\r\n' + "  <author>" + entry.uname + "</author>" + '\r\n'
            + "</topic>";
        var newXmlFile = xmlFile.replace('</topics>', '') + content + '</topics>';

        fs.writeFileSync('./messages/' + entry.form + '/index.xml', newXmlFile);

        xmlFile = fs.readFileSync('./messages/topics.xml', 'utf8');

        var x = xmlFile.indexOf(entry.form);
        var y = x;
        while (xmlFile.substring(x, x + 7) !== '<topic>') --x;
        while (xmlFile.substring(y, y + 8) !== '</topic>') ++y;
        var newXmlTopics = xmlFile.substring(0, x) + content + xmlFile.substring(y + 8);
        fs.writeFileSync('./messages/topics.xml', newXmlTopics);
    }
    sendHTML('/messages/' + entry.form + '/index.html', 'text/html',response);
}

function loadSql() {
    var con = mysql.createConnection({
        host: "localhost", // ip address of server running mysql
        user: "root", // user name to your mysql database
        password: "Quest@8880", // corresponding password
        database: "bromleySolutions", // use the specified database
        insecureAuth: true
    });

    con.connect(function (err) {
        if (err) throw err;
        con.query('SELECT * FROM contacts', function (err, result) {
            if (err) throw err;
            else json = JSON.parse(JSON.stringify(result));
            con.end();
        });
    });
}

function search(searchfield, value)
{
    for (let i = 0; i < json.parse.length; i++) if (json[i][searchfield] === value) return true;
    return false;
}

function install(entry)
{
    var sql = 'INSERT INTO contacts (fname, lname, email, userName, psw, authorize) VALUES ( \'' + entry.fname + '\', \''
    + entry.lname + '\', \'' + entry.email + '\', \'' + entry.uname + '\', \'' + 
     entry.psw + '\', \'0\')';

    var con = mysql.createConnection({
        host: "localhost", // ip address of server running mysql
        user: "root", // user name to your mysql database
        password: "Quest@8880", // corresponding password
        database: "bromleySolutions", // use the specified database
        insecureAuth: true
    });

    con.connect(function (err) {
        if (err) throw err;
        con.query(sql, function (err, result) {
            if (err) {
                console.log('error recording record.');
                throw err;
            }
            else {
                console.log(sql);
                console.log("New user recorded.  Need to verify.");
                con.end();
            }
        });
    });
}