
var React = require('react');
var ReactDOM = require('react-dom');

var data = [
  {id: 1, author: "Pete Hunt", text: "This is one comment."},
  {id: 2, author: "Jordan Walke", text: "This is another comment."},
];

var Comment = React.createClass({
  render: function() {
    return (
      <div className="Comment">
        <h4>{this.props.author}</h4>
        <p>{this.props.children}</p>
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function (comment) {
      return (
        <Comment author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
      );
    });

    return (
      <div className="CommentList">
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  getInitialState: function() {
    return {
      author: '',
      text: '',
    };
  },

  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },

  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text})
    this.setState({author: '', text: ''})
  },

  render: function() {
    return (
      <form onSubmit={this.handleSubmit} className="CommentForm">
        <div className="row">
          <div className="six columns">
            <input
              type="text"
              placeholder="Your name"
              value={this.state.author}
              onChange={this.handleAuthorChange}
              className="u-full-width"
              />
          </div>
          <div className="six columns">
            <input
              type="text"
              placeholder="Say something..."
              value={this.state.text}
              onChange={this.handleTextChange}
              className="u-full-width"
              />
          </div>
        </div>
        <input
          type="submit"
          value="Post"
          className="button-primary"
          />
      </form>
    );
  }
});

var CommentBox = React.createClass({
  getInitialState: function() {
    return {data: []};
  },

  componentDidMount: function() {
    this.setState({data: this.props.data});
  },

  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    comment.id = Date.now();
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
  },

  render: function() {
    return (
      <div className="CommentBox">
        <h1>Comment Box</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});

ReactDOM.render(
  <div className="container">
    <CommentBox data={data} />
  </div>,
  document.getElementById('content')
);
