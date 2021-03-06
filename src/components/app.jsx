import React from 'react';
import MovieListItem from './movieItem.jsx';
import Search from './searchBar.jsx';
import AddMovie from './addmovieBar.jsx';
import {searchMovieName, searchPopularMovies} from '../lib/searchTMDB.js';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCategory: false,
      displayMovies: this.props.movies,
      defaultMovies: [],
      searchInput: '',
      addInput:'',
      b1Color: 'white', 
      b2Color: '#C4EADA',
    };
  }

  componentDidMount() {
    var newMovies = [];
    searchPopularMovies((results) => {
      for (var i = 0; i < results.length; i++) {
        newMovies.push({title: results[i].title, watched: false});
        //should not modify props!!!!!!!!!
        //this.props.movies.push({title: results[i].title, watched: false}); 
      }
      this.setState({
        defaultMovies: newMovies,
        displayMovies: newMovies,
      });
    });

  }

  handleAdd() {
    let defaultM = this.state.defaultMovies;
    searchMovieName(this.state.addInput, (data) => {
      var movieName = data.results[0].title;
      defaultM.push({title: movieName, watched: false});
      this.setState({
        defaultMovies: defaultM,
        displayMovies: this.state.defaultMovies.filter(movie => movie.watched === false),
        addInput:'',
      });
    });
    event.preventDefault();
  }

  handleChangeAdd(event) {
    this.setState({
      addInput : event.target.value
    });
  }

  handleChangeSearch(event) {
    this.setState({
      searchInput : event.target.value
    });
  }
  
  handleSearch() {
    this.setState({
      displayMovies : this.state.displayMovies.filter((obj) => obj.title.toLowerCase().indexOf(this.state.searchInput.toLowerCase()) != -1),
      searchInput: '',
    });
    event.preventDefault();
  }

  handleToggleWatch(movie) {
    movie.watched = !movie.watched;
    this.setState({
      //keep current status of movie category:
      //displayMovies: this.props.movies.filter(item => item.watched === !movie.watched),
      // go to the opposite category

      // displayMovies: this.state.defaultMovies.filter(item => item.watched === movie.watched),
      // b1Color: (movie.watched? '#C4EADA': 'white'),
      // b2Color: (movie.watched? 'white': '#C4EADA'),

      // stay on the current category
      displayMovies: this.state.defaultMovies.filter(item => item.watched === !movie.watched),
      b2Color: (movie.watched? '#C4EADA': 'white'),
      b1Color: (movie.watched? 'white': '#C4EADA'),
    });
  }

  handleToggleMovieCategory(response) {
    this.setState({
      displayMovies: this.state.defaultMovies.filter(movie => movie.watched === response),
      b1Color: (response? '#C4EADA': 'white'),
      b2Color: (response? 'white': '#C4EADA'),
    });
  }

  render() {
    const isMovieEmpty = this.state.displayMovies.length;

    const movielist = isMovieEmpty > 0 ? (
      <div>{this.state.displayMovies.map(movie => <MovieListItem movie={movie} handleToggleWatch={this.handleToggleWatch.bind(this)}/>)}</div>
    ) : (
      <p>No movie by that name found</p>
    );

    return (
      <div>
        <h1>Movie List</h1>
        <div className="addMovie">
          <AddMovie addInput={this.state.addInput} handleAdd={this.handleAdd.bind(this)} handleAddChange={this.handleChangeAdd.bind(this)}/>
        </div>
        <nav className="navBar">
          <div><Search searchInput={this.state.searchInput} handleSearch={this.handleSearch.bind(this)} handleSearchChange={this.handleChangeSearch.bind(this)}/></div>
        </nav>
        {/* <button>Sort By Rating</button> */}
        <button className="category" onClick={() => this.handleToggleMovieCategory(true)} style={{backgroundColor:this.state.b1Color}} >Watch</button>
        <button className="category" onClick={() => this.handleToggleMovieCategory(false)} style={{backgroundColor:this.state.b2Color}}>To Watch</button>
        {movielist}
      </div>
    );
  }
}