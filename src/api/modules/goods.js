import $axios from "../axios"
const goods = {
	/**
	 * @description 获取商品信息
	 * @return	{object} Promise对象
	 */
	findGoods() {
		return $axios({
			url: "/goods/findGoods",
		})
	},
	addGoods(data) {
		return $axios.post("/goods/addGoods",data)
	},
	/**
	 * @description 商城图片上传
	 * @param {object} data
	 * @param {string} data.imgSrc 上传文件的时候，服务器接受文件的名字
	 * @return	{object} Promise对象
	 */
	fileUpload(data) {
		return $axios.post("/goods/fileUpload", data)
	},
	/**
	 * @description 删除上传文件
	 * @param {object} data
	 * @param {string} data.fileName 文件的名字
	 * @return	{object} Promise对象
	 */
	deleteFiles(data) {
		return $axios.post("/goods/deleteFiles", data)
	},
	/**
	 * @description 根据编号查询商品
	 * @param {object} data
	 * @param {string} data.id 	查询的编号
	 * @return	{object} Promise对象
	 */
	findGoodsById(data) {
		return $axios.post("/goods/findGoodsById", data)
	},
	/**
	 * @description 删除商品
	 * @param {object} data
	 * @param {string} data.id 	商品的编号
	 * @return	{object} Promise对象
	 */
	deleteGoods(data) {
		return $axios.post("/goods/deleteGoods", data)
	},
	/**
	 * @description 修改商品信息
	 * @param {object} data
	 * @param {string} data.id 	商品的编号
	 * @param {string} data.price	商品的价格
	 * @param {string} data.type 	商品的类型编号 例如：5fbcd01aea6c0000ff007f3e
	 * @return	{object} Promise对象
	 */
	updateGoods(data) {
		return $axios.post("/goods/updateGoods", data)
	},
	/**
	 * @description 默认页面
	 * @param {object} data
	 * @param {int} data.searchType 	商品的名字，可以模糊查询
	 * @param {string} data.searchData	商品的描述信息，可以模糊查询
	 * @return	{object} Promise对象
	 */
	findGoodsByName(data) {
		return $axios.post("/goods/findGoodsByName", data)
	},
}
export default goods
