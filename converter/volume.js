/*
                                                        volume Conversion Utility
                                                                12/19/2019
                                                        Author Richard Bromley

    This program takes one of seven volume quantities modified by a user within an HTML and determines the value of the other six measuring 
systems on the HTML document.
*/
const LITERS = 1; const MILILITERS = 2; const GALLONS = 3; const QUARTS = 4; const PINTS = 5; const CUPS = 6; const OUNCE = 7; const TABLESPOONS = 8; const TEASPOONS = 9; const GRAM = 10;

function litersEntry(event) {
    var x = event.which || event.keyCode;
    if (x !== 13) return;
    update(LITERS);
}

function mililitersEntry(event) {
    var x = event.which || event.keyCode;
    if (x !== 13) return;
    update(MILILITERS);
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

function ounceEntry(event) {
    var x = event.which || event.keyCode;
    if (x !== 13) return;
    update(OUNCE);
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

function gramEntry(event) {
    var x = event.which || event.keyCode;
    if (x !== 13) return;
    update(GRAM);
}


function update(location) {
   
    var count = 0;

    do {
        switch (location) {

            case GRAM:
                document.getElementById('liters').value = document.getElementById('gram').value / 1000;
                location = LITERS;
                count++;
                break;
        
            case LITERS:
                document.getElementById('mililiters').value = document.getElementById('liters').value * 1000;
                location++;
                count++;
                break;

            case MILILITERS:
                document.getElementById('gallons').value = document.getElementById('mililiters').value * 0.00026417217685798896288645087322113;
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
                document.getElementById('ounce').value = document.getElementById('cups').value * 8;
                location++;
                count++;
                break;

            case OUNCE:
                document.getElementById('tablespoons').value = document.getElementById('ounce').value * 2;
                location++;
                count++;
                break;

            case TABLESPOONS:
                document.getElementById('teaspoons').value = document.getElementById('tablespoons').value * 3;
                location++;
                count++;
                break;

            case TEASPOONS:
                document.getElementById('gram').value = document.getElementById('teaspoons').value * 4.928921594;
                location++;
                count++;
                break;
        }
    } while(count < 9);
}