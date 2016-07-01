import React from 'react';
import {Motion, spring} from 'react-motion';
import range from 'lodash.range';

const gridSize = 150;

const Demo = React.createClass({
  getInitialState() {
    return {
      delta: [0, 0],
      mouse: [0, 0],
      isPressed: false,
      firstConfig: [60, 5],
      slider: {dragged: null, num: 0},
      lastPressed: [0, 0],
    };
  },

  componentDidMount() {
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('touchmove', this.handleTouchMove);
    window.addEventListener('mouseup', this.handleMouseUp);
    window.addEventListener('touchend', this.handleMouseUp);
  },

  handleTouchStart(pos, press, e) {
    this.handleMouseDown(pos, press, e.touches[0]);
  },

  handleMouseDown(pos, [pressX, pressY], {pageX, pageY}) {
    this.setState({
      delta: [pageX - pressX, pageY - pressY],
      mouse: [pressX, pressY],
      isPressed: true,
      lastPressed: pos,
    });
  },

  handleTouchMove(e) {
    if (this.state.isPressed) {
      e.preventDefault();
    }
    this.handleMouseMove(e.touches[0]);
  },

  handleMouseMove({pageX, pageY}) {
    const {isPressed, delta: [dx, dy]} = this.state;
    if (isPressed) {
      this.setState({mouse: [pageX - dx, pageY - dy]});
    }
  },

  handleMouseUp() {
    this.setState({
      isPressed: false,
      delta: [0, 0],
      slider: {dragged: null, num: 0},
    });
  },

	render() {
		const {
			mouse, isPressed,
		} = this.state;
		const cellStyle = {
			top: gridSize * 3,
			left: gridSize * 1,
			width: gridSize,
			height: gridSize + 35,
		};
		const motionStyle = isPressed ? {x: mouse[0], y: mouse[1]} : {
			x: spring(gridSize / 2 - 25),
			y: spring(gridSize / 2 - 25),
		};
		return(
			
			<Motion style={cellStyle}>
				{({x, y}) => {
					let thing;
					return (
						<div
							style={{
								transform: `translate3d(${x}px, ${y}px, 0)`,
								WebkitTransform: `translate3d(${x}px, ${y}px, 0)`,
							}}
							className={'demo5-ball'}
							onMouseDown={this.handleMouseDown.bind(null, [x, y])}
							onTouchStart={this.handleTouchStart.bind(null, [x, y])}
						>arstartarst</div>
                    );
				}}
			</Motion>
		
		);
	},

});

export default Demo;