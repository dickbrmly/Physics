/*******************************************************************************************************
 *                                             Bromley Solutions 
 *                                          Message Board JavaScript
 *                                             
 *   Collision
 *  
 * 
 * 
 * Date:  11-22-2019
 * Author: Richard Bromley
 *******************************************************************************************************/
'use strict';

function loadXMLDoc() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            myFunction(this);
        }
    };
    xmlhttp.open("GET", "/messages/Collision/index.xml", true);
    xmlhttp.send();
}
function myFunction(xml) {
    var i;
    var xmlDoc = xml.responseXML;
    var table = "<th>DATE</th><th>CATEGORY</th><th>MESSAGE</th><th>AUTHOR</th>";
    var x = xmlDoc.getElementsByTagName("topic");
    for (i = 0; i < x.length; i++) {
        table += "<tr><th>" +
            x[i].getElementsByTagName("date")[0].childNodes[0].nodeValue +
            "</th><th>" +
            x[i].getElementsByTagName("category")[0].childNodes[0].nodeValue +
            "</th><th>" +
            x[i].getElementsByTagName("message")[0].childNodes[0].nodeValue +
            "</th><th>" +
            x[i].getElementsByTagName("author")[0].childNodes[0].nodeValue +
            "</th></tr>";
    }
    document.getElementById("topics").innerHTML = table;

    document.querySelector("table").addEventListener("click", function (event) {
        var th = event.target;
        console.log(th.innerHTML);
        while (th !== this && !th.matches("td")) {
            th = th.parentNode;
        }
    });
}

function grabMessage() {
    document.getElementById('message').style.display = 'block';
}

function cancel() {
    document.getElementById("text").value = "cancel";
    document.getElementById('message').style.display = 'none';
}