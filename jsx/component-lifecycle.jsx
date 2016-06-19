
var React = require('react');
var ReactDOM = require('react-dom');

var Hello = React.createClass({
  getInitialState() {
    return {
      opacity: 1.0,
    };
  },

  componentDidMount() {
    this.timer = setInterval(function () {
      var opacity = this.state.opacity;
      opacity -= 0.05;
      if (opacity < 0.1) {
        opacity = 1.0;
      }
      this.setState({
        opacity: opacity,
      });
    }.bind(this), 100);
  },

  render() {
    return (
      <h1 style={{opacity: this.state.opacity}}>
        Hello {this.props.name}!
      </h1>
    );
  }
});

ReactDOM.render(
  <div className="container">
    <Hello name="React.js" />
  </div>,
  document.getElementById('content')
);
