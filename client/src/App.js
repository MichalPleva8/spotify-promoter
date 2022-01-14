import React, { useState, useEffect } from 'react';
import { Nav, Login, Showcase, Promote } from './components/index.js';
import ApiControler from './services/ApiControler.js';
import './Normalizer.css';
import './App.css';

let api = new ApiControler();

function App() {
  const [me, setMe] = useState({});
  const [playlists, setPlaylists] = useState([]);
  const [playlistOffset, setPlaylistsOffset] = useState(0);

  let playlistLimit = 15;

  let path;
  window.onload = async () => {
    path = window.location.pathname;
    await api.getToken();

    if (api.accessToken != "" && path === "/") {
      api.getMe()
        .then(result => setMe(result))
        .catch(error => console.error(error));
    }

    if (api.accessToken != "" && path === "/promote") {
      try {
        api.getMyPlaylists(playlistLimit, playlistOffset)
          .then(result => {setPlaylists(result); console.dir(result);})
          .catch(error => console.error(error));
      } catch (error) {
        alert('Invalid Token');
      }
    }
  }

  let loadPlaylists = () => {
    setPlaylistsOffset(playlistOffset + playlistLimit);
  }

  let logout = () => {
    api.logout();
    setMe({});
  }

  let renderView = () => {
    let view, path = window.location.pathname;

    if (path === '/' && me.username) {
      view = <Showcase />
    } else if (path === '/promote' && playlists.length > 0) {
      view = <Promote playlists={playlists} loadPlaylists={loadPlaylists} />
    } else {
      view = <Login />
    }

    return view;
  }

  return (
    <div className="App">
      {me.username && <Nav user={me} logout={logout} />}
      {renderView()}
      {/* {me.username ? <Showcase /> : <Login />} */}
      {/* {playlists.length > 0 && <Promote playlists={playlists} />} */}
      <div className="bg"></div>
    </div>
  );
}

export { api };
export default App;
