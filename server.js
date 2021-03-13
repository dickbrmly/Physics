/*************************************************************************************************************************
 *                                             Bromley Solutions
 *                                             Server JavaScript
 *
 *   It will have online example programs for physics topics
 *
 *
 *
 * Date:  11-22-2019
 * Author: Richard Bromley
 **************************************************************************************************************************/
//'use strict';
const http = require('http');
const https = require('https');
const fs = require('fs');
const url = require('url');
const mysql = require('mysql');
const requestIp = require('request-ip');
const express = require('express');

app = express();
app.use(express.static('.'));
app.use(express.urlencoded({extended:false}));

let user = {
    IP: '172.36.158.24',
    "userName": 'Dick',
    "authorize": false
};
/*************************************************************************************************************************
 * 
 * 
 * 
 *************************************************************************************************************************/

app.listen(8080, function () {
  console.log('app listening on port 8080');
});
/*************************************************************************************************************************
 * 
 *                                     Express Error Middlewear
 * 
 *************************************************************************************************************************/
app.use(function(error, req, res, next) 
{
  console.log(req.baseUrl + error.message + " " + error.stack);
  res.status(500).send('ouch');
});
app.on('uncaughtException', function(err) 
{
  console.log('Caught an exception: ' + err);
});

/*************************************************************************************************************************
 * 
 * 
 * 
 *************************************************************************************************************************/

app.post('/put', function (request, response){

    var xmlFile = fs.readFileSync('./messages/' + entry.form + '/index.xml', 'utf8');
    
    if (xmlFile.length < 6000) {
        var content = "<topic>" + '\r\n' + "  <date>" + Date() + "</date>" + '\r\n' +
            "  <category>" + request.body.form + "</category>" + '\r\n' + "  <message>" + request.body.message +
            "</message>" + '\r\n' + "  <author>" + request.body.uname + "</author>" + '\r\n' +
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
});

/*************************************************************************************************************************
 * 
 * 
 * 
 *************************************************************************************************************************/
app.post('newuser', async function (request, response) 
{
    var sql = `INSERT INTO contacts (fname, lname, email, userName, psw, authorize) VALUES (''${request.body.fname}',
        '${request.body.lname}', '${request.body.email}', '${request.body.uname}', '${request.body.psw}',0)`;

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
