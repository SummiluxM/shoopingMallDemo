import React, { Component } from 'react'
import { Table, Space, Select, Input, Button, message, Switch } from 'antd';
import { Link } from 'react-router-dom';
import api from '../../../api/index'
import "../../../assets/styles/category.less"
export default class productHOME extends Component {
    
    state = {
        columns: [
            {
                title: '商品ID',
                dataIndex: '_id',
                key: '_id',
            },
            {
                title: '商品名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'msg',
                key: 'msg',
                ellipsis: true,
            },
            {
                title: '商品价格',
                dataIndex: 'price',
                key: 'price',
                render: price => {
                    return '￥' + price;
                }
            },
            {
                title: '商品分类',
                dataIndex: 'type',
                key: 'type',
                render: type => {
                    return type.name;
                }
            },
            {
                title: '商品状态',
                dataIndex: 'state',
                key: 'state',
                render: (state,data) => (
                    <Switch 
                    checkedChildren="上架" 
                    unCheckedChildren="下架" 
                    defaultChecked={state===1} 
                    onChange={(checked)=>{this.handleSwitch(checked,data)}}
                    />
                )
            },
            {
                title: 'Action',
                dataIndex: "_id",
                key: 'action',
                width: 300,
                render: (id, data) => (
                    <Space size="middle">
                        <Link to={{pathname:"/product/list/detail",state:{data}}}>
                            <Button type="primary">查看详情</Button>
                        </Link>
                        <Button onClick={() => this.clickEdit(data)}>编辑</Button>
                        <Button type="primary" danger onClick={() => this.delete(id)}>删除</Button>
                    </Space>
                ),
            },
        ],
        data: [],
        searchType:null,
        searchData:null,
    }
    componentDidMount() {
        this.fetchData()
    }
    fetchData = async () => {
        const res = await api.goods.findGoods();
        const newData = res.data.map((item, index) => {
            item.key = item._id;
            return item
        })
        this.setState({
            data: newData
        })
    }
    delete = async (id) => {
        const res = await api.goods.deleteGoods({id})
        if (res.code === 1) {
            message.success('删除成功')
            this.fetchData()
        }
    }
    handleSwitch = (checked,data) => {
        console.log(checked,data);
    }
    searchData =  async() => {
        const res = await api.goods.findGoodsByName({
            searchType: this.state.searchType,
            searchData: this.state.searchData
        });
        if (res.code === 1) {
            message.success('搜索成功')
        }
        const data = res.data.map((item, index) => {
            item.key = item._id;
            return item
        })
        this.setState({
            data: data
        })
    }
    
    searchDOM = () => {
        const { Option } = Select;
        return (
            <div className="tableHead">
                <div>
                    <Select
                        // value={this.state.searchType}
                        style={{
                            width: 200,
                            margin: '0 8px',
                        }}
                        placeholder="选择搜索类型"
                        defaultValue={'name'}
                        onChange={value => this.setState({ searchType:value })}
                    >
                        <Option value="name">商品名称</Option>
                        <Option value="title">商品描述</Option>
                    </Select>
                    <Input
                        type="text"
                        // value={this.state.searchDate}
                        placeholder="输入搜索内容"
                        onChange={e => this.setState({ searchData: e.target.value })}
                        style={{
                            width: 200,
                            margin: '0 15px',
                        }}
                    />
                    <Button type="primary" onClick={this.searchData}>搜索</Button>
                </div>
                <div>
                <Link to="/product/list/add"><Button type="primary">添加</Button></Link>
                    
                </div>
            </div>
        )
    }
    render() {
        const { columns, data } = this.state;
        return (
            <div className="tableContainer">
                <Table
                    title={this.searchDOM}
                    columns={columns}
                    dataSource={data}
                    pagination={{ pageSize: 6 }}
                    // scroll={{ y: "550px" }}
                    bordered
                />
            </div>
        )
    }
}
