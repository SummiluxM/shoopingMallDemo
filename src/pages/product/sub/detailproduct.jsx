import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
class editproduct extends Component {
    componentDidMount(){
        console.log(this.props.location.state);
    }
    render() {
        return (
            <div>
                <h1>商品详情</h1>
            </div>
        )
    }
}
export default withRouter(editproduct)