/*******************************************************************************************************
 *                                             Bromley Solutions 
 *                                             Client JavaScript
 *
 * This website will have facilities for user login and creation.  It will have online programs for
 * use by registered users.
 *
 *
 * Date:  11-22-2019
 * Author: Richard Bromley
 *******************************************************************************************************/
// JavaScript source code
// Get the modal

// When the user clicks anywhere outside of the modal, close it

function startConversions() {
    window.open("/converter/index.html");
}

function startElastic() {
    window.open("/elastic/elastic.html");
}

function startGravitation() {
    window.open("/gravitation/index.html");
}

function startBallistics() {
    window.open("/ballistics/index.html");
}

function startElectric() {
    window.open("/electric/index.html");
}

function startEquations() {
    window.open("/equations/index.html");
}

function startMessageBoard() {
    window.open("/messages/index.html");
}

function closeWin() {
    window.close();
}

function newUser() {
    window.open('/newUser/createUser.html', "_blank", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=yes, width=800, height=625");
}

function grabLogin() {
    document.getElementById('login').style.display = 'block';
}