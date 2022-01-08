import React, { useEffect, useState } from 'react';
import { Nav, Login, Dashboard } from './components/index.js';
import ApiControler from './services/ApiControler.js';
import './Normalizer.css';
import './App.css';

let api = new ApiControler();
api.accessToken = "2308sdfijkds";

function App() {
  const [token, setToken] = useState(null);
  const [refresh, setRefresh] = useState(null);
  const [me, setMe] = useState({});

  let logout = () => {
    setToken(null);
    setRefresh(null);
    setMe({});
    localStorage.clear();
  }

	useEffect(() => {
    let ls = localStorage;
    let query = new URLSearchParams(window.location.search);

    if (query.has('token')) {
      setToken(query.get('token'));
      setRefresh(query.get('refresh'));

      ls.setItem('token', query.get('token'));
      ls.setItem('refresh', query.get('refresh'));

      window.history.pushState({}, document.title, "/");
    } else {
      let storedToken = ls.getItem('token');
      if (storedToken != null) {
        setToken(storedToken);
        setRefresh(ls.getItem('refresh'));
      }
    }
	}, [])

  useEffect(() => {
    if (token != null && me) {
      fetch(`http://localhost:5000/api/me?token=${token}`)
        .then(raw => raw.json())
        .then(json => {
          console.log(json);
          if (!json.error) {
            setMe(json);
          }
        })
        .catch(error => {
          logout();
        });
    }
  }, [token])

  return (
    <div className="App">
      <Nav token={token} user={me} logout={logout} />
      {me.username ? <Dashboard token={token} /> : <Login />}
    </div>
  );
}

export { api };
export default App;
