/*
                Distance Conversion Utility
                    Date: 12/19/2019
                  Author: Richard Bromley

*/

function lbsEntry(event) {
    var x = event.which || event.keyCode;
    if (x !== 13) return;
    var entry = document.getElementById('lbs').value;
    document.getElementById('newtons').value = entry * 4.44822;
    document.getElementById('watts').value = entry * 4.44822;
}


function newtonsEntry(event) {
    var x = event.which || event.keyCode;
    if (x !== 13) return;
    var entry = document.getElementById('newtons').value;
    document.getElementById('lbs').value = entry * 0.224809;
    document.getElementById('watts').value = entry;
}


function wattsEntry(event) {
    var x = event.which || event.keyCode;
    if (x !== 13) return;
    var entry = document.getElementById('watts').value;
    document.getElementById('lbs').value = entry * 0.224809;
    document.getElementById('newtons').value = entry;
}