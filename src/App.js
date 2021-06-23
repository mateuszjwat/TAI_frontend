import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import NavigationBar from './components/NavigationBar';
import Profile from './components/Profile';
import Login from './components/Login/Login';
import SignUp from './components/Login/SignUp';
import MyChildren from './components/Parents/MyChildren';

import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from 'react';
import ChildSite from './components/Parents/ChildSite';
import Duties from './components/Children/Duties';


function App() {
  
  const [user, setUser] = useState(null);
  const [child, setChild] = useState(null);

  return (
    <div className="App">
      <Router>
        <NavigationBar user={user}/>
        <Route path="/login">
          <Login user={user} setUser={setUser}/>
        </Route>
        <Route path="/signUp">
          <SignUp user={user} setUser={setUser}/>
        </Route>
        <Route exact path="/">
          <Home user={user}/>
        </Route>
        <Route path="/profile">
          <Profile user={user} setUser={setUser}/>
        </Route>
        <Route path="/myChildren">
          <MyChildren user={user} setChild={setChild}/>
        </Route>
        <Route path="/childSite">
          <ChildSite user={user} child={child} setChild={setChild}/>
        </Route>
        <Route path="/duties">
          <Duties user={user}/>
        </Route>
      </Router>
    </div>
  );
}

export default App;