import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios'
import 'bootswatch/dist/sketchy/bootstrap.min.css';
import Group from './components/Group.js';
import Sheet from './components/Sheet.js';
import New from './components/New.js'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route
          path={`/groups/:slug`}
          component={Group}
        />
        <Route
          path={'/sheets'}
          component={Sheet}
        />
        <Route
          path={'/new'}
          component={New}
        />
      </Switch>
    </div>
  );
}

export default App;