import $axios from "../axios"
const roles = {
	/**
	 * @description 查询用户
	 * @return	{object} Promise对象
	 */
	findRoles() {
		return $axios({
			url: "/roles/findRoles",
			method: "get",
		})
	},
	/**
	 * @description 添加角色
	 * @param	{object} data
	 * @param	{string} data.name 角色名字
	 * @param	{string} data.createTime 角色创建时间
	 * @return	{object} Promise对象
	 */
	addRoles(data) {
		return $axios({
			url: "/roles/addRoles",
			method: "post",
			data,
		})
	},
	/**
	 * @description 删除角色
	 * @param	{object} data
	 * @param	{string} data.name 角色名字
	 * @param	{string} data.createTime 角色创建时间
	 * @return	{object} Promise对象
	 */
	deleteRoles(data) {
		return $axios({
			url: "/roles/deleteRoles",
			method: "post",
			data,
		})
	},

	/**
	 * @description 根据编号查询角色
	 * @param	{object} data
	 * @param	{string} data.roleId 角色编号
	 * @return	{object} Promise对象
	 */
	findRoleById(data) {
		return $axios({
			url: "/roles/findRoleById",
			method: "post",
			data,
		})
	},
	/**
	 * @description 修改角色权限
	 * @param	{object} data
	 * @param	{string} data.id 角色编号
	 * @param	{string} data.authTime 修改时间
	 * @param	{string} data.authUser 修改的用户，记录谁操作
	 * @param	{string} data.menus 修改的菜单，修改多个就发送多个menus
	 * @return	{object} Promise对象
	 */
	addAuth(data) {
		return $axios({
			url: "/roles/addAuth",
			method: "post",
			data,
		})
	},
}

export default roles
