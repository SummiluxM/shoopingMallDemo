import React, { Component } from 'react'
import { Modal, Tree, Form, Button, message } from 'antd'
import api from '../api/index'
const treeData = [
    {
        title: '首页',
        key: '/home',
    },
    {
        title: '用户',
        key: '/user',
    },
    {
        title: '角色',
        key: '/role',
    },
    {
        title: '商品信息',
        key: '/product',
        children: [
            {
                title: '商品列表',
                key: '/product/list'
            },
            {
                title: '商品分类',
                key: '/product/category'
            },
        ],
    },
    {
        title: '统计列表',
        key: '/chart',
        children: [
            {
                title: '财务信息',
                key: '/chart/line',
            },
            {
                title: '销售数据',
                key: '/chart/bar',
            },
            {
                title: '流水信息',
                key: '/chart/pie',
            },
        ],
    }
]

export default class Authrization extends Component {

    state = {
        visible: false,
        checkedList: [],
        userInfo: null
    }

    componentDidMount() {
        const menus = this.props.roleId.menus;
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        console.log(this.props.roleId);
        this.setState({
            visible: true,
            checkedList: menus,
            userInfo
        })

    }

    //NOTE 模态框显示控制
    hideModal = () => {
        this.setState({
            visible: false,
        })
        this.props.setModalHidden(true);
    }
    onCheck = (val) => {
        this.setState({
            checkedList: val,
        })
    }

    onSelect = (val) => {
        console.log('sel', val);
    }

    onFinish = async () => {
        const val = {};
        val.id = this.props.roleId._id;
        val.authTime = this.getTime();
        val.authUser = this.state.userInfo.role.authUser;
        val.menus = this.state.checkedList;
        console.log(val);
        const res = await api.roles.addAuth(val);
        if (res.code === 1) {
            this.hideModal();
            message.success("授权成功");
        } else {
            this.hideModal();
            message.error("授权失败");
        }

    }

    //getTime
    getTime = () => {
        const time = new Date();
        const year = time.getFullYear();
        const month = time.getMonth() + 1;
        const day = time.getDate();
        const hour = time.getHours();
        const minute = time.getMinutes();
        const second = time.getSeconds();
        return `${year}-${month}-${day}-${hour}:${minute}:${second}`;
    }

    render() {
        return (
            <div>
                <Modal
                    title={"角色授权"}
                    visible={this.state.visible}
                    onCancel={this.hideModal}
                    footer={<></>}
                >
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        onFinish={this.onFinish}
                    >
                        <Tree
                            checkable
                            onCheck={this.onCheck}
                            onSelect={this.onSelect}
                            treeData={treeData}
                            defaultExpandAll={true}
                            defaultCheckedKeys={this.state.checkedList}
                        />
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit" style={{ marginRight: "20px" }}>
                                {"授权"}
                            </Button>
                            <Button htmlType="button" onClick={this.onReset}>
                                重置
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}
