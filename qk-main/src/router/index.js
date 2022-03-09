import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import token from '@/utils/token'
//测试分支
// 路由实例
let router
//路由
let routes = []
//子路由
let childRoutes = []
//首次加载
let isFirst = true
// 错误路由
const errorRoutes = []

// 进度条初始值
NProgress.configure({
  minimum: 0.2
})

const init = (store, system) => {
  Vue.use(VueRouter)
  routes = getMainRoutes()
  router = new VueRouter({
    mode: 'history',
    routes
  })

  // 处理重复点击同一个路由报错的问题
  const originalPush = VueRouter.prototype.push
  VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err)
  }

  // 路由过滤器
  router.beforeEach((to, from, next) => {
    // 开始进度条
    NProgress.start()

    // 默认页
    const homeRoute = system.config.home
    // 如果访问的是 / 或者 /default，则跳转到首页
    if (homeRoute && (to.path === '/' || to.path === '/default')) {
      if (homeRoute.startsWith('http://') || homeRoute.startsWith('https://')) {
        next({
          name: 'iframe',
          params: {
            url: homeRoute,
            tn_: '首页'
          }
        })
      } else {
        next(homeRoute)
      }

      // 关闭进度条
      NProgress.done()
      return
    }

    // 验证是否已登录，根据本地是否存在token判断
    const _token = token.get()
    if (!_token && to.name !== 'login') {
      next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      if (to.name === 'login' || to.name === 'refresh') {
        next()
        // 关闭进度条
        NProgress.done()
      } else {
        // 加载账户信息，内部会做是否已加载判断
        store
          .dispatch('app/user/init', null, {
            root: true
          })
          .then(() => {
            //首次加载时，加载子应用的路由
            if (isFirst && routes) {
              loadChildRoutes(store.state.app.user.menus)
              router.addRoutes(childRoutes)
              isFirst = false
              next({ ...to, replace: true })
            }
            // 错误页
            if (errorRoutes.includes(to.name)) {
              next()
              // 关闭进度条
              NProgress.done()
            } else {
              // 打开页面
              store
                .dispatch('app/page/open', to, {
                  root: true
                })
                .then(() => {
                  next()

                  // 关闭进度条
                  NProgress.done()
                })
            }
          })
      }
    }
  })
}

//主应用路由
const getMainRoutes = () => {
  const requireComponent = require.context('../views', true, /\page.js$/)
  const pages = requireComponent.keys().map((fileName) => requireComponent(fileName).default)

  return pages.map((m) => {
    return {
      path: m.path,
      name: m.name.toLowerCase(),
      component: m.component,
      props: m.props || true,

      meta: {
        title: m.title,
        icon: m.icon,
        cache: m.cache,
        buttons: m.buttons,
        inFrame: m.inFrame
      }
    }
  })
}

//子应用路由
const loadChildRoutes = (menus) => {
  menus.forEach((m) => {
    if (m.children) loadChildRoutes(m.children)

    if (m.path && !routes.find((v) => v.path === m.path) && (!m.type || m.type === 1)) {
      childRoutes.push({
        path: m.path,
        name: m.routeName || m.menuName,

        meta: {
          title: m.menuName,
          icon: m.icon,
          buttons: m.buttons,
          inFrame: m.inFrame,
          isChild: true
        }
      })
    }
  })
}

export default (store, system) => {
  init(store, system)
}

export { router, routes }
