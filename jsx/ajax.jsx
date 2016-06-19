
var React = require('react');
var ReactDOM = require('react-dom');

var UserGist = React.createClass({
  getInitialState() {
    return {
      username: '',
      lastGistUrl: '',
    };
  },

  componentDidMount() {
    var that = this;
    fetch(this.props.source)
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        var lastGist = json[0];
        if (that.isMounted()) {
          that.setState({
            username: lastGist.owner.login,
            lastGistUrl: lastGist.html_url,
          });
        }
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      });
  },

  render() {
    return (
      <p>
        {this.state.username}'s last gist is <a href={this.state.lastGistUrl} target="_blank">here</a>.
      </p>
    );
  }
});

ReactDOM.render(
  <div className="container">
    <UserGist source="https://api.github.com/users/rakuishi/gists" />
  </div>,
  document.getElementById('content')
);
