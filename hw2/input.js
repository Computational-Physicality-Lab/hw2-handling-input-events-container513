/*
* all the code for homework 2 goes into this file.
You will attach event handlers to the document, workspace, and targets defined in the html file
to handle mouse, touch and possible other events.

You will certainly need a large number of global variables to keep track of the current modes and states
of the interaction.
*/

const targets = document.getElementsByClassName("target");
const workspace = document.getElementById("workspace");

let context = new Context();

function doEvent(e){
    context.doEvent(e);
    e.stopPropagation();
}

function doOnlyTouchEvent(e){
    context.doEvent(e);
    e.preventDefault();
    e.stopPropagation();
}

for(let i=0;i<targets.length;i++){
    targets[i].addEventListener("click",doEvent);
    targets[i].addEventListener("mousedown",doEvent);
    targets[i].addEventListener("mousemove",doEvent);
    targets[i].addEventListener("mouseup",doEvent);
    targets[i].addEventListener("dblclick",doEvent);
    targets[i].addEventListener("touchstart",doOnlyTouchEvent);
    targets[i].addEventListener("touchend",doOnlyTouchEvent);
    targets[i].addEventListener("touchmove",doOnlyTouchEvent);
}
workspace.addEventListener("click",doEvent);
workspace.addEventListener("mousedown",doEvent);
workspace.addEventListener("mousemove",doEvent);
workspace.addEventListener("mouseup",doEvent);
workspace.addEventListener("dblclick",doEvent);
workspace.addEventListener("touchstart",doOnlyTouchEvent);
workspace.addEventListener("touchend",doOnlyTouchEvent);
workspace.addEventListener("touchmove",doOnlyTouchEvent);

document.addEventListener("keydown",doEvent);
document.addEventListener("devicemotion",doEvent);