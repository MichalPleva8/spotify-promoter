import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Showcase, Promote, Home, Error } from 'components/index.js';
import ApiControler from 'services/ApiControler.js';
import 'styles/Normalizer.css';
import 'styles/App.css';

let api = new ApiControler();

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/promote' element={<Promote />} />
          <Route path='/showcase/:pid' element={<Showcase />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </Router>
      <div className="bg"></div>
    </div>
  );
}

export { api };
export default App;
