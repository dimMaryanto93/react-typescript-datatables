import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Body from './container/Body'

function App() {
    return (
        <div className="container">
            <Body/>

            <footer>
                version: {process.env.REACT_APP_VERSION} @Copyright 2020
            </footer>
        </div>
    );
}

export default App;
