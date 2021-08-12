const {override,fixBabelImports} = require ('customize-cra')

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style:"css" //自动打包引入CSS样式，不会将所有的样式都加载
    })
)