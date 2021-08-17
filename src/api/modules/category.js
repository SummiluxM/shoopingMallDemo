import $axios from "../axios"
const categroy = {
	/**
	 * @description 查询商品分类
	 * @param {int} parentId 	商品分类父id，如果传递0，代表一级分类
	 * @return	{object} Promise对象
	 */
	findCategroy(parentId) {
		return $axios.get(`/categroy/findCategroy?parentId=${parentId}`)
	},
	findAllCategroy() {
		return $axios.get("/categroy/findAllCategroy")
	},
	/**
	 * @description 添加分类信息
	 * @param {object} data
	 * @param {int} data.name 		分类名字
	 * @param {string} data.type	分类类型：比如一级分类
	 * @param {int} data.parentId	父分类编号
	 * @return	{object} Promise对象
	 */
	addCategroy(data) {
		return $axios.post("/categroy/addCategroy", data)
	},
	/**
	 * @description 修改分类信息
	 * @param {object} data
	 * @param {int} data.id 		分类信息编号
	 * @param {string} data.name	分类信息名字
	 * @return	{object} Promise对象
	 */
	updateCategroy(data) {
		return $axios.post("/categroy/updateCategroy", data)
	},
	/**
	 * @description 删除分类信息
	 * @param {object} data
	 * @param {int} data.id 		分类信息编号
	 * @return	{object} Promise对象
	 */
	deleteCategroy(data) {
		console.log(data);
		return $axios.post("/categroy/deleteCategroy", data)
	},
}
export default categroy
