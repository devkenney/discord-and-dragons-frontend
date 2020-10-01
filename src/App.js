import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios'
import 'bootswatch/dist/sketchy/bootstrap.min.css';
import Group from './components/Group.js';
import Sheet from './components/Sheet.js';
import EditInfo from './components/EditInfo.js'
import EditCombat from './components/EditCombat.js'

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
          path={'/edit/info'}
          component={EditInfo}
        />
        <Route
          path={'/edit/combat'}
          component={EditCombat}
        />
      </Switch>
    </div>
  );
}

export default App;