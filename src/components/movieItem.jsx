import React from 'react';

export default class MovieListItem extends React.Component {
  constructor(props) {
    super(props); 
  }

  render() {
    
    return (
      <div className="listItem">
        <span>{this.props.movie.title}</span>
          <label onClick={() => this.props.handleToggleWatch(this.props.movie)}>{this.props.movie.watched? 'Watched': 'To Watch'}</label>
      </div>
    );
  }
}