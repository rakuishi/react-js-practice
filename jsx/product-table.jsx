
var React = require('react');
var ReactDOM = require('react-dom');

var ProductCategoryRow = React.createClass({
  render() {
    return (
      <tr>
        <th colSpan="2">
          {this.props.category}
        </th>
      </tr>
    );
  }
});

var ProductRow = React.createClass({
  render() {
    var name = this.props.product.stocked ?
      this.props.product.name :
      <span style={{color: 'red'}}>
        {this.props.product.name}
      </span>
    return (
      <tr>
        <td>{name}</td>
        <td>{this.props.product.price}</td>
      </tr>
    );
  }
});

var ProductTable = React.createClass({
  render() {
    var rows = [];
    var lastCategory = null;
    this.props.products.forEach(function(product) {
      if (product.category !== lastCategory) {
        rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
      }
      rows.push(<ProductRow product={product} key={product.name} />);
      lastCategory = product.category;
    });

    return (
      <table className="u-full-width">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
});

var SearchBar = React.createClass({
  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          className="u-full-width"
          />
        <label>
          <input type="checkbox" />
          <span className="label-body">
            {' '}
            Only show products in stock
          </span>
        </label>
      </form>
    );
  }
});

var FilterableProductTable = React.createClass({
  render() {
    return (
      <div>
        <h1>Product Table</h1>
        <SearchBar />
        <ProductTable products={this.props.products} />
      </div>
    );
  }
});

var products = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

ReactDOM.render(
  <div className="container">
    <FilterableProductTable products={products} />
  </div>,
  document.getElementById('content')
);
