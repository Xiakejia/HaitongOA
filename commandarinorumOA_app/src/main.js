import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 使用element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 全局css样式
import './assets/css/et2002.css'

// 引入axios异步请求库
import axios from 'axios'
axios.defaults.baseURL= 'http://localhost:9092/sys'
Vue.prototype.$http=axios

//
Vue.prototype.path = 'http://localhost:9092/sys'

// 添加请求拦截器
// axios.interceptors.request.use(function (config) {
//   // 在发送请求之前做些什么
//
//   config.headers.token = "fKSp+grSkLlhq0FmBr2PkSBkgf9/Ify0QnZpxJpq0ttWAu8wjCBp/9eLv9v5RxnLbBaSlDczvzU="
//   console.log("request", config)
//   return config;
// }, function (error) {
//   // 对请求错误做些什么
//   return Promise.reject(error);
// });

// 添加响应拦截器
// axios.interceptors.response.use(function (response) {
//   console.log("response", response)
//   // 对响应数据做点什么
//   return response;
// }, function (error) {
//   // 对响应错误做点什么
//   return Promise.reject(error);
// });

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
