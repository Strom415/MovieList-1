import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './components/app.jsx';

var exampleMovies = [
    {title: 'Mean Girls', watched: true},
    {title: 'Hackers', watched: true},
    {title: 'The Grey', watched: false},
    {title: 'Sunshine', watched: true},
    {title: 'Ex Machina', watched: false}
];

ReactDOM.render(<App movies={exampleMovies}/>, document.getElementById('app'));

