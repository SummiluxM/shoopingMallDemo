import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Breadcrumb } from 'antd';
import '../assets/styles/breadCrumb.less'
const breadCrumbNameMapping = {
    '/home': '首页',
    '/user': '用户管理',
    '/role': '角色管理',
    '/product': '商品管理',
    '/product/list': '商品列表',
    '/product/list/home': '商品列表主页',
    '/product/list/add':'商品添加',
    '/product/list/detail':'商品详情',
    '/product/category': '商品分类',
    '/chart': '统计列表',
    "/chart/pie": '财报信息',
    "/chart/line": '销售数据',
    "/chart/bar": '流水统计',

}
const BreadCrumbNav = withRouter((props) => {
    const { location } = props;
    const pathSnippets = location.pathname.split("/").filter((i) => i);
    const BreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
        return (
            <Breadcrumb.Item key={url}>
                <Link to={url} style={{color:'rgba(255, 255, 255)'}}>
                    {breadCrumbNameMapping[url]}
                </Link>
            </Breadcrumb.Item>
        );
    });
    return (
        <div className="Breadcrumb">
            <Breadcrumb className="crumb-item" style={{ margin: "16px 0" }}>
                {BreadcrumbItems}
            </Breadcrumb>
        </div>
    );
})
export default BreadCrumbNav;
