import React, { Component } from 'react'
import '../../assets/styles/productList.less'
import {Switch,Route,Redirect} from 'react-router-dom'
import ProductHome from './sub/productHOME'
import ProductDetail from './sub/detailproduct'
import ProductAdd from './sub/addproduct'

export default class list extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Redirect from="/product/list" to="/product/list/home" exact></Redirect>
                    <Route path="/product/list/home" component={ProductHome}></Route>
                    <Route path="/product/list/detail" component={ProductDetail}></Route>
                    <Route path="/product/list/add" component={ProductAdd}></Route>
                </Switch>
            </div>
        )
    }
}
