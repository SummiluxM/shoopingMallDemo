import React, { Component } from 'react'
import { Avatar, Modal } from 'antd';
import { UserOutlined} from '@ant-design/icons';
import '../assets/styles/header.less'
import { withRouter } from 'react-router-dom';
class Header extends Component {
    state = {
        visible: false,
        userInfo: '',
    }
    handleOk = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        this.props.history.push('/login');
    }
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
    componentDidMount() {
        if (localStorage.getItem('userInfo')) {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            console.log(userInfo);
            this.setState({
                userInfo,
            })
        }
    }
    render() {
        const { visible} = this.state;
        return (
            <div className="header-box">
                <div className="header-item"><Avatar icon={<UserOutlined />} /></div>
                <div className="header-item">【<span>{this.state.userInfo?this.state.userInfo.role.authUser:'未登录'}</span>】</div>
                <div className="header-item"><a href="#!" onClick={this.show}>登出</a></div>
                <Modal
                    title="注销"
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.hideModal}
                    okText="确认"
                    cancelText="取消"
                >
                    <p>确认注销</p>
                </Modal>
            </div>
        )
    }
}

export default withRouter(Header)