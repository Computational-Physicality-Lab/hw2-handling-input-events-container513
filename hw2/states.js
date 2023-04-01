class State{
    constructor(context){
        this.context = context;
    }
    doEvent(event){}
}

class IdleState extends State{
    constructor(context){
        super(context);
    }
    doEvent(event){
        if(event.type == "mousedown" && event.target.className=="target"){
            this.context.setmouseDownEvent(event);
            this.context.setState(this.context.mouseDownState);
        }

        if(event.type == "click" && event.target.id=="workspace"){
            this.context.setTarget(null);
        }

        if(event.type == "dblclick" && event.target.className == "target"){
            this.context.setmouseDownEvent(event);
            this.context.setState(this.context.mouseDblclickState);
        }
        
        if(event.type == "touchstart" && event.target.className == "target"){
            this.context.setState(this.context.touchStartState);
        }
    }
}
class MouseDownState extends State{
    constructor(context){
        super(context);
    }
    doEvent(event){
        if(event.type == "click" && event.target==this.context.mouseDownEvent.target){
            this.context.setTarget(event.target);
            this.context.setmouseDownEvent(null);
            this.context.setState(this.context.idleState);
        }
        if(event.type == "mousemove" && event.target==this.context.mouseDownEvent.target){
            this.context.setState(this.context.mouseMoveState);
        }
    }
}
class MouseMoveState extends State{
    constructor(context){
        super(context);
    }
    doEvent(event){
        if(event.type == "mousemove"){
            var x = event.clientX;
            var y = event.clientY;
            var newx = x - this.context.mouseDownEvent.offsetX;
            var newy = y - this.context.mouseDownEvent.offsetY; 
            this.context.mouseDownEvent.target.style.left = newx+"px";
            this.context.mouseDownEvent.target.style.top = newy+"px";
        }
        if(event.type == "click"){
            this.context.setState(this.context.idleState);
        }
    }
}
class MouseDblclickState extends State{
    constructor(context){
        super(context);
    }
    doEvent(event){
        if(event.type == "mousemove"){
            this.context.setState(this.context.mouseMoveState);
        }
    }
}

class TouchStartState extends State{
    constructor(context){
        super(context);
    }
    doEvent(event){
        if(event.type == "touchstart"){
            this.context.setState(this.context.touchStartState);
        }
    }
}

class TouchMoveState extends State{
    constructor(context){
        super(context);
    }
    doEvent(event){
        if(event.type == "touchmove"){
            this.context.setState(this.context.touchMoveState);
        }
        if(event.type == "touchend"){
            this.context.setState(this.context.idleState);
        }
    }
}



class Context{
    constructor() {
        this.idleState = new IdleState(this);
        this.mouseDownState = new MouseDownState(this);
        this.mouseDblclickState = new MouseDblclickState(this);
        this.mouseMoveState = new MouseMoveState(this);
        this.touchMoveState = new TouchMoveState(this);
        this.touchStartState = new TouchStartState(this);
        this.currentTarget = null;
        this.currentState = this.idleState;
        this.mouseDownEvent = null;
    }
    doEvent(event){
        this.currentState.doEvent(event);
    }
    setState(state){
        this.currentState = state;
    }
    setmouseDownEvent(event){
        this.mouseDownEvent = event;
    }
    setTarget(target){
        if(this.currentTarget!=null){
            this.currentTarget.style.backgroundColor = "red";
        }
        if(target!=null){
            target.style.backgroundColor = "blue";
        }
        this.currentTarget = target;
    }
}

