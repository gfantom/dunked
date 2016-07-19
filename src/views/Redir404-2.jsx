import React from 'react';
import {StaggeredMotion, spring} from 'react-motion';
import range from 'lodash.range';

const Demo = React.createClass({
  getInitialState() {
    return {x: 250, y: 300};
  },

  componentDidMount() {
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('touchmove', this.handleTouchMove);
    document.title="404";
  },

  handleMouseMove({pageX: x, pageY: y}) {
    this.setState({x, y});
  },

  handleTouchMove({touches}) {
    this.handleMouseMove(touches[0]);
  },

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
  },

  handleMouseClick(event) {
    this.props.history.push('/');
  },

  render() {
    return (
      <StaggeredMotion
        defaultStyles={range(15).map(() => ({x: 0, y: 0}))}
        styles={this.getStyles}>
        {balls =>
          <div className="fourOfour">
            {balls.map(({x, y}, i) =>
              <div
                key={i}
                onClick={this.handleMouseClick}
                className={"fourOfour-ball"}
                style={{
                  WebkitTransform: `translate3d(${x - 270}px, ${y - 185}px, 0)`,
                  transform: `translate3d(${x - 270}px, ${y - 185}px, 0)`,
                  zIndex: balls.length - i,
                }} />
            )}
          </div>
        }
      </StaggeredMotion>
    );
  },
});

export default Demo;