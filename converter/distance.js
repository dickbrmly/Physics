/*
                Distance Conversion Utility
                    Date: 12/19/2019
                  Author: Richard Bromley


*/
function milesEntry(event) {
    var x = event.which || event.keyCode;
    if (x !== 13) return;
    var entry = document.getElementById('miles').value;
    document.getElementById('yards').value = entry * 1760;
    document.getElementById('feet').value = entry * 5280;
    document.getElementById('inches').value = entry * 5280 * 12;
    document.getElementById('kilometers').value = entry * 1.60934;
    document.getElementById('meters').value = entry * 1.60934 * 1000;
    document.getElementById('centimeters').value = entry * 160934;
    document.getElementById('millimeters').value = entry * 1609340;
}

function yardsEntry(event) {
    var x = event.which || event.keyCode;
    if (x !== 13) return;
    var entry = document.getElementById('yards').value;
    document.getElementById('feet').value = entry * 3;
    document.getElementById('inches').value = entry * 190080;
    document.getElementById('kilometers').value = entry * 0.0009144;
    document.getElementById('meters').value = entry * 0.9144;
    document.getElementById('centimeters').value = entry * 91.44;
    document.getElementById('millimeters').value = entry * 914.4;
    document.getElementById('miles').value = entry / 1760;
}

function feetEntry(event) {
    var x = event.which || event.keyCode;
    if (x !== 13) return;
    var entry = document.getElementById('feet').value;
    document.getElementById('yards').value = entry / 3;
    document.getElementById('inches').value = entry * 12;
    document.getElementById('kilometers').value = entry * 0.0003048;
    document.getElementById('meters').value = entry * 0.3048;
    document.getElementById('centimeters').value = entry * 30.48;
    document.getElementById('millimeters').value = entry * 304.8;
    document.getElementById('miles').value = entry / 5280;
}

function inchesEntry(event) {
    var x = event.which || event.keyCode;
    if (x !== 13) return;
    var entry = document.getElementById('inches').value;
    document.getElementById('yards').value = entry / 36;
    document.getElementById('feet').value = entry / 12;
    document.getElementById('kilometers').value = entry * 0.0000254;
    document.getElementById('meters').value = entry * 0.0254;
    document.getElementById('centimeters').value = entry * 2.54;
    document.getElementById('millimeters').value = entry * 25.4;
    document.getElementById('miles').value = entry / 10560;
}

function kilometersEntry(event) {
    var x = event.which || event.keyCode;
    if (x !== 13) return;
    var entry = document.getElementById('kilometers').value;
    document.getElementById('yards').value = entry * 1093.6133;
    document.getElementById('feet').value = entry * 3280.8399;
    document.getElementById('inches').value = entry * 39370.0787;
    document.getElementById('meters').value = entry * 1000;
    document.getElementById('centimeters').value = entry * 100000;
    document.getElementById('millimeters').value = entry * 1000000;
    document.getElementById('miles').value = entry * 0.62137119;
}

function metersEntry(event) {
    var x = event.which || event.keyCode;
    if (x !== 13) return;
    var entry = document.getElementById('meters').value;
    document.getElementById('yards').value = entry * 1.0936133;
    document.getElementById('feet').value = entry * 3.2808399;
    document.getElementById('inches').value = entry * 39.3700787;
    document.getElementById('kilometers').value = entry / 1000;
    document.getElementById('centimeters').value = entry * 100;
    document.getElementById('millimeters').value = entry * 1000;
    document.getElementById('miles').value = entry * 0.00062137119;
}

function centimetersEntry(event) {
    var x = event.which || event.keyCode;
    if (x !== 13) return;
    var entry = document.getElementById('centimeters').value;
    document.getElementById('yards').value = entry * 0.010936133;
    document.getElementById('feet').value = entry * 0.032808399;
    document.getElementById('inches').value = entry * 0.393700787;
    document.getElementById('kilometers').value = entry * 0.00001;
    document.getElementById('meters').value = entry / 100;
    document.getElementById('millimeters').value = entry * 10;
    document.getElementById('miles').value = entry * 0.00000621;
}

function millimetersEntry(event) {
    var x = event.which || event.keyCode;
    if (x !== 13) return;
    var entry = document.getElementById('millimeters').value;
    document.getElementById('yards').value = entry * 0.00109361;
    document.getElementById('feet').value = entry * 0.00328084;
    document.getElementById('inches').value = entry * 0.03937008;
    document.getElementById('kilometers').value = entry * 0.000001;
    document.getElementById('meters').value = entry * 0.001;
    document.getElementById('centimeters').value = entry * 0.1;
    document.getElementById('miles').value = entry * 0.0000000621;
}

/*
                Angle Conversion Utility
                    Date: 12/24/2019
                  Author: Richard Bromley


*/
function degreesEntry(event) {
    var x = event.which || event.keyCode;
    if (x !== 13) return;
    var entry = document.getElementById('degrees').value;
    document.getElementById('pi').value = entry / 180;
    document.getElementById('radians').value = entry * Math.PI / 180;
}

function radiansEntry(event) {
    var x = event.which || event.keyCode;
    if (x !== 13) return;
    var entry = document.getElementById('radians').value;
    document.getElementById('pi').value = entry / Math.PI;
    document.getElementById('degrees').value = entry * 180 / Math.PI;
}

function piEntry(event) {
    var x = event.which || event.keyCode;
    if (x !== 13) return;
    var entry = document.getElementById('pi').value;
    document.getElementById('degrees').value = entry * 180;
    document.getElementById('radians').value = entry * Math.PI;
}


/*
                Coordinate Conversion Utility
                    Date: 12/24/2019
                  Author: Richard Bromley


*/

function angleEntry(event) {
    var x = event.which || event.keyCode;
    if (x !== 13) return;

    document.getElementById('xValue').value = document.getElementById('radius').value * Math.cos(document.getElementById('angle').value * Math.PI / 180);
    document.getElementById('yValue').value = document.getElementById('radius').value * Math.sin(document.getElementById('angle').value * Math.PI / 180);
}

function yValueEntry(event) {
    var x = event.which || event.keyCode;
    if (x !== 13) return;

    document.getElementById('radius').value = Math.sqrt(Math.pow(document.getElementById('xValue').value, 2) + Math.pow(document.getElementById('yValue').value, 2));
    document.getElementById('angle').value = Math.atan2(document.getElementById('yValue').value, document.getElementById('xValue').value) * 180 / Math.PI;
}

/*
               Temperature Conversion Utility
                    Date: 12/24/2019
                  Author: Richard Bromley


*/
function fahrenheitEntry(event) {
    var x = event.which || event.keyCode;
    if (x !== 13) return;
    document.getElementById('celsius').value = (document.getElementById('fahrenheit').value - 32) / 1.8;
    document.getElementById('kelven').value = document.getElementById('celsius').value * 1 + 273.15;
}

function celsiusEntry(event) {
    var x = event.which || event.keyCode;
    if (x !== 13) return;
    document.getElementById('fahrenheit').value = document.getElementById('celsius').value * 1.8 + 32;
    document.getElementById('kelven').value = document.getElementById('celsius').value * 1 + 273.15;
}

function kelvenEntry(event) {
    var x = event.which || event.keyCode;
    if (x !== 13) return;
    document.getElementById('celsius').value = document.getElementById('kelven').value - 273.15;
    document.getElementById('fahrenheit').value = document.getElementById('celsius').value * 1.8 + 32;
}