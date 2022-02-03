import { registerMicroApps, start, initGlobalState } from 'qiankun'

const apps = [
  {
    name: 'child-1',
    entry: '//localhost:8002',
    container: '#child',
    activeRule: '/child1'
  },
  {
    name: 'child-2',
    entry: '//localhost:8003',
    container: '#child',
    activeRule: '/child2'
  }
]

const lifeCycles = {
  beforeLoad: [
    (app) => {
      console.log('%c before load', 'background:#3a5ab0 ; padding: 1px; border-radius: 3px;  color: #fff', app)
    }
  ], // 预加载
  beforeMount: [
    (app) => {
      console.log('%c before mount', 'background:#7d9553 ; padding: 1px; border-radius: 3px;  color: #fff', app)
    }
  ], // 挂载前回调
  afterMount: [
    (app) => {
      console.log('%c after mount', 'background:#7d7453 ; padding: 1px; border-radius: 3px;  color: #fff', app)
    }
  ], // 挂载后回调
  beforeUnmount: [
    (app) => {
      console.log('%c before unmount', 'background:#7dd253 ; padding: 1px; border-radius: 3px;  color: #fff', app)
    }
  ], // 卸载前回调
  afterUnmount: [
    (app) => {
      console.log('%c after unmount', 'background:#d2525c ; padding: 1px; border-radius: 3px;  color: #fff', app)
    }
  ] // 卸载后回调
}

const globalState = {
  token: null,
  userInfo: null
}

// 微应用注册
export const registerApps = () => {
  registerMicroApps(apps, lifeCycles)
  start({
    prefetch: 'all', // 可选，是否开启预加载，默认为 true。
    sandbox: { strictStyleIsolation: true }, // 可选，是否开启沙箱，默认为 true。// 从而确保微应用的样式不会对全局造成影响。
    singular: true // 可选，是否为单实例场景，单实例指的是同一时间只会渲染一个微应用。默认为 true。
  })
}

// 初始化全局下发的数据
export const qiankunActions = initGlobalState(globalState)

window.$qiankunActions = qiankunActions

//订阅全局数据
qiankunActions.onGlobalStateChange((state, prev) => {
  //如果监听到全局数据有修改，可以从这里更新store
})
