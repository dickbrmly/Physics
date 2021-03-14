/*******************************************************************************************************
 *                                             Bromley Solutions 
 *                                          Message Board JavaScript
 *                                             
 *   Messages for physics topics
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
    xmlhttp.open("GET", "topics.xml", true);
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
        var th = event.target.innerHTML;
        switch (th) {
            case "General":
                window.open("/messages/General/index.html");
                break;
            case "Ballistics":
                window.open("/messages/Ballistics/index.html");
                break;
            case "Collision":
                window.open("/messages/Collision/index.html");
                break;
            case "Conversion":
                window.open("/messages/Conversion/index.html");
                break;
            case "Electricity":
                window.open("/messages/Electricity/index.html");
                break;
            case "Equations":
                window.open("/messages/Equations/index.html");
                break;
            case "Gravitation":
                window.open("/messages/Gravitation/index.html");
                break;
            default:
                break;
        }
    });
}