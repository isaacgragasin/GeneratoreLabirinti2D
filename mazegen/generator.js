function generateMaze(){
    getParams();
    var c = document.getElementById("mazecanvas");
    c.width = 505;
    c.height = 505;
    var ctx = c.getContext("2d");
    var huntnKill;

    if((document.getElementById("mrect").checked)){
        huntnKill = new HuntnKill(width, height);
    }else{
        huntnKill = new HuntnKill(size);
    }
    

    var maze = huntnKill.getMaze();
    for (var x = 0; x < maze.length ; x++) {
        for (var y = 0; y < maze[x].length; y++) {
            if (maze[x][y])
            ctx.fillRect(x * 5, y * 5, 5, 5);
        }
    }
}

if(document.getElementById("mrect").checked){

}else if(document.getElementById("mcirc").checked){

}else if(document.getElementById("mtria").checked){
    if(document.getElementById("ptria").checked){

    }else{

    }
}else{
    if(document.getElementById("ptria").checked){

    }else{

    }
}