// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  targets: {
    ie: 10
  },
  context: {
    appTitle: 'antd demo'
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: {
          immre: true
        },
        dynamicImport: true, // 按需加载
        title: 'antd-demo',
        dll: false,
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//
          ]
        }
      }
    ]
  ]
};
