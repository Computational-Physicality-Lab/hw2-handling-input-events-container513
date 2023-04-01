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
}

for(let i=0;i<targets.length;i++){
    targets[i].addEventListener("click",doEvent);
    targets[i].addEventListener("mousedown",doEvent);
    targets[i].addEventListener("mousemove",doEvent);
    targets[i].addEventListener("mouseup",doEvent);
    targets[i].addEventListener("dblclick",doEvent);
    targets[i].addEventListener("touchstart",doEvent);
    targets[i].addEventListener("touchend",doEvent);
    targets[i].addEventListener("touchmove",doEvent);
}
workspace.addEventListener("click",doEvent);
workspace.addEventListener("mousedown",doEvent);
workspace.addEventListener("mousemove",doEvent);
workspace.addEventListener("mouseup",doEvent);
workspace.addEventListener("dblclick",doEvent);
workspace.addEventListener("touchstart",doEvent);
workspace.addEventListener("touchend",doEvent);
workspace.addEventListener("touchmove",doEvent);