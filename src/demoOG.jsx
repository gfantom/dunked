import React from 'react';
import {Motion, spring} from 'react-motion';
import range from 'lodash.range';
import { browserHistory } from 'react-router';
import globalStore from "./stores/globalStore.jsx";
import * as globalActions from "./actions/globalActions.jsx";

const gridWidth = 210;
const gridHeight = 210;

const Demo = React.createClass({
  getInitialState() {
    return {
      delta: [0, 0],
      mouse: [0, 0],
      isPressed: false,
      firstConfig: [60, 5],
      slider: {dragged: null, num: 0},
    };
  },

  componentDidMount() {
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('touchmove', this.handleTouchMove);
    window.addEventListener('mouseup', this.handleMouseUp);
    window.addEventListener('touchend', this.handleMouseUp);
  },

  handleTouchStart(press, e) {
    this.handleMouseDown(press, e.touches[0]);
  },

  handleMouseDown([pressX, pressY], {pageX, pageY}) {
    this.setState({
      delta: [pageX - pressX, pageY - pressY],
      mouse: [pressX, pressY],
      isPressed: true,
    });
    globalActions.updateDragging(true);
    console.log(pageX, pageY);
    console.log(pressX, pressY);
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
    //console.log(pageX, pageY);
  },

  handleMouseUp() {
    this.setState({
      isPressed: false,
      delta: [0, 0],
      slider: {dragged: null, num: 0},
    });
    globalActions.updateDragging(false);
  },

  handleChange(constant, num, {target}) {
    const {firstConfig: [s, d]} = this.state;
    if (constant === 'stiffness') {
      this.setState({
        firstConfig: [target.value - num * 30, d],
      });
    } else {
      this.setState({
        firstConfig: [s, target.value - num * 2],
      });
    }
  },

  render() {
    const {
      mouse, isPressed, firstConfig: [s0, d0], slider: {dragged, num}
    } = this.state;
    const cellStyle = {
      top: gridHeight*0+40, //distance from top edge
      left: gridWidth*this.props.count, //distance from left edge
      width: gridWidth,
      height: gridHeight,
    };
    var dunkBox = "";
    if( this.props.location.pathname != '/' ) {
      cellStyle.left = "-0px";
      cellStyle.top = gridHeight*this.props.count + 80;

      const dunkBoxStyle = {
        top: 420,
      };
      dunkBox = '<div style={dunkBoxStyle} className="demo5-cell"></div>';
    }
    const stiffness = s0;
    const damping = d0;
    const motionStyle = isPressed
      ? {x: mouse[0], y: mouse[1]}
      : {
          x: spring(gridWidth / 2 - gridWidth / 6, {stiffness, damping}),
          y: spring(gridHeight / 2 - gridHeight / 6, {stiffness, damping}),
        };
    return (
      <div style={cellStyle} className="demo5-cell">
        <Motion style={motionStyle}>
          {({x, y}) => {
            return (
              <div
                style={{
                  transform: `translate3d(${x}px, ${y}px, 0)`,
                  WebkitTransform: `translate3d(${x}px, ${y}px, 0)`,
                }}
                className={'demo5-ball'}
                onMouseDown={this.handleMouseDown.bind(null, [x, y])}
                onTouchStart={this.handleTouchStart.bind(null, [x, y])}>
                <div className="demo5-preset">
                  <strong>{this.props.msg}</strong>
                </div>
              </div>
            );
          }}
        </Motion>
      </div>
            
    );
  },
});


export default Demo;