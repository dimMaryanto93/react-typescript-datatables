import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HalamanUtama from "./container/Body";

function App() {
    return (
        <div className="container">
            <HalamanUtama/>

            <footer>
                version: {process.env.REACT_APP_VERSION} @Copyright 2020
            </footer>
        </div>
    );
}

export default App;
