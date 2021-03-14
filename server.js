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
    name: 'Dick',
    authorize: false
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
function connect() 
{
     con = mysql.createConnection(
    {
        host: '174.69.163.24',
        user: 'root',
        password: 'Quest@8880',
        database: 'bromleySolutions',
        port: 3306,
     // this object will be passed to the TLSSocket constructor
     //ssl: {
     //  ca: fs.readFileSync(__dirname + '/bin/ca-certificate.crt').toString()
     //}
   });

    con.connect(function(err) {
    if (err) throw err;
    console.log("SQL Server Connected!");
    });
}
/*************************************************************************************************************************
 * 
 * 
 * 
 *************************************************************************************************************************/

app.post('/login', function (request, response){
    connect();
     
    con.query(`SELECT * FROM contacts WHERE userName='${request.body.uname}' AND psw='${request.body.psw}'`, function (err, result) 
     {
          if (err || result.length == 0) 
          {
               console.log(err + " Login failure");
               response.send("log-in failed.");
               con.end();
               return;
          }
          else 
          {
            user.IP = requestIp.getClientIp(request);
            user.name = request.body.uname;
            if (result[0].authorize == '1') user.authorize = true;
            console.log(`${request.body.uname} logged in.`)
            response.sendFile(__dirname + "/logged.html");
          }
     });
});
/*************************************************************************************************************************
 * 
 * 
 * 
 *************************************************************************************************************************/

app.post('/form', function (request, response){

    let xmlFile = fs.readFileSync('./messages/' + request.body.topic + '/index.xml', 'utf8');
    
    if (xmlFile.length < 6000) 
    {
        let content = "<topic>" + '\r\n' + "  <date>" + Date() + "</date>" + '\r\n' +
            "  <category>" + request.body.topic + "</category>" + '\r\n' + "  <message>" + request.body.message +
            "</message>" + '\r\n' + "  <author>" + request.body.uname + "</author>" + '\r\n' +
            "</topic>";

        let newXmlFile = xmlFile.replace('</topics>', '') + content + '</topics>';
        fs.writeFileSync('./messages/' + request.body.topic + '/index.xml', newXmlFile);
        xmlFile = fs.readFileSync('./messages/topics.xml', 'utf8');
        let x = xmlFile.indexOf(request.body.topic);
        let y = x;
        while (xmlFile.substring(x, x + 7) !== '<topic>')
            --x;
        while (xmlFile.substring(y, y + 8) !== '</topic>')
            ++y;
        let newXmlTopics = xmlFile.substring(0, x) + content + xmlFile.substring(y + 8);
        fs.writeFileSync('./messages/topics.xml', newXmlTopics);
    }
    response.sendFile(__dirname +'/messages/' + request.body.topic + '/index.html');
});
/*************************************************************************************************************************
 * 
 * 
 * 
 *************************************************************************************************************************/
app.post('newuser', async function (request, response) 
{
    var sql = `INSERT INTO contacts (fname, lname, email, userName, psw, authorize) VALUES ('${request.body.fname}',
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
