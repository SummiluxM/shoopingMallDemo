import React, { Component } from 'react'
import { Table, Space, Form, Input, Button, Modal, message, Select } from 'antd';
import api from '../../api/index'
import "../../assets/styles/category.less"
const { Option } = Select;
export default class index extends Component {
    state = {
        columns: [
            {
                title: '用户名称',
                dataIndex: 'account',
                key: 'account',
            },
            {
                title: '用户邮箱',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: '用户角色',
                dataIndex: 'role',
                key: 'role',
                render: (role) => {
                    return role.name;
                }
            },
            {
                title: 'Action',
                dataIndex: "_id",
                key: 'action',
                render: (id, data) => (
                    <Space size="middle">
                        {/* <Button onClick={() => this.clickEdit(data)}>编辑</Button> */}
                        <Button type="primary" danger onClick={() => this.delete(id)}>删除</Button>
                    </Space>
                ),
            },
        ],
        data: [],
        roleData: [],
        visible: false,
        editOrAdd: true,
        currentID: null,
    }
    componentDidMount() {
        this.fetchData();
        this.fetchRole();

    }
    //NOTE 数据请求并渲染
    fetchData = async () => {
        const res = await api.user.getAccountList();
        const newData = res.data.map((item, index) => {
            item.key = item._id;
            return item
        })
        this.setState({
            data: newData
        })
    }
    fetchRole = async () => {
        const res = await api.roles.findRoles();
        const newData = res.data.map((item, index) => {
            item.key = item._id;
            return item
        });
        this.setState({
            roleData: newData
        })
    }
    listLevel = () => {
        return (
            <div className="tableHead">
                <div><h3>商品分类</h3></div>
                <div>
                    <Button type="primary" onClick={() => this.clickAddButton()}>添加用户</Button>
                </div>
            </div>
        )
    }
    //NOTE 点击新增分类
    clickAddButton = () => {
        this.setState({
            editOrAdd: true,
            currentID: null
        })
        this.show();
    }
    clickEdit = (data) => {
        this.setState({
            editOrAdd: false,
            currentID: data
        })
        this.show();
        console.log(data);
    }
    //NOTE 添加或编辑表单填写
    onFinish = (values) => {
        if (this.state.editOrAdd) {
            this.add(values)
        } else {
            this.edit(values)
        }
        this.hideModal();
    };
    add = async (values) => {
        const res = await api.user.accountadd(values);
        if (res.code === 1) {
            message.success('添加成功');
            this.fetchData()
        } else {
            message.error('添加失败')
        }
    }
    edit = async (values) => {
        // values.id = this.state.currentID;
        // const res = await api.category.updateCategroy(values);
        // if (res.code === 1) {
        //     message.success('编辑成功');
        //     const list = this.state.listID;
        //     const listId = list[list.length - 1];
        //     this.fetchData(listId)
        // } else {
        //     message.error('编辑失败')
        // }
    }
    //NOTE 删除分类
    delete = async (id) => {
        console.log(id);
        const res = await api.user.delAccount(id);
        console.log(res);
        if (res.code === 1) {
            message.success('删除成功');
            this.fetchData()
        } else {
            message.error('删除失败');
        }
    }
    //NOTE 模态框显示控制
    hideModal = () => {
        this.setState({
            visible: false,
        })
    }
    show = () => {
        this.setState({
            visible: true,
        })
    }
    selectChange = () => {

    }
    render() {
        const { columns, data, visible } = this.state;
        return (
            <div className="tableContainer">
                <Table
                    title={this.listLevel}
                    columns={columns}
                    dataSource={data}
                    pagination={{ pageSize: 6 }}
                    bordered
                />
                <Modal
                    title={this.state.editOrAdd ? "添加" : "编辑"}
                    visible={visible}
                    onCancel={this.hideModal}
                    footer={<></>}
                >
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                    >
                        <Form.Item
                            label="用户名"
                            name="account"
                            rules={[{ required: true, message: '请输入用户名' }]}
                        // initialValue={this.state.currentID ? this.state.currentID.account : ''}
                        >
                            <Input
                                placeholder={'请输入用户名'}
                            />
                        </Form.Item>
                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[{ required: true, message: '请输入密码' }]}
                        // initialValue={this.state.currentID ? this.state.currentID.password : ''}
                        >
                            <Input.Password
                                placeholder={'请输入密码'}
                            />
                        </Form.Item>
                        <Form.Item
                            label="邮箱"
                            name="email"
                            rules={[{ required: true, message: '请输入邮箱' }]}
                        // initialValue={this.state.currentID ? this.state.currentID.email : ''}
                        >
                            <Input
                                placeholder={'请输入邮箱'}
                            />
                        </Form.Item>
                        <Form.Item
                            label="角色"
                            name="role"
                            rules={[{ required: true, message: '请选择角色' }]}

                        >
                            <Select
                                placeholder="请选择角色"
                                onChange={this.selectChange()}
                                allowClear

                            >
                                {this.state.roleData.map(item => {
                                    return <Option key={item._id} value={item._id}>{item.name}</Option>
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit" style={{ marginRight: "20px" }}>
                                {this.state.editOrAdd ? "添加" : "编辑"}
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
