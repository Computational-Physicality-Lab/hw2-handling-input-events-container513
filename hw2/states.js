class State{
    constructor(context){
        this.context = context;
    }
    doEvent(event){}
}

class IdleState extends State{
    constructor(context){
        super(context);
        this.touchStartPreviousTime = -1000;
        this.touchPeriod = 200;
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
        
        if(event.type == "touchstart" && event.target.className == "target" && event.touches.length == 1){
            this.context.settouchStartEvent(event.touches[0]);
            this.context.setState(this.context.touchStartState);
        }

        if(event.type == "touchstart" && event.target.id == "workspace" && event.touches.length == 1){
            this.context.settouchStartEvent(null);
            
            this.touchStartPreviousTime = event.timeStamp;
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
            this.context.mouseMoveState.setResumeLeftandTop(event.target.style.left, event.target.style.top);
            this.context.setState(this.context.mouseMoveState);
        }
    }
}
class MouseMoveState extends State{
    constructor(context){
        super(context);
        this.resumeLeft = null;
        this.resumeTop = null;
    }

    setResumeLeftandTop(left,top){
        this.resumeLeft = left;
        this.resumeTop = top;
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
        if(event.type == "keydown"){
            if(event.key=="Escape"){
                this.context.mouseDownEvent.target.style.left = this.resumeLeft;
                this.context.mouseDownEvent.target.style.top = this.resumeTop;
                this.context.setState(this.context.clickIdleState);
            }
        }
        if(event.type == "click"){
            this.context.setState(this.context.idleState);
        }
    }
}

class ClickIdleState extends State{
    constructor(context){
        super(context);
    }
    doEvent(event){
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
        this.touchStartPreviousTime = -1000;
        this.touchScalePeriod = 300;
    }
    doEvent(event){
        if(event.touches.length == 2 && Math.abs(event.touches[1].timeStamp - event.touches[0].timeStamp) < this.touchScalePeriod){
            if(Math.abs(event.touches[1].clientX - event.touches[0].clientX) > 
            Math.abs(event.touches[1].clientY - event.touches[0].clientY)){
                this.context.touchHScaleState.setWidth(this.context.target.offsetWidth,Math.abs(event.touches[1].clientX-event.touches[0].clientX));
                this.context.setState(this.context.touchHScaleState);
            }
            else{
                this.context.setState(this.context.touchVScaleState);
            }
            return;
        }
        if(this.context.touchStartEvent==null){
            if(event.type == "touchend" &&
            event.timeStamp - this.context.idleState.touchStartPreviousTime <= this.context.idleState.touchPeriod
                && event.target.id == "workspace"){
                    this.context.setTarget(null);
                }
            this.context.setState(this.context.idleState);
            return;
        }
        if(event.type == "touchend"){
            this.context.setTarget(this.context.touchStartEvent.target);
            if(event.timeStamp - this.context.touchPeriousTime <= this.context.touchPeriod
                && event.target == this.context.touchPeriousTarget){
                this.context.touchFollowState.setResumeLeftandTop(this.context.touchStartEvent.target.style.left,this.context.touchStartEvent.target.style.top);
                console.log(this.context.touchStartEvent.target.style.left,this.context.touchStartEvent.target.style.top);
                this.context.setState(this.context.touchFollowState);
            }
            else{
                this.context.settouchStartEvent(null);
                this.context.setPeriousTouch(event.timeStamp, event.target);
                this.context.setState(this.context.idleState);
            }
        }
        if(event.type == "touchmove"){
            this.context.touchMoveState.setResumeLeftandTop(event.touches[0].target.style.left,event.touches[0].target.style.top);
            this.context.setState(this.context.touchMoveState);
        }
         
    }
}

class TouchMoveState extends State{
    constructor(context){
        super(context);
        this.resumeLeft = null;
        this.resumeTop = null;
    }

    setResumeLeftandTop(left,top){
        this.resumeLeft = left;
        this.resumeTop = top;
    }

    doEvent(event){
        if(event.touches.length >= 2){
            this.context.touchStartEvent.target.style.left = this.resumeLeft;
            this.context.touchStartEvent.target.style.top = this.resumeTop;
            this.context.setState(this.context.idleState);
            return;
        }
        if(event.type == "touchmove" && event.touches.length == 1){
            var x = event.touches[0].clientX;
            var y = event.touches[0].clientY;
            var newx = x - this.context.touchStartEvent.target.offsetWidth/2;
            var newy = y - this.context.touchStartEvent.target.offsetHeight/2;
            this.context.touchStartEvent.target.style.left = newx+"px";
            this.context.touchStartEvent.target.style.top = newy+"px";
        }
        if(event.type == "touchend"){
            this.context.settouchStartEvent(null);
            this.context.setState(this.context.idleState);
        }
        if(event.type == "keydown"){
            if(event.key=="Escape"){
                this.context.touchStartEvent.target.style.left = this.resumeLeft;
                this.context.touchStartEvent.target.style.top = this.resumeTop;
                this.context.setState(this.context.idleState);
            }
        }
    }
}

class TouchFollowState extends State{
    constructor(context){
        super(context);
        this.resumeLeft = null;
        this.resumeTop = null;
        this.touchStartPeriousTime = 0;
        this.touchPeriod = 200;
    }

    setResumeLeftandTop(left,top){
        this.resumeLeft = left;
        this.resumeTop = top;
    }

    doEvent(event){
        if(event.touches.length >= 2){
            this.context.touchStartEvent.target.style.left = this.resumeLeft;
            this.context.touchStartEvent.target.style.top = this.resumeTop;
            this.context.setState(this.context.idleState);
        }

        if(event.type == "touchmove"){
            var x = event.touches[0].clientX;
            var y = event.touches[0].clientY;
            var newx = x - this.context.touchStartEvent.target.offsetWidth/2;
            var newy = y - this.context.touchStartEvent.target.offsetHeight/2;
            this.context.touchStartEvent.target.style.left = newx+"px";
            this.context.touchStartEvent.target.style.top = newy+"px";
        }

        if(event.type == "touchend"){
            if(event.timeStamp - this.touchStartPeriousTime < this.touchPeriod){
                this.context.setState(this.context.idleState);
            }
            else{
                console.log(event);
                var x = event.changedTouches[0].clientX;
                var y = event.changedTouches[0].clientY;
                var newx = x - this.context.touchStartEvent.target.offsetWidth/2;
                var newy = y - this.context.touchStartEvent.target.offsetHeight/2;
                this.context.touchStartEvent.target.style.left = newx+"px";
                this.context.touchStartEvent.target.style.top = newy+"px";
            }
        }

        if(event.type == "touchstart"){
            this.touchStartPeriousTime = event.timeStamp;

        }
    }
}

class TouchHScaleState extends State{
    constructor(context){
        super(context);
        this.resumeWidth = null;
        this.touchWidth = null;
    }

    setWidth(w,ww){
        this.resumeWidth = w;
        this.touchWidth = ww;
    }

    doEvent(event){
        if(event.touches.length >= 3){
            this.context.currentTarget.offsetWidth = this.resumeWidth;
            this.context.setState(this.context.idleState);
            return;
        }
        if(event.type == "keydown"){
            if(event.key=="Escape"){
                this.context.currentTarget.offsetWidth = this.resumeWidth;
                this.context.setState(this.context.idleState);
                return;
            }
        }
        if(event.touches.length == 2){
            let d = Math.abs(event.touches[0].clientX-event.touches[1].clientX);
            this.context.currentTarget.offsetWidth = this.resumeWidth + (d - this.touchWidth);
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
        this.clickIdleState = new ClickIdleState(this);
        this.touchFollowState = new TouchFollowState(this);
        this.touchScaleState = new TouchHScaleState(this);
        this.currentState = this.idleState;
        this.currentTarget = null;
        this.mouseDownEvent = null;
        this.touchStartEvent = null;
        this.touchPeriousTime = -6000;
        this.touchPeriousTarget = null;
        this.touchPeriod = 500;
    }
    doEvent(event){
        console.log(event);
        this.currentState.doEvent(event);
    }
    setState(state){
        this.currentState = state;
    }
    setmouseDownEvent(event){
        this.mouseDownEvent = event;
    }
    settouchStartEvent(event){
        this.touchStartEvent = event;
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
    setPeriousTouch(time,target){
        this.touchPeriousTarget = target;
        this.touchPeriousTime = time;
    }
}

