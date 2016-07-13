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
  inBoxT() {
  	this.insideBox = true;
  	this.emit("change");
  }
  inBoxF() {
  	this.insideBox = false;
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
  handleActions(action) {
  	switch(action.type) {
  		case "UPDATE_DRAGGING": {
  			this.updateDragging(action.dragging);
  			break;
  		}
  	}
  }
}

const globalStore1 = new globalStore;
dispatcher.register(globalStore1.handleActions.bind(globalStore1));

export default globalStore1;