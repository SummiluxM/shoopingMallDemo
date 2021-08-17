import React, { Component } from 'react'
import { Layout } from 'antd';
import '../../assets/styles/home.less'
import NavMenu from '../../components/NavMenu.jsx'
import HeaderInfo from '../../components/Header'
import FooterInfo from '../../components/footer'
import { Switch, Route } from "react-router-dom"
import Breadcrumb from '../../components/BreadCrumbNav';
import Loading from '../../components/loading'
const Main = React.lazy(() => import('../main'))
const User = React.lazy(() => import('../user'))
const Role = React.lazy(() => import('../role'))
const ProductList = React.lazy(() => import('../product/list'))
const ProductCategory = React.lazy(() => import('../product/category'))
const Pie = React.lazy(() => import('../chart/pie'))
const Line = React.lazy(() => import('../chart/line'))
const Bar = React.lazy(() => import('../chart/pie'))

const { Header, Footer, Sider, Content } = Layout;

export default class index extends Component {
    render() {
        return (
            <Layout className="home-layout">
                <Sider className='sider'>
                    <NavMenu></NavMenu>
                </Sider>
                <Layout>
                    <Header>
                        <HeaderInfo></HeaderInfo>
                    </Header>
                    <Breadcrumb></Breadcrumb>
                    <Content  className="Content">
                        <React.Suspense fallback={<Loading></Loading>}>
                            <Switch>
                                <Route exact path="/home" component={Main}></Route>
                                <Route path='/user' component={User}></Route>
                                <Route path='/role' component={Role}></Route>
                                <Route path='/product/list' component={ProductList}></Route>
                                <Route path='/product/category' component={ProductCategory}></Route>
                                <Route path='/chart/pie' component={Pie}></Route>
                                <Route path='/chart/line' component={Line}></Route>
                                <Route path='/chart/bar' component={Bar}></Route>
                            </Switch>
                        </React.Suspense>
                    </Content>
                    <Footer>
                        <FooterInfo></FooterInfo>
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}
