import $axios from "../axios"
const user = {
	/**
	 * @description  用户登录
	 * @param	{object} data
	 * @param	{string} data.account 用户名
	 * @param	{int} data.password	密码
	 * @return	{object} Promise对象
	 */
	login(data) {
		return $axios({
			url: "/users/login",
			method: "post",
			data,
		})
	},
	/**
	 * @description  获取账户列表
	 * @return	{object} Promise对象
	 */
	getAccountList() {
		return $axios({
			url: "/users/getAccountList",
			method: "post",
		})
	},
	/**
	 * @description  添加用户
	 * @param	{object} data
	 * @param	{string} data.account 用户名
	 * @param	{int} data.password	密码
	 * @param	{string} data.email	邮箱
	 * @param	{string} data.role	角色id
	 * @return	{object} Promise对象
	 */
	accountadd(data) {
		return $axios({
			url: "/users/accountadd",
			method: "post",
			data,
		})
	},
	/**
	 * @description 删除用户
	 * @param	{string} id	角色id
	 * @return	{object} Promise对象
	 */
	delAccount(id) {
		return $axios({
			url: "/users/delAccount?" + id,
			method: "get",
		})
	},
}

export default user
