import React, { Component } from 'react';
import { Switch, Route,} from 'react-router-dom';
// import Home from '../page/home/index.jsx';
// import Kind from '../page/kind/index.jsx';
import {routerConfig} from '../routes/router.config.js'


class Com extends Component {
  render() {
    return (
      <div className="App" style={{height: "100%"}}>
        <Switch>
          {
            routerConfig.map((item,index)=>{
              return <Route key={item.path} path={item.path} component={item.component} />
            })
          }
        </Switch>
      </div>
    );
  }
}

export default Com;