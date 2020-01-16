/*
                                                        volume Conversion Utility
                                                                12/19/2019
                                                        Author Richard Bromley

    This program takes one of seven volume quantities modified by a user within an HTML and determines the value of the other six measuring 
systems on the HTML document.
*/
const LITERS = 1; const GALLONS = 2; const QUARTS = 3; const PINTS = 4; const CUPS = 5; const TABLESPOONS = 6; const TEASPOONS = 7;

function litersEntry(event) {
    var x = event.which || event.keyCode;
    if (x !== 13) return;
    update(LITERS);
}

function gallonsEntry(event) {
    var x = event.which || event.keyCode;
    if (x !== 13) return;
    update(GALLONS);
}

function quartsEntry(event) {
    var x = event.which || event.keyCode;
    if (x !== 13) return;
    update(QUARTS);
}

function pintsEntry(event) {
    var x = event.which || event.keyCode;
    if (x !== 13) return;
    update(PINTS);
}

function cupsEntry(event) {
    var x = event.which || event.keyCode;
    if (x !== 13) return;
    update(CUPS);
}

function tablespoonsEntry(event) {
    var x = event.which || event.keyCode;
    if (x !== 13) return;
    update(TABLESPOONS);
}

function teaspoonsEntry(event) {
    var x = event.which || event.keyCode;
    if (x !== 13) return;
    update(TEASPOONS);
}

function update(location) {
   
    var count = 0;

    do {
        switch (location) {
            case TEASPOONS:
                document.getElementById('liters').value = document.getElementById('teaspoons').value *  0.00492892;
                location = LITERS;
                count++;
                break;
        
            case LITERS:
                document.getElementById('gallons').value = document.getElementById('liters').value * 0.264172058;
                location++;
                count++;
                break;

            case GALLONS:
                document.getElementById('quarts').value = document.getElementById('gallons').value * 4;
                location++;
                count++;
                break;

            case QUARTS:
                document.getElementById('pints').value = document.getElementById('quarts').value * 2;
                location++;
                count++;
                break;

            case PINTS:
                document.getElementById('cups').value = document.getElementById('pints').value * 2;
                location++;
                count++;
                break;

            case CUPS:
                document.getElementById('tablespoons').value = document.getElementById('cups').value * 16;
                location++;
                count++;
                break;

            case TABLESPOONS:
                document.getElementById('teaspoons').value = document.getElementById('tablespoons').value * 3;
                location++;
                count++;
                break;
        }
    } while(count < 6);
}