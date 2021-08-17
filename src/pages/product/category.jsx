import React, { Component } from 'react'
import { Table, Tag, Space, Form, Input, Button, Modal, message } from 'antd';
import api from '../../api/index'
import "../../assets/styles/category.less"
export default class category extends Component {
    state = {
        columns: [
            {
                title: '分类ID',
                dataIndex: '_id',
                key: '_id',
            },
            {
                title: '分类名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '分类类型',
                dataIndex: 'type',
                key: 'type',
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
                title: '修改时间',
                key: 'updateDate',
                dataIndex: 'updateDate',
                render: tags => (
                    <>
                        <Tag color={tags ? "purple" : "volcano"}>{tags ? `${tags}` : "未设置"}</Tag>
                    </>
                ),
            },
            {
                title: 'Action',
                dataIndex: "_id",
                key: 'action',
                render: (id, data) => (
                    <Space size="middle">
                        <Button type="primary" onClick={() => this.showNext(id)}>查看下一级</Button>
                        <Button onClick={() => this.clickEdit(data)}>编辑</Button>
                        <Button type="primary" danger onClick={() => this.delete(id)}>删除</Button>
                    </Space>
                ),
            },
        ],
        data: [],
        listID: [0],
        backButton: true,
        levelFlag: 0,
        visible: false,
        editOrAdd: true,
        categoryName: '请输入分类名',
        currentID: 0,
    }
    //NOTE 默认渲染
    componentDidMount() {
        this.fetchData(0)

    }
    //NOTE 数据请求并渲染
    fetchData = async (id) => {
        const res = await api.category.findCategroy(id);
        const newData = res.data.data.map((item, index) => {
            item.key = item._id;
            return item
        })
        this.setState({
            data: newData
        })
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
    //NOTE 点击新增分类
    clickAddButton = () => {
        this.setState({
            editOrAdd: true,
            categoryName: "请输入分类名",
            currentID: 0
        })
        this.show();
    }
    add = async (values) => {
        const list = this.state.listID;
        const listId = list[list.length - 1];
        values.parentId = listId;
        values.type = list.length + "级分类";
        const res = await api.category.addCategroy(values);
        if (res.code === 1) {
            message.success('添加成功');
            const list = this.state.listID;
            const listId = list[list.length - 1];
            this.fetchData(listId)
        } else {
            message.error('添加失败')
        }
    }
    //NOTE 点击分类编辑
    clickEdit = (data) => {
        this.setState({
            editOrAdd: false,
            categoryName: data.name,
            currentID: data._id
        })
        this.show();
    }
    edit = async (values) => {
        values.id = this.state.currentID;
        const res = await api.category.updateCategroy(values);
        if (res.code === 1) {
            message.success('编辑成功');
            const list = this.state.listID;
            const listId = list[list.length - 1];
            this.fetchData(listId)
        } else {
            message.error('编辑失败')
        }
    }
    onFinishFailed = (errorInfo) => {
        message.error('请重试');
    };

    //NOTE 删除分类
    delete = async (id) => {
        const res = await api.category.deleteCategroy({ id });
        if (res.code === 1) {
            message.success('删除成功');
            const list = this.state.listID;
            const listId = list[list.length - 1];
            this.fetchData(listId)
        } else {
            message.error('删除失败');
        }
    }
    //NOTE 分类子表格控制
    showNext = (id) => {
        const listId = this.state.listID;
        listId.push(id)

        this.fetchData(id);
        this.setState({
            listId,
            levelFlag: this.state.levelFlag + 1
        })
    }
    backBefore = () => {
        const listId = this.state.listID;
        listId.pop()
        const lastID = listId[listId.length - 1];
        this.fetchData(lastID)
        this.setState({
            listId,
            levelFlag: this.state.levelFlag - 1
        })
    }
    listLevel = () => {
        return (
            <div className="tableHead">
                <div><h3>商品分类</h3></div>
                <div>{this.state.levelFlag !== 0 ? (<Button shape="round" onClick={() => this.backBefore()} style={{ marginRight: "20px" }}>返回</Button>) : (<></>)
                }
                    <Button type="primary" onClick={() => this.clickAddButton()}>添加分类</Button>
                </div>
            </div>
        )
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

    render() {
        const { columns, data, visible } = this.state;
        return (
            <div className="tableContainer">

                <Table
                    title={this.listLevel}
                    columns={columns}
                    dataSource={data}
                    pagination={{ pageSize: 6 }}
                    // scroll={{ y: "550px" }}
                    bordered
                />

                <Modal
                    title={`${this.state.editOrAdd ? "添加" : "编辑"}至${this.state.listID.length}级分类`}
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
                            label="分类名称"
                            name="name"
                            rules={[{ required: true, message: '请输入商品名称' }]}
                        >
                            <Input
                                placeholder={`${this.state.categoryName}`} />
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
