function changeFields(){
    if(document.getElementById("mrect").checked){
        document.getElementsByClassName("width")[0].style.display = "initial";
        document.getElementsByClassName("width")[1].style.display = "initial";
        document.getElementsByClassName("height")[0].style.display = "initial";
        document.getElementsByClassName("height")[1].style.display = "initial";
        document.getElementsByClassName("size")[0].style.display = "none";
        document.getElementsByClassName("size")[1].style.display = "none";
        document.getElementById("trihexpaths").style.display = "none";
    }else{
        document.getElementsByClassName("width")[0].style.display = "none";
        document.getElementsByClassName("width")[1].style.display = "none";
        document.getElementsByClassName("height")[0].style.display = "none";
        document.getElementsByClassName("height")[1].style.display = "none";
        document.getElementsByClassName("size")[0].style.display = "initial";
        document.getElementsByClassName("size")[1].style.display = "initial";
        if((document.getElementById("mhexa").checked)){
            document.getElementById("trihexpaths").style.display = "initial";
        }else{
            document.getElementById("trihexpaths").style.display = "none";
        }
    }
}
