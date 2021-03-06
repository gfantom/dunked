import React, { Component } from 'react';
import { Link } from "react-router";
import { StaggeredMotion, spring } from 'react-motion';
import range from 'lodash.range';

export default class Redir404 extends Component {
	constructor() {
		super();
		this.state = {x: 250,
			y: 300,};
	}
  componentDidMount() {
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('touchmove', this.handleTouchMove);
  }
  handleMouseMove({pageX, pageY}) {
    this.setState({pageX, pageY});
  }
  handleTouchMove({touches}) {
    this.handleMouseMove(touches[0]);
  }
  getStyles(prevStyles) {
    // `prevStyles` is the interpolated value of the last tick
    const endValue = prevStyles.map((_, i) => {
      return i === 0
        ? this.state
        : {
            x: spring(prevStyles[i - 1].x, {stiffness: 120, damping: 14}),
            y: spring(prevStyles[i - 1].y, {stiffness: 120, damping: 14}),
          };
    });
    return endValue;
  }
  render() {
    return(
        <StaggeredMotion
          defaultStyles={range(6).map(() => ({x: 0, y: 0}))}
          styles={this.getStyles}>
          {balls =>
            <div className="demo1">
              {balls.map(({x, y}, i) =>
                <div
                  key={i}
                  className={"demo1-ball"}
                  style={{
                    WebkitTransform: `translate3d(${x - 25}px, ${y - 25}px, 0)`,
                    transform: `translate3d(${x - 25}px, ${y - 25}px, 0)`,
                    zIndex: balls.length - i,
                  }} />
              )}
            </div>
          }
      </StaggeredMotion>
    )
  }
}