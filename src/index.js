import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './components/app.jsx';

var exampleMovies = [
    {title: 'Mean Girls', watched: false},
    {title: 'Hackers', watched: true},
    {title: 'The Grey', watched: false},
    {title: 'Sunshine', watched: false},
    {title: 'Ex Machina', watched: false}
];

ReactDOM.render(<App movies={[]}/>, document.getElementById('app'));

