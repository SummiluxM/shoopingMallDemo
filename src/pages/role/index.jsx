import React, { Component } from 'react'
import { Table, Space, Tag, Button, message, Modal, Form, Input } from 'antd';
import Authrization from '../../components/Authrization';
import api from '../../api/index'
import "../../assets/styles/category.less"
export default class index extends Component {
    state = {
        columns: [
            {
                title: '角色名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '创建时间',
                key: 'createDate',
                dataIndex: 'createDate',
                render: tags => (
                    <>
                        <Tag color={tags ? "purple" : "volcano"}>{tags ? `${tags}` : "未设置"}</Tag>
                    </>
                ),
            },
            {
                title: '授权人',
                dataIndex: 'authUser',
                key: 'authUser',
                render: tags => (
                    <>
                        <Tag color={tags ? "purple" : "volcano"}>{tags ? `${tags}` : "未设置,请授权"}</Tag>
                    </>
                ),
            },
            {
                title: '授权时间',
                key: 'authTime',
                dataIndex: 'authTime',
                render: tags => (
                    <>
                        <Tag color={tags ? "purple" : "volcano"}>{tags ? `${tags}` : "未设置,请授权"}</Tag>
                    </>
                ),
            },
            {
                title: '操作',
                dataIndex: "_id",
                key: 'action',
                render: (id, data) => (
                    <Space size="middle">
                        <Button onClick={() => this.auth(data)}>权限</Button>
                        <Button type="primary" danger onClick={() => this.delete(id)}>删除</Button>
                    </Space>
                ),
            },
        ],
        roleData: [],
        hidden: true,
        addVisible: false,
    }
    componentDidMount() {
        this.fetchRole();

    }
    //NOTE 数据请求并渲染
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
                    <Button type="primary" onClick={() => this.clickAddButton()}>添加角色</Button>
                </div>
            </div>
        )
    }

    auth = (id) => {
        this.setState({
            hidden: false,
            roleId: id
        })
    }
    //NOTE 授权组件关闭
    setModalHidden = (res, msg) => {
        if (res) {
            this.setState({
                hidden: true
            })
            this.fetchRole();
        }

    }
    //NOTE 模态框关闭
    hideAddModal = () => {
        this.setState({
            addVisible: false
        })
    }
    //NOTE 点击添加按钮弹出模态框
    clickAddButton = () => {
        this.setState({
            addVisible: true
        })
    }
    //NOTE 添加分类
    onAddFinish = async (values) => {
        const res = await api.roles.addRoles(values);
        if (res.code === 1) {
            message.success('添加成功');
            this.fetchRole();
            this.hideAddModal();
        } else {
            message.error('添加失败')
        }
    }

    //NOTE 删除分类
    delete = async (id) => {
        const res = await api.roles.deleteRoles({ id });
        if (res.code === 1) {
            message.success('删除成功');
            this.fetchRole()
        } else {
            message.error('删除失败');
        }
    }

    render() {
        const { columns, roleData } = this.state;
        return (
            <div className="tableContainer">
                <Table
                    title={this.listLevel}
                    columns={columns}
                    dataSource={roleData}
                    pagination={{ pageSize: 6 }}
                    bordered
                />
                {this.state.hidden ? null : <Authrization setModalHidden={this.setModalHidden} roleId={this.state.roleId}></Authrization>}
                <Modal
                    title={"添加"}
                    visible={this.state.addVisible}
                    onCancel={this.hideAddModal}
                    footer={<></>}
                >
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        onFinish={this.onAddFinish}
                    >
                        <Form.Item
                            label="角色名称"
                            name="name"
                            rules={[{ required: true, message: '请输入角色名称' }]}
                        >
                            <Input
                                placeholder={`请输入角色名称`} />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit" style={{ marginRight: "20px" }}>
                                {"添加"}
                            </Button>
                            <Button htmlType="button" onClick={this.hideAddModal}>
                                重置
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}
