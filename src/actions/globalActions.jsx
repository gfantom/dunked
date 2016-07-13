import dispatcher from "../dispatcher.jsx";

export function updateSelectedBubble(bubbleNum) {
	dispatcher.dispatch({
		type: "UPDATE_BUBBLE",
		bubbleNum,
	});
}

export function updateDragging(dragging) {
	dispatcher.dispatch({
		type: "UPDATE_DRAGGING",
		dragging,
	});
}