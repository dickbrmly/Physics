document.getElementById('circuit').addEventListener("click", getClickPosition, false);
var sw = '#0';

function getClickPosition(e) {
    var width = document.getElementById('circuit').width;
    var height = document.getElementById('circuit').height;
    var xPosition = e.clientX;
    var yPosition = e.clientY;

    if (yPosition / height > 150 / 720 && yPosition / height  < 270 / 720) {
        if (xPosition  /width >  692 / 1280  &&  xPosition / width  < 730 / 1280) sw = sw ^ 4;
        if (xPosition / width >  775 / 1280  &&  xPosition / width  < 810 / 1280) sw = sw ^ 2;
        if (xPosition / width >  845 / 1280  &&  xPosition / width  < 891 / 1280) sw = sw ^ 1;

        switch (sw) {
            case 1:
                document.getElementById('circuit').src = 'electric2.jpg';
                break;
            case 2:
                document.getElementById('circuit').src = 'electric3.jpg';
                break;
            case 3:
                document.getElementById('circuit').src = 'electric4.jpg';
                break;
            case 4:
                document.getElementById('circuit').src = 'electric5.jpg';
                break;
            case 5:
                document.getElementById('circuit').src = 'electric6.jpg';
                break;
            case 6:
                document.getElementById('circuit').src = 'electric7.jpg';
                break;
            case 7:
                document.getElementById('circuit').src = 'electric8.jpg';
                break;
            default:
                document.getElementById('circuit').src = 'electric1.jpg';
                break;
        }
    }
    
}