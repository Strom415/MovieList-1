import React from 'react';
import MovieListItem from './movieItem.jsx';
import Search from './searchBar.jsx';
import AddMovie from './addmovieBar.jsx';

export default class App extends React.Component {
  constructor(props) {
    console.log(props.movies);
    super(props);
    this.state = {
      displayMovies: props.movies,
      searchInput: '',
      addInput:'',
    };
  }

  handleAdd() {
    this.props.movies.push({title: this.state.addInput, watched: false});
    this.setState({
      displayMovies: this.props.movies,
      addInput:'',
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
      displayMovies : this.props.movies.filter((obj) => obj.title.toLowerCase().indexOf(this.state.searchInput.toLowerCase()) != -1),
      searchInput: '',
    });
    event.preventDefault();
  }

  handleToggleWatch(movie) {
    this.props.movies[this.props.movies.indexOf(movie)]['watched'] = !movie.watched;
    this.setState({
      displayMovies: this.props.movies,
    });
  }

  handleToggleMovie(response) {
    this.setState({
      displayMovies: this.props.movies.filter((movie) => movie.watched === response)
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
        <button onClick={() => this.handleToggleMovie(true)}>Watch</button>
        <button onClick={() => this.handleToggleMovie(false)}>To Watch</button>
        {movielist}
      </div>
    );
  }
}