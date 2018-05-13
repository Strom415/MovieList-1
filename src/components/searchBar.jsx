import React from 'react';

export default class Search extends React.Component {
  constructor(props) {
    super(props); 
  }
  render() {
    return (
      <form class="form-inline">
       <input type="text" value={this.props.searchInput} placeholder="Search..." class="form-control" onChange={this.props.handleSearchChange}/>
       <button class="btn btn-default" onClick={this.props.handleSearch}>Go!</button>
      </form>
    );
  }
}