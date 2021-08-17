import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu } from 'antd';
import {
    AppstoreOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
} from '@ant-design/icons';

import '../assets/styles/NavMenu.less'
import logo from '../assets/images/logo.png'
const { SubMenu } = Menu;

class NavMenu extends Component {
    render() {
        const path = this.props.location.pathname;
        return (
            <div className="NavMenu">
                <div className="home-logo-box">
                    <img src={logo} alt="" />
                </div>
                <Menu
                    defaultSelectedKeys={[path]}
                    // defaultOpenKeys={['sub1','sub2']}
                    mode="inline"
                    theme="light"
                    className="Menu"
                >
                    <Menu.Item key="/home" icon={<PieChartOutlined />}>
                        <Link to="/home">首页</Link>
                    </Menu.Item>
                    <Menu.Item key="/user" icon={<DesktopOutlined />}>
                        <Link to="/user">用户管理</Link>
                    </Menu.Item>
                    <Menu.Item key="/role" icon={<ContainerOutlined />}>
                        <Link to="/role">角色管理</Link>

                    </Menu.Item>
                    <SubMenu key="sub1" icon={<MailOutlined />} title="商品管理">
                        <Menu.Item key="/product/list">
                            <Link to="/product/list">商品列表</Link>
                        </Menu.Item>
                        <Menu.Item key="/product/category">
                            <Link to="/product/category">商品分类</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<AppstoreOutlined />} title="统计列表">
                        <Menu.Item key="/chart/pie">
                            <Link to="/chart/pie">财报信息</Link>
                        </Menu.Item>
                        <Menu.Item key="/chart/line">
                            <Link to="/chart/line">销售数据</Link>
                        </Menu.Item>
                        <Menu.Item key="/chart/bar">
                            <Link to="/chart/bar">流水统计</Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}
export default withRouter(NavMenu);
