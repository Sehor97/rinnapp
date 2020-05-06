import React from 'react';
import './App.css';
import Crud from './crud';
function App() {

  return (
    <div className="App">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <h1>RinApp</h1>
      </nav>
      <div className="container">
        <Crud/>
      </div>
    </div>
  );
}

export default App;
