var loops = document.getElementById("loop").value;
var paths = document.getElementById("path").value;
var width;
var height;
var size;
var mazeshape;
var hexapath;
var fileName = "maze-params.json";

function getParams(){
    loops = document.getElementById("loop").value;
    paths = document.getElementById("path").value;

    if(document.getElementById("mrect").checked){
        mazeshape = document.getElementById("mrect").value;
    }else if(document.getElementById("mcirc").checked){
        mazeshape = document.getElementById("mcirc").value;
    }else if(document.getElementById("mtria").checked){
        mazeshape = document.getElementById("mtria").value;
    }else{
        mazeshape = document.getElementById("mhexa").value;
        if(document.getElementById("ptria").checked){
            hexapath = document.getElementById("ptria").value;
        }else{
            hexapath = document.getElementById("phexa").value;
        }
    }

    if(document.getElementById("mrect").checked){
        width = document.getElementById("width").value;
        height = document.getElementById("height").value;
    }else{
        size = document.getElementById("size").value;
    }
}

function saveParam(){
   var data = { p: paths, l: loops, w: width, h: height, m: mazeshape, hp: hexapath };

    var a = document.createElement("a"); 
    document.body.appendChild(a); 
    a.style = "display: none"; 
    return function (data, fileName) { 
        var json = JSON.stringify(data), 
            blob = new Blob([json], {type: "octet/stream"}), 
            url = window.URL.createObjectURL(blob); 
        a.href = url; 
        a.download = fileName; 
        a.click(); 
        window.URL.revokeObjectURL(url); 
    } 
}

function checkJson(jason){
    try{
        JSON.parse(jason);
    }catch(e){
        return false;
    }
    return true;
}

function loadParam(){
    var input = document.createElement('input');
    input.type = 'file';

    input.onchange = e => { 
        var file = e.target.files[0];
        file = $.getJSON(file);
        if(checkJson(file)){
            var newParams = JSON.parse(file);
            document.getElementById('path').value = newParams.paths;
            document.getElementById('loop').value = newParams.loops;
            document.getElementById('width').value = newParams.width;
            document.getElementById('height').value = newParams.height;
            document.getElementById('size').value = newParams.size;
            document.getElementById('mazeshape').value = newParams.mazeshape;
            document.getElementById('hexapath').value = newParams.hexapath;
            generateMaze();
        }else{
            alert("Invalid file imported");
        }
    }
    //input.click();
}

function saveMaze(){

}

