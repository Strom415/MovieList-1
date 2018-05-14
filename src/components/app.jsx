import React from 'react';
import MovieListItem from './movieItem.jsx';
import Search from './searchBar.jsx';
import AddMovie from './addmovieBar.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCategory: false,
      displayMovies: props.movies,
      searchInput: '',
      addInput:'',
      b1Color: 'white', 
      b2Color: 'white',
    };
  }

  handleAdd() {
    this.props.movies.push({title: this.state.addInput, watched: false});
    this.setState({
      displayMovies: this.props.movies.filter(movie => movie.watched === false),
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
      displayMovies : this.state.displayMovies.filter((obj) => obj.title.toLowerCase().indexOf(this.state.searchInput.toLowerCase()) != -1),
      searchInput: '',
    });
    event.preventDefault();
  }

  handleToggleWatch(movie) {
    movie.watched = !movie.watched;
    this.setState({
      displayMovies: this.props.movies.filter(item => item.watched === movie.watched),
      b1Color: (movie.watched? '#C4EADA': 'white'),
      b2Color: (movie.watched? 'white': '#C4EADA'),
    });
  }

  handleToggleMovieCategory(response) {
    this.setState({
      displayMovies: this.props.movies.filter(movie => movie.watched === response),
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
        <button className="category" onClick={() => this.handleToggleMovieCategory(true)} style={{backgroundColor:this.state.b1Color}} >Watch</button>
        <button className="category" onClick={() => this.handleToggleMovieCategory(false)} style={{backgroundColor:this.state.b2Color}}>To Watch</button>
        {movielist}
      </div>
    );
  }
}