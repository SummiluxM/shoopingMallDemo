import React, { Component } from 'react'
import {
    Form,
    Input,
    Button,
    message,
    Cascader,
    InputNumber
} from 'antd';
import UploadData from '../../../components/UploadData'
import '../../../assets/styles/addproduct.less'
import api from '../../../api/index'
const { TextArea } = Input;
const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 10,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 4,
        span: 10,
    },
};


export default class addproduct extends Component {
    state = {
        loading: false,
        options: [],
        imgSrc: '',
        typeId: null,
    };
    formRef = React.createRef();
    componentDidMount() {
        this.getCascader();
    }
    getCascader = async () => {
        const res = await api.category.findAllCategroy();
        res.data.map((item) => {
            if (item.children.length === 0) {
                item.disabled = true;
            }
            return item
        })
        this.setState({
            options: res.data
        })
    }
    //NOTE 表单提交
    onFinish = async (values) => {
        values.price = Number(values.price)
        values.imgSrc = this.state.imgSrc
        values.type = this.state.typeId;
        const res = await api.goods.addGoods(values)
        if (res.code === 1) {
            message.success('添加成功');
            this.props.history.push('/product/list/home')

        } else {
            message.error('添加失败');
        }

    };
    //NOTE 表单重置
    onReset = () => {
        this.formRef.current.resetFields();
    };
    //NOTE 级联选择
    onChange = (file, value) => {
        if (value.length === 2) {
            this.setState({
                typeId: value[value.length - 1].id
            })
        } else {
            message.error("请选择二级分类")
        }
    }
    //NOTE 图片上传
    setImgSrc = (imgSrc) => {
        this.setState({
            imgSrc
        })
    }

    render() {
        return (
            <div className="formBase">
                <div className="formHead">
                    <div><h1>添加商品</h1></div>
                    <div>
                        <Button type="primary" shape="round">返回列表</Button>
                    </div>
                </div>
                <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
                    <Form.Item
                        name="name"
                        label="商品名称"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input placeholder="请输入商品名" />
                    </Form.Item>
                    <Form.Item
                        name="title"
                        label="商品标题"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <TextArea placeholder="请输入商品描述" />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="商品价格"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <InputNumber placeholder="请输入商品价格" />
                    </Form.Item>
                    <Form.Item
                        name="type"
                        label="分类"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Cascader
                            options={this.state.options}
                            onChange={this.onChange}
                            placeholder="请选择商品分类" />
                    </Form.Item>
                    <Form.Item
                        name="imgSrc"
                        label="上传图片:"
                    >
                        <UploadData setImgSrc={this.setImgSrc}></UploadData>
                    </Form.Item>
                    <Form.Item
                        name="msg"
                        label="商品描述"
                    >
                        <TextArea />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button htmlType="button" onClick={this.onReset}>
                            Reset
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
