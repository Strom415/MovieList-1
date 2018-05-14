import React from 'react';
import {searchMovieID, searchTMDB} from '../lib/searchTMDB.js';

export default class MovieListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'none',
      bgcolor: 'white',
      movieID: '',
      year: '',
      runtime: '',
      popularity: '',
      imdbRating: '',
    };
  }

  handleClick() {
    this.setState({
      display: this.state.display === 'none' ? 'block' : 'none',
      bgcolor: this.state.bgcolor === 'white' ? '#C4EADA' : 'white',
    });

    searchMovieID(this.props.movie.title, (data) => {
      this.setState({
        movieID: data.results[0].id,
      }, () => {
        //included in the callback to make sure the setState of movieID runs first
        searchTMDB(this.state.movieID, (res) => {
          this.setState({
            year: res.release_date.split('-')[0],
            runtime: res.runtime + 'min',
            popularity: Math.round(Number(res.popularity), 2),
            imdbRating: res.vote_average,
          });
        });
      });
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
            Year: {this.state.year}<br/>
            Runtime: {this.state.runtime} <br/>
            popularity: {this.state.popularity}<br/>
            imdbRating: {this.state.imdbRating} <br/>
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