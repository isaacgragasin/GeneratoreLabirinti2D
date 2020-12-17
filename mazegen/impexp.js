var paths;
var width;
var height;
var size;
var startendpos;
var mazeshape;
var hexapath;
var sequence;
var fileName = "maze-params.json";
var madeImport = false;

/**
 * Replaces relevant fields when the choice of the shape of the maze has changed.
 */
function changeFields(){
    if(document.getElementById("mrect").checked){
        document.getElementsByClassName("width")[0].style.display = "initial";
        document.getElementsByClassName("width")[1].style.display = "initial";
        document.getElementsByClassName("height")[0].style.display = "initial";
        document.getElementsByClassName("height")[1].style.display = "initial";
        document.getElementsByClassName("size")[0].style.display = "none";
        document.getElementsByClassName("size")[1].style.display = "none";
        document.getElementById("hexpaths").style.display = "none";
    }else{
        document.getElementsByClassName("width")[0].style.display = "none";
        document.getElementsByClassName("width")[1].style.display = "none";
        document.getElementsByClassName("height")[0].style.display = "none";
        document.getElementsByClassName("height")[1].style.display = "none";
        document.getElementsByClassName("size")[0].style.display = "initial";
        document.getElementsByClassName("size")[1].style.display = "initial";
        if((document.getElementById("mhexa").checked)){
            document.getElementById("hexpaths").style.display = "initial";
        }else{
            document.getElementById("hexpaths").style.display = "none";
        }
    }
}

/**
 * Fetches all current parameters of the maze.
 */
function getParams(){
    path = document.getElementById("path").value;

    if(!(document.getElementById("mcirc").checked)){
        startendpos = document.getElementById("startendpos").value;
    }

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

/**
 * Saves the current parameters of the maze into a JSON file and exports it.
 */
function saveParam(){
    getParams();
    var data;
    if(!(document.getElementById("mrect").checked)){
       width = size;
       height = size;
    }
    data = {
       p: paths, 
       w: width, 
       h: height,
       s: size, 
       sep: startendpos, 
       m: mazeshape, 
       hp: hexapath, 
       seq: sequence
    };

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

/**
 * Verifies if an input file is actually a JSON file.
 * 
 * @param json the JSON file
 */
function checkJson(json){
    try{
        JSON.parse(json);
    }catch(e){
        return false;
    }
    return true;
}

/**
 * Loads new parameters from an imported JSON file and generates a new maze.
 */
function loadParam(){
    var input = document.createElement('input');
    input.type = 'file';

    input.onchange = e => { 
        var file = e.target.files[0];
        file = $.getJSON(file);
        if(checkJson(file)){
            var newParams = JSON.parse(file);
            document.getElementById('path').value = newParams.p;
            document.getElementById('width').value = newParams.w;
            document.getElementById('height').value = newParams.h;
            document.getElementById('size').value = newParams.s;
            document.getElementById('startendpos').value = newParams.sep;
            document.getElementById('mazeshape').value = newParams.mm;
            document.getElementById('hexapath').value = newParams.hp;
            seed = newParams.seq;
            madeImport = true;
            generateMaze();
        }else{
            alert("Invalid file imported");
        }
    }
    input.click();
}

/**
 * Saves the current maze as a .png image file.
 */
function saveMaze(){
    var download = document.createElement('download');
    download.type = 'a';
    download.setAttribute('download', 'maze.png');
    const image = document.getElementById('mazecanvas').toDataURL("image/png");
    image.replace("image/png", "image/octet-stream");
    download.setAttribute('href', image);
    download.click();
}

