/* These functions control the modals and functions within the modals
 *
 * Author: Matt Carrick
 * Website: http://matt.netsoc.co/FYP
 */

/*
 * On hover of the keyboard icon fade in the modal background and content box
 * On mouseout, fade them both out
 */
$('#keyboard-icon').hover(function(){
    $('#keyboardModal').fadeIn(800);
    $('#keyboardModal .modal-content').fadeIn(800);
},function(){
    $('#keyboardModal').fadeOut(800);
    $('#keyboardModal .modal-content').fadeOut(800);
});

/*
 * On click on the export button in the file menu, display the export modal
 */
$('#exportButton').click(function(){
    document.getElementById('exportModal').style.display = "block";
});

/*
 * When any of the export buttons are clicked, either -
 * display the JSON modal and fill the code box with JSON, or
 * open the image on the canvas in a new tab/window
 */
$('.export').click(function(){
    document.getElementById('load').style.display='block';
    if($(this).attr("value")=="json"){
        document.getElementById('json').innerHTML = 'Loading...';
        document.getElementById('jsonModal').style.display = "block";
        setTimeout(function() {
            document.getElementById('json').innerHTML = JSON.stringify(canvas.toJSON(['width', 'height', 'id']), null, 4);
        }, 0);
    } else {
        window.open(canvas.toDataURL( {format: $(this).attr("value") })) 
    }
    document.getElementById('load').style.display = "none";
});

$('#select').click(function(){
    var text = document.getElementById('json');
    if (document.body.createTextRange) {
        var range = document.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else {
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    } 
});

$('#importButton').click(function(){
    document.getElementById('importModal').style.display = 'block';
});

$('#import').click(function(){
    var json = document.getElementById('importJSON').value;
    var object = JSON.parse(json);
    console.log("importing")
    canvas.loadFromJSON(json, function(){
        canvas.renderAll.bind(canvas);
        canvas.setWidth(object.width);
        canvas.setHeight(object.height);
        document.getElementById('canvasWrapper').style.width = object.width + "px";
        updateLayers();
        $('.close').click();
    });
})

//Export Modal
$('#newCanvasButton').click(function(){
    document.getElementById('newCanvasModal').style.display = "block";
});

$('#newCanvas').click(function(){
    newCanvas(document.getElementById('width').value,document.getElementById('height').value);
});

// When the user clicks on <span> (x), close the modal
$('.close').click(function() {
    document.getElementById('newCanvasModal').style.display = "none";
    document.getElementById('exportModal').style.display = "none";
    document.getElementById('importModal').style.display = "none";
});

$('.closeJSON').click(function() {
    document.getElementById('jsonModal').style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
$(window).click(function(event) {
    if (event.target == document.getElementById('exportModal')) {
        document.getElementById('exportModal').style.display = "none";
    }
    if (event.target == document.getElementById('newCanvasModal')) {
        document.getElementById('newCanvasModal').style.display = "none";
    }
    if (event.target == document.getElementById('jsonModal')) {
        document.getElementById('jsonModal').style.display = "none";
    }
    if (event.target == document.getElementById('importModal')) {
        document.getElementById('importModal').style.display = "none";
    }
});

$('.form').submit(function(e) {
    e.preventDefault();
});