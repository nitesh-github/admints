import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import RoutesConfig from './routes/RoutesConfig';


function App() {
  return (
    <Router>
      <RoutesConfig></RoutesConfig>
    </Router>
  );
}

export default App;
