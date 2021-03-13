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
var http = require('http');
var https = require('https');
var fs = require('fs');
var url = require('url');
var mysql = require('mysql');

var express = require('express');
app = express();


app.use(express.static('.'));
//app.use("/patient", patient);
//app.use("/responder", responder);
//app.use("/administration", administration);


var user = {
    IP: '172.36.158.24',
    "userName": 'Dick',
    "authorize": false
};

app.listen(8080, function () {
  console.log('app listening on port 8080');
});

/******************************************************************************************************************
 *                                     Website lead-in and Sign-Up Page
 *
 ******************************************************************************************************************/
app.get("/", function (req, res) {
  
     console.log("Website being Accessed");
     res.sendFile(__dirname + "/index.html");
});
/* 
https.createServer(options, function(request, response) {
    if (request.url.includes('form')) {
        var entry = url.parse(request.url, true).query;
        if (entry.form.includes('newUser'))
            recordMessage(request, response);
        else if (entry.form.includes('login')) {
            loadSql();
            var found = false;
            for (var i = 0; i < Object.keys(json).length; i++) {
                if (json[i].userName === entry.uname && json[i].psw === entry.password) {
                    user.userName = entry.uname;
                    user.authorize = json[i].authorize;
                    if (user.authorize)
                        found = true;
                    break;
                }
            }
            if (!found) {
                if (request.headers.host === 'www.interactive-physics.org')
                    sendHTML('/userNot.html', 'text/html', response);
                else
                    sendHTML('/userNot.html', 'text/html', response);
                console.log('Unknown user failed login.');
                user.authorize = false;
            } else {
                if (request.headers.host === 'www.interactive-physics.org')
                    sendHTML('/logged.html', 'text/html', response);
                else
                    sendHTML('/logged.html', 'text/html', response);
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
}).listen(443, '174.69.163.26');

function sendHTML(urlName, contentType, response) {
    response.writeHead(200, { 'Content-Type': contentType });
    fs.readFile('.' + urlName, function(error, data) {
        if (error) {
            console.log('File error for ' + urlName);
            response.writeHead(404);
            response.write('File not found.');
            response.end();
        } else {
            console.log('Response = ' + urlName);
            response.end(data);
        }
    });
}

function recordMessage(request, response) {
    var entry = url.parse(request.url, true).query;
    var xmlFile = fs.readFileSync('./messages/' + entry.form + '/index.xml', 'utf8');
    if (xmlFile.length < 6000) {
        var content = "<topic>" + '\r\n' + "  <date>" + Date() + "</date>" + '\r\n' +
            "  <category>" + entry.form + "</category>" + '\r\n' + "  <message>" + entry.message +
            "</message>" + '\r\n' + "  <author>" + entry.uname + "</author>" + '\r\n' +
            "</topic>";
        var newXmlFile = xmlFile.replace('</topics>', '') + content + '</topics>';
        fs.writeFileSync('./messages/' + entry.form + '/index.xml', newXmlFile);
        xmlFile = fs.readFileSync('./messages/topics.xml', 'utf8');
        var x = xmlFile.indexOf(entry.form);
        var y = x;
        while (xmlFile.substring(x, x + 7) !== '<topic>')
            --x;
        while (xmlFile.substring(y, y + 8) !== '</topic>')
            ++y;
        var newXmlTopics = xmlFile.substring(0, x) + content + xmlFile.substring(y + 8);
        fs.writeFileSync('./messages/topics.xml', newXmlTopics);
    }
    sendHTML('/messages/' + entry.form + '/index.html', 'text/html', response);
}

function loadSql() {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Quest@8880",
        database: "bromleySolutions",
        insecureAuth: true
    });
    con.connect(function(err) {
        if (err)
            throw err;
        con.query('SELECT * FROM contacts', function(err, result) {
            if (err)
                throw err;
            else
                json = JSON.parse(JSON.stringify(result));
            con.end();
        });
    });
}

function search(searchfield, value) {
    for (var i = 0; i < json.parse.length; i++)
        if (json[i][searchfield] === value)
            return true;
    return false;
}
*/
app.post('newuser', async function (request, response) 
{
    var sql = 'INSERT INTO contacts (fname, lname, email, userName, psw, authorize) VALUES ( \'' + entry.fname + '\', \'' +
        entry.lname + '\', \'' + entry.email + '\', \'' + entry.uname + '\', \'' +
        entry.psw + '\', \'0\')';
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Quest@8880",
        database: "bromleySolutions",
        insecureAuth: true
    });
    con.connect(function(err) {
        if (err)
            throw err;
        con.query(sql, function(err, result) {
            if (err) {
                console.log('error recording record.');
                throw err;
            } else {
                console.log(sql);
                console.log("New user recorded.  Need to verify.");
                con.end();
            }
        });
    });
});
