import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { Table, Tag, Space ,Button } from 'antd';
class editproduct extends Component {
    state = {
        data:null,
    }
    componentDidMount(){
        console.log(this.props.location.state);
        this.setState({
            data:this.props.location.state.data,
        }) 
    }
    render() {
        return (
            <div>
                <p>{this.state.data.name}</p>
                <p>{this.state.data.title}</p>
                <p>{this.state.data.price}</p>
                <p>{this.state.data.msg}</p>
            </div>
        )
    }
}
export default withRouter(editproduct)