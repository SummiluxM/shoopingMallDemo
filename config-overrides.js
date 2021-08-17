const {override,fixBabelImports,addLessLoader} = require ('customize-cra')

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style:true //自动打包引入CSS样式，不会将所有的样式都加载
    }),
    addLessLoader({
        modifyVars: {
            "@primary-color":"#722ed1",
            // "@link-color": "#22075e"
        },//主题色设置
        javascriptEnabled: true,
    })
)