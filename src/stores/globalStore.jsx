import { EventEmitter } from "events";

import dispatcher from "../dispatcher.jsx";

class globalStore extends EventEmitter {
  constructor() {
  	super();
  	this.selectedBubble = 0;
  	this.insideBox = false;
  	this.draggingBubble = false;

  }
  updateDragging(current) {
  	this.draggingBubble = current;
  	this.emit("change");
  }
  updateInBox(current) {
  	this.insideBox = current;
  	this.emit("change");
  }
  selectBubble( bubbleNum ) {
  	this.selectedBubble = bubbleNum;
  	this.emit("change");
  }
  getBubbleNum() {
  	return this.selectedBubble;
  }
  getDragging() {
  	return this.draggingBubble;
  }
  getInBox() {
    return this.insideBox;
  }
  handleActions(action) {
  	switch(action.type) {
  		case "UPDATE_DRAGGING": {
  			this.updateDragging(action.dragging);
  			break;
  		}
      case "UPDATE_IN_BOX": {
        this.updateInBox(action.current);
        break;
      }
  	}
  }
}

const globalStore1 = new globalStore;
dispatcher.register(globalStore1.handleActions.bind(globalStore1));

export default globalStore1;