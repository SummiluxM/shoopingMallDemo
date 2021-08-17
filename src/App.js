import React, { Component } from 'react'
// import { Button } from 'antd'
import {BrowserRouter,Switch,Route,Redirect} from "react-router-dom"

import Home from "./pages/home/index"
import Login from "./pages/login/index"
import ErrPage from './pages/error/error404'
export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Redirect from="/" to="/login" exact></Redirect>
            <Route path="/login" component={Login}></Route>
            <Route path="/" component={Home}></Route>
            <Route path="/error" component={ErrPage}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

