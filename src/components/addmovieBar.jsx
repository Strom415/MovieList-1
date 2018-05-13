import React from 'react';

export default class Addmovie extends React.Component {
  constructor(props) {
    super(props); 
  }
  
  render() {
    return (
      <form class="form-inline">
       <input type="text" value={this.props.addInput} placeholder="Add movie title here..." class="form-control" onChange={this.props.handleAddChange} />
       <button class="btn btn-primary" onClick={this.props.handleAdd} disabled={!this.props.addInput}>Add</button>
      </form>
    );
  }
}