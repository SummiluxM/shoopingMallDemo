import { message } from 'antd';
import axios from 'axios';
const $Axios = axios.create({
    baseURL: 'http://icarus-studio.top:8002'
})
$Axios.interceptors.request.use(req => {
    let token = localStorage.getItem("token")
    if (token) {
        req.headers.token = token
    }
    return req;
}, (err) => {
    // 响应失败
    return Promise.reject(err);
})

$Axios.interceptors.response.use(resp => {
    // 响应成功
    return resp.data;  // 处理后端相应的数据格式
}, (err) => {
    const respon = err.response;
    if (respon) {
        switch (respon.status) {
            case 500:
                message.error('服务器内部错误');
                break;
            case 401:
                message.error('登录过期');
                localStorage.removeItem('token');
                localStorage.removeItem('userInfo');
                window.location.href = '/login';
                break;
            case 404:
                message.error('页面未找到');
                this.props.history.push('/error')
                break;
            default:
                break;
        }
    }
})


export default $Axios;