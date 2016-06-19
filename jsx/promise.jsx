
var React = require('react');
var ReactDOM = require('react-dom');

var RepoList = React.createClass({
  getInitialState() {
    return {
      loading: true,
      error: null,
      data: null,
    };
  },

  componentDidMount() {
    this.props.promise.then(
      value => this.setState({loading: false, data: value}),
      error => this.setState({loading: false, error: error})
    );
  },

  render() {
    if (this.state.loading) {
      return (
        <p>Loading...</p>
      );
    }
    else if (this.state.error !== null) {
      return (
        <p>Error: {this.state.error.message}</p>
      );
    }
    else {
      var repos = this.state.data.items;
      var repoList = repos.map(function (repo) {
        return (
          <li>
            <a href={repo.html_url} target="_blank">{repo.name}</a> ({repo.stargazers_count} stars) <br/> {repo.description}
          </li>
        );
      });

      return (
        <div className="RepoList">
          <h1>Most Popular JavaScript Projects in Github</h1>
          <ol>{repoList}</ol>
        </div>
      );
    }
  }
});

ReactDOM.render(
  <div className="container">
    <RepoList promise={ fetch('https://api.github.com/search/repositories?q=javascript&sort=stars').then(function(response) { return response.json() }) } />
  </div>,
  document.getElementById('content')
);
