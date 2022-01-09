import React, { useState } from 'react';
import { Nav, Login, Dashboard } from './components/index.js';
import ApiControler from './services/ApiControler.js';
import './Normalizer.css';
import './App.css';

let api = new ApiControler();

function App() {
  const [me, setMe] = useState({});

  window.onload = async () => {
    await api.getToken();

    if (api.accessToken != "") {
      api.getMe()
        .then(result => setMe(result))
        .catch(error => console.error(error));
    }
  }

  let logout = () => {
    api.logout();
    setMe({});
  }

  return (
    <div className="App">
      <Nav user={me} logout={logout} />
      {me.username ? <Dashboard /> : <Login />}
    </div>
  );
}

export { api };
export default App;
