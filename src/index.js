import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router} from 'react-router-dom';
//Router is a context provider

ReactDOM.render(
    <Router>
        <App />
    </Router>, 
    document.getElementById('root')
);
