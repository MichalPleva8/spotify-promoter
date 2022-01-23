import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Nav, Login, Showcase, Promote, Home, Error } from './components/index.js';
import ApiControler from './services/ApiControler.js';
import './Normalizer.css';
import './App.css';

let api = new ApiControler();

function App() {
  const [me, setMe] = useState({});
  const [playlists, setPlaylists] = useState([]);
  const [playlistOffset, setPlaylistsOffset] = useState(0);

  // let playlistLimit = 15;

  // let path;
  // window.onload = async () => {
  //   path = window.location.pathname;
  //   await api.getToken();

  //   if (api.accessToken != "" && path === "/") {
  //     api.getMe()
  //       .then(result => setMe(result))
  //       .catch(error => console.error(error));
  //   }

  //   if (api.accessToken != "" && path === "/promote") {
  //     api.getMyPlaylists(playlistLimit, playlistOffset)
  //       .then(result => {setPlaylists(result); console.dir(result);})
  //       .catch(error => console.error(error));
  //   }
  // }

  // let loadPlaylists = () => {
  //   setPlaylistsOffset(playlistOffset + playlistLimit);
  // }


  let logout = () => {
    // api.logout();
    // setMe({});
  }

  return (
    <div className="App">
      <Router>
        {/* {<Nav user={me} logout={logout} />} */}
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
