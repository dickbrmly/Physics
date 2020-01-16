function tonsEntry(event) {
    var x = event.which || event.keyCode;
    if (x !== 13) return;
    var entry = document.getElementById('tons').value;
    document.getElementById('pounds').value = entry * 2000;
    document.getElementById('ounces').value = entry * 32000;
    document.getElementById('kilograms').value = entry * 907.18474;
    document.getElementById('grams').value = entry * 907184.74;
    keneticCalc();
}

function poundsEntry(event) {
    var x = event.which || event.keyCode;
    if (x !== 13) return;
    var entry = document.getElementById('pounds').value;
    document.getElementById('ounces').value = entry * 16;
    document.getElementById('kilograms').value = entry * 0.45359237;
    document.getElementById('grams').value = entry * 453.59237;
    document.getElementById('tons').value = entry * 0.0005;
    keneticCalc();
}

function ouncesEntry(event) {
    var x = event.which || event.keyCode;
    if (x !== 13) return;
    var entry = document.getElementById('ounces').value;
    document.getElementById('pounds').value = entry * 0.0625;
    document.getElementById('tons').value = entry * 0.00003125;
    document.getElementById('kilograms').value = entry * 0.02834952;
    document.getElementById('grams').value = entry * 28.3495231;
    keneticCalc();
}

function kilogramsEntry(event) {
    var x = event.which || event.keyCode;
    if (x !== 13) return;
    var entry = document.getElementById('kilograms').value;
    document.getElementById('pounds').value = entry * 2.20462262;
    document.getElementById('ounces').value = entry * 35.2739619;
    document.getElementById('tons').value = entry * 0.00110231131;
    document.getElementById('grams').value = entry * 1000;
    keneticCalc();
}

function gramsEntry(event) {
    var x = event.which || event.keyCode;
    if (x !== 13) return;
    var entry = document.getElementById('grams').value;
    document.getElementById('pounds').value = entry * 0.00220462;
    document.getElementById('ounces').value = entry * 0.03527396;
    document.getElementById('kilograms').value = entry * 0.001;
    document.getElementById('tons').value = entry * 0.00000110231131;
    keneticCalc();
}

function milesPerHourEntry(event) {
    var x = event.which || event.keyCode;
    if (x !== 13) return;
    var entry = document.getElementById('milesPerHour').value;
    document.getElementById('feetPerMinute').value = entry * 88;
    document.getElementById('feetPerSecond').value = entry * 1.46666667;
    document.getElementById('kilometersPerHour').value = entry * 1.609344;
    document.getElementById('metersPerSecond').value = entry * 0.44704;
    keneticCalc();
}

function feetPerMinuteEntry(event) {
    var x = event.which || event.keyCode;
    if (x !== 13) return;
    var entry = document.getElementById('feetPerMinute').value;
    document.getElementById('milesPerHour').value = entry * 0.011363636364;
    document.getElementById('feetPerSecond').value = entry / 60;
    document.getElementById('kilometersPerHour').value = entry * 0.018288;
    document.getElementById('metersPerSecond').value = entry * 0.00508;
    keneticCalc();
}

function feetPerSecondEntry(event) {
    var x = event.which || event.keyCode;
    if (x !== 13) return;
    var entry = document.getElementById('feetPerSecond').value;
    document.getElementById('milesPerHour').value = entry * 0.68181818;
    document.getElementById('feetPerMinute').value = entry * 60;
    document.getElementById('kilometersPerHour').value = entry * 1.09728;
    document.getElementById('metersPerSecond').value = entry * 0.3048;
    keneticCalc();
}

function kilometersPerHourEntry(event) {
    var x = event.which || event.keyCode;
    if (x !== 13) return;
    var entry = document.getElementById('kilometersPerHour').value;
    document.getElementById('milesPerHour').value = entry * 0.62137119;
    document.getElementById('feetPerSecond').value = entry * 0.91134442;
    document.getElementById('feetPerMinute').value = entry * 54.680664916885;
    document.getElementById('metersPerSecond').value = entry * 0.27777778;
    keneticCalc();
}

function metersPerSecondEntry(event) {
    var x = event.which || event.keyCode;
    if (x !== 13) return;
    var entry = document.getElementById('metersPerSecond').value;
    document.getElementById('milesPerHour').value = entry * 2.23693629;
    document.getElementById('feetPerSecond').value = entry * 3.2808399;
    document.getElementById('feetPerMinute').value = entry * 196.8504;
    document.getElementById('kilometersPerHour').value = entry * 3.6;
    keneticCalc();
}

function keneticCalc() {
    var x = 0.5 * document.getElementById('kilograms').value * 
        document.getElementById('metersPerSecond').value * 
        document.getElementById('metersPerSecond').value;
    document.getElementById('joules').innerHTML = x;
    document.getElementById('footPounds').innerHTML = 0.73756214927727 * x;
    document.getElementById('inchPounds').innerHTML = 8.850745791327 * x;
}