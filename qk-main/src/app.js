export default {
  //应用配置
  config: {
    //应用名称
    title: "qiankun-demo",
    //应用logo
    logo: "./images/logo.png",
    //首页
    home: "/home",
    //版本号
    version: "1.0.0",
    //版权
    copyright: "版权所有：陈曦·LR | 用代码改变世界 Powered by EasyModular"
  },
  //服务地址
  serviceUrl: process.env.NODE_ENV !== "production" ? "" : ""
}
