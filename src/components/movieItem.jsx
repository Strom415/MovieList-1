import React from 'react';

export default class MovieListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'none',
      bgcolor: 'white'
    };
  }

  handleClick() {
    this.setState({
      display: this.state.display === 'none' ? 'block' : 'none',
      bgcolor: this.state.bgcolor === 'white' ? '#C4EADA' : 'white',
    });
  }

  render() {
    
    return (
      <div>
        <div className="listItem" style={{backgroundColor:this.state.bgcolor}}>
          <span className="movieTitle" onClick={this.handleClick.bind(this)}>{this.props.movie.title}</span>
          
        </div>
        <div className="scrollDown" style={{display: this.state.display}}>
          <div className="description">
            Year: 2000<br/>
            Runtime: 107min <br/>
            Metascore: 46 <br/>
            imdbRating: 6.2 <br/>
            <label onClick={() => this.props.handleToggleWatch(this.props.movie)}> {this.props.movie.watched? 'Watched' : 'To Watch'}
            </label>
          </div>
          <div className="image">
            <img src="" alt=""/>
          </div>
        </div>
    </div>
    );
  }
}