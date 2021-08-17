import React, { Component } from 'react'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../../assets/styles/login.less'
import logo from '../../assets/images/logo.png'
// import { login } from '../../api/user';
import api from '../../api/index'

export default class index extends Component {
    onFinish = async (values) => {
        console.log(values);
        const res = await api.user.login(values)
        console.log(res);
        if (res.code === 1) {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userInfo', JSON.stringify(res.data.userInfo));
            message.success('登录成功！');
            this.props.history.push('/home')
        } else {
            message.error('登录失败！检查账户名和密码');
        }

    };
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    render() {
        return (
            <div className="container">

                <div className="login-box">
                    <div className="logo">
                        <img src={logo} alt="" />
                    </div>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="account"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名!',
                                }, {
                                    min: 6,
                                    message: "用户名至少6位！"
                                }, {
                                    max: 10,
                                    message: "用户名不能超过10位！"
                                }, {
                                    pattern: /^[a-zA-Z0-9_]*$/,
                                    message: "6-10位字母、数字、下划线！"
                                }
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码!',
                                },
                                {
                                    min: 6,
                                    message: "密码至少6位！"
                                }, {
                                    max: 10,
                                    message: "密码不能超过10位！"
                                },
                                {
                                    pattern: /^[a-zA-Z0-9_]*$/,
                                    message: "字母开头，长度在6~18之间，只能包含字母、数字和下划线"
                                }
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>

                        <Form.Item className="submitBox">
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            <Button className="register-button">
                                register
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

            </div>
        )
    }
}
