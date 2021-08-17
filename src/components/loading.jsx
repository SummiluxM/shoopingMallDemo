import React, { Component } from 'react'
import { Spin, Space } from 'antd';
import '../assets/styles/loading.less'
export default class loading extends Component {
    render() {
        return (
            <div className="loading">
                <Space size="middle">
                    <Spin size="large" />
                </Space>,
            </div>
        )
    }
}
